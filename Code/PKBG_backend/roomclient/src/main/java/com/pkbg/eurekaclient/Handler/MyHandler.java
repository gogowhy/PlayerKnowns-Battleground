package com.pkbg.eurekaclient.Handler;

import com.pkbg.eurekaclient.Dao.RoomDao;
import com.pkbg.eurekaclient.DaoImpl.RoomDaoImpl;
import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.RoomRepository;
import com.pkbg.eurekaclient.Service.RoomService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.*;

import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.apache.tomcat.jni.Time.sleep;

@Component
@Service
public class MyHandler implements WebSocketHandler {

    //在线用户列表
    private static final Map<String, WebSocketSession> users;


    static {
        users = new HashMap<>();
    }

    private static RoomService roomService;

    // 注入的时候，给类的 service 注入
    @Autowired
    public void setRoomService(RoomService roomService) {
        MyHandler.roomService = roomService;
    }

    private static RoomRepository roomRepository;

    // 注入的时候，给类的 service 注入
    @Autowired
    public void setRoomRepository(RoomRepository roomRepository) {
        MyHandler.roomRepository = roomRepository;
    }

    private static PlayerRepository playerRepository;

    // 注入的时候，给类的 service 注入
    @Autowired
    public void setPlayerRepository(PlayerRepository playerRepository) {
        MyHandler.playerRepository = playerRepository;
    }

    private static MongoTemplate mongoTemplate;

    // 注入的时候，给类的 service 注入
    @Autowired
    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        MyHandler.mongoTemplate = mongoTemplate;
    }

    public List<Player> findByRoomnumber(Integer roomnumber)
    {
        Query query = new Query(Criteria.where("roomnumber").is(roomnumber));

        // 满足所有条件的数据
        List<Player> ans = mongoTemplate.find(query, Player.class, "player");
        return ans;
    }

    //新增socket
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {//create & join here
        System.out.println("成功建立连接");
        String roomnum = session.getUri().toString().split("ROOMNUMBER=")[1];
        String ID = session.getUri().toString().split("ROOMNUMBER=")[0].split("ID=")[1];
        System.out.println(ID);
        System.out.println(roomnum);

        Integer roomnumber = Integer.valueOf(roomnum);
        System.out.println(roomnumber);

        if (ID != null) {
            users.put(ID, session);
            //session.sendMessage(new TextMessage("成功建立socket连接"));
            System.out.println(ID);
            System.out.println(session);
            //sendMessageToUser(ID+"",new TextMessage("8"));
        }
        System.out.println("当前在线人数："+users.size());

        try {
            List<Player> playerss = playerRepository.findByRoomnumber(roomnumber);
            System.out.println(playerss);
            //username&playerteam  map-list-map
            Integer team = new Integer(0);
            if (playerss.size()!=1) {
                Iterator<Player> it = playerss.iterator();
                List<Map> playerlist = new ArrayList<>();
                while(it.hasNext()) {
                    Player str = (Player) it.next();
                    if (!ID.equals(str.getPlayername())) {
                        Map<String, Object> map1 = new HashMap<String, Object>();
                        map1.put("username", str.getPlayername());
                        System.out.println(str.getPlayername());
                        map1.put("playerteam", str.getPlayerteam());
                        System.out.println(str.getPlayerteam());
                        map1.put("playerstatus", str.getPlayerstatus());
                        playerlist.add(map1);
                    }
                    else {
                        team = str.getPlayerteam();
                    }
                }
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("code", 8);
                map.put("playerteam",team);
                map.put("players", playerlist);
                JSONArray json = JSONArray.fromObject(map);
                String message2 = json.toString();
                System.out.println(message2);
                sendMessageToUser(ID, new TextMessage(message2));
            }
        }
        catch (Exception e)
        {
        }
    }

    //接收socket信息
    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        try{
            JSONObject jsonobject = JSONObject.fromObject(webSocketMessage.getPayload());
            String username = new String((String) jsonobject.get("username"));
            System.out.println(username);
            Integer code = new Integer((Integer) jsonobject.get("code"));
            System.out.println(code);

            //调用roomdaoimpl
            switch(code)
            {
                case 0://START GAME
                    Integer roomnumber0 = new Integer((Integer) jsonobject.get("roomnumber"));
                    String Result0 = roomService.start(roomnumber0);
                    if (!Result0.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result0));
                    break;
                case 1://READY
                    String Result1 = roomService.ready(username);
                    if (!Result1.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result1));
                    break;
                case 2://CANCEL READY
                    String Result2 = roomService.cancel(username);
                    if (!Result2.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result2));
                    break;
                case 3://HOST QUIT
                    String Result3 = roomService.hostquit(username);
                    if (!Result3.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result3));
                    break;
                case 4://PLAYER QUIT
                    String Result4 = roomService.quit(username);
                    if (!Result4.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result4));
                    break;
                case 5://CHANGE TO A
                    String Result5 = roomService.changeToA(username);
                    if (!Result5.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result5));
                    break;
                case 6://CHANGE TO B
                    String Result6 = roomService.changeToB(username);
                    if (!Result6.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result6));
                    break;
                case 90://DISMISS
                    String Result90 = roomService.dismiss(username);
                    if (!Result90.equals("Success!"))
                        sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result90));
                    break;
                case 91://KICK
                    Player player = playerRepository.findByPlayername(username);
                    Integer roomnumber91 = player.roomnumber;
                    String username91 = new String((String) jsonobject.get("username"));
                    String Result91 = roomService.kick(username,roomnumber91, username91);
                    if (!Result91.equals("Success!")) sendMessageToUser(jsonobject.get("username")+"",new TextMessage("-1"+Result91));
                    break;
            }

            System.out.println(jsonobject.get("message")+":来自"+(String)webSocketSession.getAttributes().get("WEBSOCKET_USERID")+"的消息");
            sendMessageToUser(jsonobject.get("username")+"",new TextMessage("服务器收到了，hello!"));
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