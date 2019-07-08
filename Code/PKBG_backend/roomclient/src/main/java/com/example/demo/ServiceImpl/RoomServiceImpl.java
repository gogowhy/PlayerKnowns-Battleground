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
    public String create(WebSocketSession session) throws IOException
    {
        return roomDao.create(session);
    }


    @Override
    public  String dismiss(WebSocketSession session)
    {
        return roomDao.dismiss(session);
    }

    @Override
    public String join(WebSocketSession session)throws IOException
    {
        return roomDao.join(session);
    }

    @Override
    public String quit(WebSocketSession session)
    {
        return roomDao.quit(session);
    }
}
