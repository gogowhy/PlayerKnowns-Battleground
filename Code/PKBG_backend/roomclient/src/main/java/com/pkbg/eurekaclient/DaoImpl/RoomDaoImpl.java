package com.pkbg.eurekaclient.DaoImpl;

import com.pkbg.eurekaclient.Dao.RoomDao;
import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Handler.MyHandler;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.RoomRepository;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.*;

@Repository
public class RoomDaoImpl implements RoomDao {

    @Autowired
    public RoomRepository roomRepository ;

    @Autowired
    public PlayerRepository playerRepository;

    @Autowired
    public MongoTemplate mongoTemplate;

    public void deleteroom(Room room)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("roomnumber").is(room.getRoomnumber()));
        String collectionname = "room";
        mongoTemplate.remove(query,Room.class,collectionname);
    }

    public void deleteplayer(Player player)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player.getPlayername()));
        String collectionname = "player";
        mongoTemplate.remove(query,Player.class,collectionname);
    }

    public void updatestatus(Room room)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("roomnumber").is(room.getRoomnumber()));
        String collectionname = "room";
        Update update = new Update();
        update.set("gamestatus",room.getGamestatus());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public void updatehost(Room room)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("roomnumber").is(room.getRoomnumber()));
        String collectionname = "room";
        Update update = new Update();
        update.set("hostname",room.getHostname());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public void updateteam(Player player)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player.getPlayername()));
        String collectionname = "player";
        Update update = new Update();
        update.set("playerteam",player.getPlayerteam());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public void updateplayerstatus(Player player)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player.getPlayername()));
        String collectionname = "player";
        Update update = new Update();
        update.set("playerstatus",player.getPlayerstatus());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public void updateplayernumber(Room room)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("roomnumber").is(room.getRoomnumber()));
        String collectionname = "room";
        Update update = new Update();
        update.set("playernumber",room.getPlayernumber());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public List<Player> findByRoomnumber(Integer roomnumber)
    {
        Query query = new Query();
        query.addCriteria(Criteria.where("roomnumber").is(roomnumber));
        List<Player> players = mongoTemplate.find(query, Player.class);
        return players;
    }

    @Override
    public Map<String,Object> create(String hostname) throws IOException {
        Room room = new Room();
        room.setHostname(hostname);

        String str="0123456789";
        Random random = new Random();
        StringBuffer rroomNumber=new StringBuffer();
        for(int i=0;i<5;i++){
            int number=random.nextInt(10);
            rroomNumber.append(str.charAt(number));
        }
        String roomNumber=new String(rroomNumber);
        StringBuffer rroomPassword=new StringBuffer();
        for(int i=0;i<5;i++){
            int number=random.nextInt(10);
            rroomPassword.append(str.charAt(number));
        }
        String roomPassword=new String(rroomPassword);

        Integer rmNumber = Integer.parseInt(roomNumber);
        room.setRoomnumber(rmNumber);
        Integer rmPassword = Integer.parseInt(roomPassword);
        room.setRoompassword(rmPassword);
        room.setPlayernumber(1);

        Player player = new Player();//original player status
        player.setRoomnumber(rmNumber);
        player.setPlayername(hostname);
        player.setPlayerteam(1);
        player.setPlayerstatus(1);
        player.setMale(999.9);
        player.setTimes(0);
        player.setKill(0);
        playerRepository.save(player);

        room.setGamestatus(0);
        System.out.println("daomaple");

        List<Player> players =findByRoomnumber(rmNumber);


        Map<String,Object> map = new HashMap<>();
        map.put("code",0);
        map.put("roomnumber",rmNumber);
        map.put("roompassword",rmPassword);
        roomRepository.save(room);
        return map;
    }

    @Override
    public String dismiss(String if_hostname)
    {
        MyHandler myHandler = new MyHandler();
        Room room=roomRepository.findByHostname(if_hostname);
        if (room.equals(null))
        {
            return "Not Host!";
        }

        Integer roomnumber=room.getRoomnumber();
        List<Player> players =findByRoomnumber(roomnumber);

        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage("90"));
            deleteplayer(player_temp);
        }
        deleteroom(room);
        return "Success!";

    }

    @Override
    public String kick(String if_hostname, Integer roomnumber, String username)
    {
        MyHandler myHandler = new MyHandler();
        Room room=roomRepository.findByHostname(if_hostname);
        if (room.equals(null))
        {
            return "Not Host!";
        }
        if (room.getRoomnumber() != roomnumber)
        {
            return "Not In This Room!";
        }
        if (if_hostname.equals(username))
        {
            return "Cannot Kick Yourself!";
        }

        Player player = playerRepository.findByPlayername(username);
        if (roomnumber.equals(player.roomnumber))
        {
            deleteplayer(player);
            List<Player> players =findByRoomnumber(roomnumber);

            Map <String,Object> map = new HashMap<String,Object>();
            map.put("code",91);
            map.put("username",username);
            JSONArray json2 = JSONArray.fromObject(map);
            String message = json2.toString();
            for(int i=0;i<players.size();i++)
            {
                Player player_temp=players.get(i);
                String playername = player_temp.getPlayername();
                myHandler.sendMessageToUser(playername, new TextMessage(message));
            }
        }
        else return "No Such Player In Room!";
        return "Success!";
    }

    @Override
    public Integer join(Integer roomnumber, String username, Integer password) throws IOException {
        MyHandler myHandler = new MyHandler();
        Room room = new Room();
        room = roomRepository.findByRoomnumber(roomnumber);
        if (room == null)
        {
            return 1;//"Cannot Find Target Room!";
        }
        if (room.getRoompassword() != null)
            if (!password.equals(room.getRoompassword()))
            {
                return 2;//"Wrong Password!";
            }
        if (room.getGamestatus() == 1)
        {
            return 3;//"Target Room Has Started Game!";
        }
        if (room.getPlayernumber() == 16)
        {
            return 4;//"Target Room Is Full!";
        }


        Player player = new Player();
        List<Player> players = findByRoomnumber(roomnumber);
        Integer a=new Integer(0);
        Integer b=new Integer(0);
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            Integer team_temp = player_temp.getPlayerteam();
            if (team_temp==1) a++;
            else b++;
        }
        Integer playerteam = new Integer(0);
        if (a>b) {
            player.setPlayerteam(2);
            playerteam=2;
        }
        else
        {
            player.setPlayerteam(1);
            playerteam=1;
        }


        Map <String,Object> map2 = new HashMap<String,Object>();
        map2.put("code",7);
        map2.put("username",username);
        map2.put("playerteam",playerteam);
        JSONArray json2 = JSONArray.fromObject(map2);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }

        Integer newnumber = room.getPlayernumber()+1;
        room.setPlayernumber(newnumber);
        updateplayernumber(room);

        player.setPlayerstatus(0);
        player.setRoomnumber(roomnumber);
        player.setPlayername(username);
        player.setMale(999.9);
        player.setTimes(0);
        playerRepository.save(player);
        /*List<Player> playerss =playerRepository.findByRoomnumber(roomnumber);

        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",8);
        map.put("players",playerss);
        JSONArray json = JSONArray.fromObject(map);
        String message2 = json.toString();
        System.out.println(message2);
        myHandler.sendMessageToUser(username, new TextMessage(message2));*/
        return 0;//"Success!";
    }

    @Override
    public String quit(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer roomnumber = player.getRoomnumber();
        System.out.println(roomnumber);
        Room room = roomRepository.findByRoomnumber(roomnumber);
        System.out.println(room.playernumber);
        MyHandler myHandler = new MyHandler();
        Integer newnumber = room.getPlayernumber()-1;
        room.setPlayernumber(newnumber);
        updateplayernumber(room);
        deleteplayer(player);
        List<Player> players = playerRepository.findByRoomnumber(roomnumber);
        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",4);
        map.put("username",username);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String hostquit(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer roomnumber = player.getRoomnumber();
        Room room = roomRepository.findByRoomnumber(roomnumber);
        MyHandler myHandler = new MyHandler();
        Integer newnumber = room.getPlayernumber()-1;
        if (newnumber == 0) {
            Map <String,Object> map = new HashMap<String,Object>();
            map.put("code",90);
            JSONArray json = JSONArray.fromObject(map);
            String message = json.toString();
            deleteroom(room);
            deleteplayer(player);
            myHandler.sendMessageToUser(username, new TextMessage(message));
        }
        else {
            room.setPlayernumber(newnumber);
            deleteplayer(player);

            List<Player> players = findByRoomnumber(roomnumber);
            Player player_newhost = players.get(0);
            player_newhost.setPlayerstatus(1);
            String newhostname = player_newhost.getPlayername();
            Map <String,Object> map = new HashMap<String,Object>();
            map.put("code",3);
            map.put("username",username);
            map.put("hostname",newhostname);
            JSONArray json2 = JSONArray.fromObject(map);
            String message = json2.toString();
            room.setHostname(newhostname);
            for (int i = 0; i < players.size(); i++) {
                Player player_temp = players.get(i);
                String playername = player_temp.getPlayername();
                myHandler.sendMessageToUser(playername, new TextMessage(message));
            }
            updateplayernumber(room);
            updatehost(room);
        }
        return "Success!";
    }

    @Override
    public String changeToA(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer team = player.getPlayerteam();
        if (team==1)//Already In Team A
        {
            return "Already In Team A!";
        }
        Integer roomnumber = player.getRoomnumber();

        List<Player> players = findByRoomnumber(roomnumber);

        player.setPlayerteam(1);
        updateteam(player);
        MyHandler myHandler = new MyHandler();

        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",5);
        map.put("username",username);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String changeToB(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer team = player.getPlayerteam();
        if (team==2)//Already In Team B
        {
            return "Already In Team B!";
        }
        Integer roomnumber = player.getRoomnumber();

        player.setPlayerteam(2);
        updateteam(player);
        MyHandler myHandler = new MyHandler();

        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",6);
        map.put("username",username);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        List<Player> players = findByRoomnumber(roomnumber);
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String ready(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer status = player.getPlayerstatus();
        if (status == 1)//Already Ready
        {
            return "Already Ready!";
        }
        player.setPlayerstatus(1);
        updateplayerstatus(player);
        MyHandler myHandler = new MyHandler();
        Integer roomnumber = player.getRoomnumber();
        List<Player> players = findByRoomnumber(roomnumber);

        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",1);
        map.put("username",username);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String cancel(String username)
    {
        Player player = playerRepository.findByPlayername(username);
        Integer status = player.getPlayerstatus();
        if (status == 2)//Already Cancel
        {
            return "Already Canceled!";
        }
        player.setPlayerstatus(2);
        updateplayerstatus(player);
        MyHandler myHandler = new MyHandler();
        Integer roomnumber = player.getRoomnumber();
        List<Player> players = findByRoomnumber(roomnumber);

        Map <String,Object> map = new HashMap<String,Object>();
        map.put("code",2);
        map.put("username",username);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String start(Integer roomnumber)
    {
        Room room = roomRepository.findByRoomnumber(roomnumber);
        Integer status = room.getGamestatus();
        if (status == 1) return "Already Started!";

        List<Player> players = findByRoomnumber(roomnumber);
        Integer a=new Integer(0);
        Integer b=new Integer(0);
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            Integer isReady = player_temp.getPlayerstatus();
            if (isReady==0) return "Not All Ready!";
            Integer team_temp = player_temp.getPlayerteam();
            if (team_temp==1) a++;
            else b++;
        }

        if (Math.abs(a-b)>1) return ("Team Not Equal!");

        room.setGamestatus(1);
        updatestatus(room);

        MyHandler myHandler = new MyHandler();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            Map <String,Object> map = new HashMap<String,Object>();
            map.put("code",0);
            JSONArray json2 = JSONArray.fromObject(map);
            String message = json2.toString();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public List<Player> queryAll()
    {
        List<Player> users = new ArrayList<Player>();
        users=playerRepository.findByRoomnumber(12329);
        return users;
    }

    @Override
    public List<Player> query(String ID,Integer roomnumber)
    {
        MyHandler myHandler = new MyHandler();
        List<Player> playerss = new ArrayList<Player>();
        System.out.println("123");
        playerss = playerRepository.findByRoomnumber(roomnumber);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", 8);
        map.put("players", playerss);
        JSONArray json = JSONArray.fromObject(map);
        String message2 = json.toString();
        System.out.println(message2);
        myHandler.sendMessageToUser(ID, new TextMessage(message2));
        return playerss;
    }
}
