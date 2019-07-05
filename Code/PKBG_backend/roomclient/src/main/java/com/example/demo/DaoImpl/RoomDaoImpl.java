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

import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

@Repository
public class RoomDaoImpl implements RoomDao {
    @Autowired
    public RoomRepository roomRepository;


    @Autowired
    public PlayerRepository playerRepository;

    @Override
    public String create(HttpServletRequest request) {
        String hostname = request.getParameter("hostname");
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

        Player player = new Player();
        player.setRoomnumber(rmNumber);
        player.setPlayername(hostname);
        playerRepository.save(player);

        room.setGamestatus(0);

        roomRepository.save(room);
        return "Room Created Successfully!";
    }

    @Override
    public String dismiss(HttpServletRequest request)
    {
        String  if_hostname=request.getParameter("hostname");
        Room room=roomRepository.findByHostname(if_hostname);
        Integer roomnumber=room.getRoomnumber();
        List<Player> players =playerRepository.findByRoomnumber(roomnumber);

        MyHandler myHandler = new MyHandler();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage("Dismissed"));
            playerRepository.delete(player_temp);
        }

        roomRepository.delete(room);
        return "房间"+roomnumber+"解散成功！";

    }

    @Override
    public String join(HttpServletRequest request){
        String roomnumber = request.getParameter("roomnumber");
        String username = request.getParameter("username");
        Integer rmnumber = Integer.valueOf(roomnumber).intValue();
        Room room = new Room();
        room = roomRepository.findByRoomnumber(rmnumber);
        if (room == null)
        {
            return "Cannot Find Target Room!";
        }
        if (room.getGamestatus() == 1)
        {
            return "Target Room Has Started Game!";
        }
        if (room.getPlayernumber() == 16)
        {
            return "Target Room Is Full!";
        }

        MyHandler myHandler = new MyHandler();
        List<Player> players =playerRepository.findByRoomnumber(rmnumber);
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage("Joined"+username));
        }

        Integer newnumber = room.getPlayernumber()+1;
        room.setPlayernumber(newnumber);
        roomRepository.save(room);

        Player player = new Player();
        player.setRoomnumber(rmnumber);
        player.setPlayername(username);
        playerRepository.save(player);
        return "Join Room Successfully!";
    }


}
