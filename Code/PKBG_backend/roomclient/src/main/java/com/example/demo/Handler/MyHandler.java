package com.example.demo.Handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.example.demo.Entity.Player;
import com.example.demo.Repository.PlayerRepository;
import com.example.demo.Repository.RoomRepository;
import com.example.demo.Service.RoomService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;


@Service
public class MyHandler implements WebSocketHandler {

    //在线用户列表
    private static final Map<String, WebSocketSession> users;


    static {
        users = new HashMap<>();
    }

    @Autowired
    public RoomService roomService;

    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    public PlayerRepository playerRepository;

    //新增socket
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {//create & join here
        System.out.println("成功建立连接");
        String ID = session.getUri().toString().split("ID=")[1];
        System.out.println(ID);

        String operation = session.getUri().toString().split("code=")[1];
        Integer code = Integer.valueOf(operation);
        switch (code)
        {
            case 1:
                String Result1 = roomService.create(ID);
                if (!Result1.equals(null))
                    sendMessageToUser(ID+"",new TextMessage("-1"+Result1));
                break;
            case 2:
                String room = session.getUri().toString().split("roomnumber=")[1];
                String pass = session.getUri().toString().split("password=")[1];
                Integer roomnumber = Integer.valueOf(room);
                Integer password = Integer.valueOf(pass);
                String Result2 = roomService.join(roomnumber,ID,password);
                if (!Result2.equals(null))
                    sendMessageToUser(ID+"",new TextMessage("-1"+Result2));
                break;
        }

        if (ID != null) {
            users.put(ID, session);
            session.sendMessage(new TextMessage("成功建立socket连接"));
            System.out.println(ID);
            System.out.println(session);
        }
        System.out.println("当前在线人数："+users.size());
    }

    //接收socket信息
    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        try{
            JSONObject jsonobject = JSONObject.fromObject(webSocketMessage.getPayload());
            String username = new String((String) jsonobject.get("id"));
            Integer code = new Integer((Integer) jsonobject.get("code"));
            System.out.println(jsonobject.get("id"));

            //调用roomdaoimpl
            switch(code)
            {
                case 0://START GAME
                    Integer roomnumber0 = new Integer((Integer) jsonobject.get("roomnumber"));
                    String Result0 = roomService.start(roomnumber0);
                    if (!Result0.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result0));
                    break;
                case 1://READY
                    String Result1 = roomService.ready(username);
                    if (!Result1.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result1));
                    break;
                case 2://CANCEL READY
                    String Result2 = roomService.cancel(username);
                    if (!Result2.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result2));
                    break;
                case 3://HOST QUIT
                    String Result3 = roomService.hostquit(username);
                    if (!Result3.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result3));
                    break;
                case 4://PLAYER QUIT
                    String Result4 = roomService.quit(username);
                    if (!Result4.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result4));
                    break;
                case 5://CHANGE TO A
                    String Result5 = roomService.changeToA(username);
                    if (!Result5.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result5));
                    break;
                case 6://CHANGE TO B
                    String Result6 = roomService.changeToB(username);
                    if (!Result6.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result6));
                    break;
                case 7://JOIN
                    Integer roomnumber7 = new Integer((Integer) jsonobject.get("roomnumber"));
                    Integer password7 = new Integer((Integer) jsonobject.get("password"));
                    String Result7 = roomService.join(roomnumber7, username, password7);
                    if (!Result7.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result7));
                    break;
                case 90://DISMISS
                    String Result90 = roomService.dismiss(username);
                    if (!Result90.equals(null))
                        sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result90));
                    break;
                case 91://KICK
                    Player player = playerRepository.findByPlayername(username);
                    Integer roomnumber91 = player.roomnumber;
                    String Result91 = roomService.kick(roomnumber91, username);
                    if (!Result91.equals(null)) sendMessageToUser(jsonobject.get("id")+"",new TextMessage("-1"+Result91));
                    break;
            }

            System.out.println(jsonobject.get("message")+":来自"+(String)webSocketSession.getAttributes().get("WEBSOCKET_USERID")+"的消息");
            sendMessageToUser(jsonobject.get("id")+"",new TextMessage("服务器收到了，hello!"));
        }catch(Exception e){
            e.printStackTrace();
        }

    }

    /**
     * 发送信息给指定用户
     * @param clientId
     * @param message
     * @return
     */
    public boolean sendMessageToUser(String clientId, TextMessage message) {
        if (users.get(clientId) == null) return false;
        WebSocketSession session = users.get(clientId);
        System.out.println("sendMessage:" + session);
        if (!session.isOpen()) return false;
        try {
            session.sendMessage(message);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * 广播信息
     * @param message
     * @return
     */
    public boolean sendMessageToAllUsers(TextMessage message) {
        boolean allSendSuccess = true;
        Set<String> clientIds = users.keySet();
        WebSocketSession session = null;
        for (String clientId : clientIds) {
            try {
                session = users.get(clientId);
                if (session.isOpen()) {
                    session.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
                allSendSuccess = false;
            }
        }

        return  allSendSuccess;
    }


    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        System.out.println("连接出错");
        users.remove(getClientId(session));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("连接已关闭：" + status);
        users.remove(getClientId(session));
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    /**
     * 获取用户标识
     * @param session
     * @return
     */
    private Integer getClientId(WebSocketSession session) {
        try {
            Integer clientId = (Integer) session.getAttributes().get("WEBSOCKET_USERID");
            return clientId;
        } catch (Exception e) {
            return null;
        }
    }
}