package com.example.demo.DaoImpl;


import com.example.demo.Dao.RoomDao;
import com.example.demo.Entity.Room;
import com.example.demo.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;

@Repository
public class RoomDaoImpl implements RoomDao {
    @Autowired
    public RoomRepository roomRepository;


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

        roomRepository.save(room);
        return "Room Created Successfully!";
    }

}
