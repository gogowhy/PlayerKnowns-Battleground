package com.example.demo.ServiceImpl;

import com.example.demo.Dao.RoomDao;
import com.example.demo.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    public RoomDao roomDao;

    @Override
    public String create(String hostname) throws IOException
    {
        return roomDao.create(hostname);
    }


    @Override
    public  String dismiss(String if_hostname)
    {
        return roomDao.dismiss(if_hostname);
    }

    @Override
    public String join(Integer roomnumber, String username, Integer password) throws IOException
    {
        return roomDao.join(roomnumber, username, password);
    }

    @Override
    public String quit(String username)
    {
        return roomDao.quit(username);
    }

    @Override
    public String hostquit(String username)
    {
        return roomDao.hostquit(username);
    }

    @Override
    public String kick(String if_hostname, Integer roomnumber, String username)
    {
        return roomDao.kick(if_hostname, roomnumber, username);
    }

    @Override
    public String changeToA(String username)
    {
        return roomDao.changeToA(username);
    }

    @Override
    public String changeToB(String username)
    {
        return roomDao.changeToB(username);
    }

    @Override
    public String ready(String username)
    {
        return roomDao.ready(username);
    }

    @Override
    public String cancel(String username)
    {
        return roomDao.cancel(username);
    }

    @Override
    public String start(Integer roomnumber)
    {
        return roomDao.start(roomnumber);
    }
}
