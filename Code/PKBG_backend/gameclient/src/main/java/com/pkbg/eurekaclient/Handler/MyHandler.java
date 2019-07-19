package com.pkbg.eurekaclient.Handler;

import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.RoomRepository;
import com.pkbg.eurekaclient.Service.GameService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.*;

@Component
@Service
public class MyHandler implements WebSocketHandler {

    //在线用户列表
    private static final Map<String, WebSocketSession> users;


    static {
        users = new HashMap<>();
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

    private static GameService gameService;

    // 注入的时候，给类的 service 注入
    @Autowired
    public void setRoomService(GameService gameService) {
        MyHandler.gameService = gameService;
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
    }

    //接收socket信息
    @Override
    public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {
        try{
            JSONObject jsonobject = JSONObject.fromObject(webSocketMessage.getPayload());
            String playername = new String((String) jsonobject.get("playername"));
            System.out.println(playername);
            Integer code = new Integer((Integer) jsonobject.get("code"));
            System.out.println(code);

            switch(code)
            {
                case 0://start
                    Integer roomnumber = new Integer((Integer) jsonobject.get("roomnumber"));
                    System.out.println(code);
                    String Result0 = gameService.start(roomnumber);
                    break;
                case 1://aim
                    Double direction = new Double((Double) jsonobject.get("direction"));
                    String Result1 = gameService.aim(playername,direction);
                    break;
                case 2://shoot
                    Double longitude = new Double((Double) jsonobject.get("longitude"));
                    Double latitude = new Double((Double) jsonobject.get("latitude"));
                    String Result2 = gameService.shoot(playername,longitude,latitude);
                    break;
                case 3://get gps
                    Double longitude2 = new Double((Double) jsonobject.get("longitude"));
                    Double latitude2 = new Double((Double) jsonobject.get("latitude"));
                    String Result3 = gameService.updategps(playername,longitude2,latitude2);
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