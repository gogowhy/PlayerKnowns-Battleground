package com.example.demo.ServiceImpl;

import com.example.demo.Dao.RoomDao;
import com.example.demo.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    public RoomDao roomDao;

    @Override
    public String create(HttpServletRequest request)
    {
        return roomDao.create(request);
    }


    @Override
    public  String dismiss(HttpServletRequest request)
    {
        return roomDao.dismiss(request);
    }

    @Override
    public String join(HttpServletRequest request)
    {
        return roomDao.join(request);
    }
}
