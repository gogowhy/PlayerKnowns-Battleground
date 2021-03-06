package com.example.demo.DaoImpl;


import com.example.demo.Dao.RoomDao;
import com.example.demo.Entity.Player;
import com.example.demo.Entity.Room;
import com.example.demo.Handler.MyHandler;
import com.example.demo.Repository.PlayerRepository;
import com.example.demo.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

@Repository
public class RoomDaoImpl implements RoomDao {
    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    public PlayerRepository playerRepository;

    @Override
    public String create(String hostname) throws IOException {
        MyHandler myHandler = new MyHandler();
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

        Player player = new Player();//original player status
        player.setRoomnumber(rmNumber);
        player.setPlayername(hostname);
        player.setPlayerteam(1);
        player.setPlayerstatus(0);
        //playerRepository.save(player);

        room.setGamestatus(0);

        String message = player.toJSON(7);
        myHandler.sendMessageToUser(hostname, new TextMessage(message));

        //roomRepository.save(room);
        return "Success!";
    }

    @Override
    public String dismiss(String if_hostname)
    {
        MyHandler myHandler = new MyHandler();
        //Room room=roomRepository.findByHostname(if_hostname);
        Room room = new Room();
        /*if (room.equals(null))
        {
            return "Not Host!";
        }*/

        Integer roomnumber=room.getRoomnumber();
        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);

        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(90);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
            //playerRepository.delete(player_temp);
        }

        //roomRepository.delete(room);
        return "Success!";

    }

    @Override
    public String kick(String if_hostname, Integer roomnumber, String username)
    {
        MyHandler myHandler = new MyHandler();
        Room room = new Room();
        //Room room=roomRepository.findByHostname(if_hostname);
        /*if (room.equals(null))
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
        }*/

        //Player player = playerRepository.findByPlayername(username);
        Player player = new Player();
        //if (roomnumber.equals(player.roomnumber))
        {
            //playerRepository.delete(player);
            //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
            for(int i=0;i<1;i++)
            {
                Player player_temp=new Player();
                player_temp.setinfo();;
                String playername = player_temp.getPlayername();
                String message = player_temp.toJSON(91);
                myHandler.sendMessageToUser(playername, new TextMessage(message));
            }
        }
        //else return "No Such Player In Room!";
        return "Success!";
    }

    @Override
    public String join(Integer roomnumber, String username, Integer password) throws IOException {
        MyHandler myHandler = new MyHandler();
        Room room = new Room();
        //room = roomRepository.findByRoomnumber(roomnumber);
        /*if (room == null)
        {
            return "Cannot Find Target Room!";
        }
        if (room.getRoompassword() != null)
            if (!password.equals(room.getRoompassword()))
            {
                return "Wrong Password!";
            }
        if (room.getGamestatus() == 1)
        {
            return "Target Room Has Started Game!";
        }
        if (room.getPlayernumber() == 16)
        {
            return "Target Room Is Full!";
        }*/

        Player player = new Player();
        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
        Integer a=new Integer(0);
        Integer b=new Integer(0);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            Integer team_temp = player_temp.getPlayerteam();
            if (team_temp==1) a++;
            else b++;
        }
        if (a>b) player.setPlayerteam(2);
            else player.setPlayerteam(1);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(7);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }

        Integer newnumber = 0;//room.getPlayernumber()+1;
        room.setPlayernumber(newnumber);
        //roomRepository.save(room);

        player.setRoomnumber(roomnumber);
        player.setPlayername(username);
        //playerRepository.save(player);
        return "Success!";
    }

    @Override
    public String quit(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player = new Player();
        Integer roomnumber = player.getRoomnumber();
        //Room room = roomRepository.findByRoomnumber(roomnumber);
        Room room = new Room();
        MyHandler myHandler = new MyHandler();
        Integer newnumber = 0;//room.getPlayernumber()-1;
        room.setPlayernumber(newnumber);
        //roomRepository.save(room);
        //playerRepository.delete(player);
        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(4);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String hostquit(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player = new Player();
        Integer roomnumber = player.getRoomnumber();
        //Room room = roomRepository.findByRoomnumber(roomnumber);
        Room room = new Room();
        MyHandler myHandler = new MyHandler();
        Integer newnumber = 0;//room.getPlayernumber()-1;
        if (newnumber == 0) {
            //roomRepository.delete(room);
            String message = player.toJSON(90);
            myHandler.sendMessageToUser(username, new TextMessage(message));
        }
        else room.setPlayernumber(newnumber);
        //playerRepository.delete(player);

        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
        String newhost = new String();//player_newhost.getPlayername();
        room.setHostname(newhost);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON2(3, newhost);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        //roomRepository.save(room);
        return "Success!";
    }

    @Override
    public String changeToA(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player = new Player();
        Integer team = player.getPlayerteam();
        /*if (team==1)//Already In Team A
        {
            return "Already In Team A!";
        }*/
        Integer roomnumber = player.getRoomnumber();

        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
        Integer a=new Integer(0);
        Integer b=new Integer(0);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            Integer team_temp = player_temp.getPlayerteam();
            if (team_temp==1) a++;
                else b++;
        }
        /*if (a==players.size()/2)//Team A Full
        {
            return "Team A Is Full!";
        }*/

        player.setPlayerteam(1);
        //playerRepository.save(player);
        MyHandler myHandler = new MyHandler();
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(5);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String changeToB(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player =new Player();
        Integer team = player.getPlayerteam();
        /*if (team==2)//Already In Team B
        {
            return "Already In Team B!";
        }*/
        Integer roomnumber = player.getRoomnumber();

        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);
        Integer a=new Integer(0);
        Integer b=new Integer(0);
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            Integer team_temp = player_temp.getPlayerteam();
            if (team_temp==1) a++;
            else b++;
        }
        /*if (b==players.size()/2)//Team B Full
        {
            return "";
        }*/

        player.setPlayerteam(2);
        //playerRepository.save(player);
        MyHandler myHandler = new MyHandler();
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(6);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String ready(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player = new Player();
        Integer status = player.getPlayerstatus();
        /*if (status == 1)//Already Ready
        {
            return "Already Ready!";
        }*/
        player.setPlayerstatus(1);
        //playerRepository.save(player);
        MyHandler myHandler = new MyHandler();
        Integer roomnumber = player.getRoomnumber();
        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);

        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(1);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String cancel(String username)
    {
        //Player player = playerRepository.findByPlayername(username);
        Player player =new Player();
        Integer status = player.getPlayerstatus();
        /*if (status == 2)//Already Cancel
        {
            return "Already Canceled!";
        }*/
        player.setPlayerstatus(2);
        //playerRepository.save(player);
        MyHandler myHandler = new MyHandler();
        Integer roomnumber = player.getRoomnumber();
        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);

        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            String message = player_temp.toJSON(2);
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        return "Success!";
    }

    @Override
    public String start(Integer roomnumber)
    {
        //Room room = roomRepository.findByRoomnumber(roomnumber);
        Room room = new Room();
        Integer status = room.getGamestatus();
        //if (status == 1) return "Already Started!";

        //List<Player> players =playerRepository.findByRoomnumber(roomnumber);

        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            Integer isReady = player_temp.getPlayerstatus();
            if (isReady==0) return "Not All Ready!";
        }

        room.setGamestatus(1);
        //roomRepository.save(room);

        MyHandler myHandler = new MyHandler();
        for(int i=0;i<1;i++)
        {
            Player player_temp=new Player();
            player_temp.setinfo();;
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage("0"));
        }
        return "Success!";
    }
}
