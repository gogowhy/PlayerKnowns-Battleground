package com.example.demo.ServiceImpl;

import com.example.demo.Dao.UserDao;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    public UserDao userDao;

    @Override
    public String register(HttpServletRequest request)
    {
        return userDao.register(request);
    }
}
