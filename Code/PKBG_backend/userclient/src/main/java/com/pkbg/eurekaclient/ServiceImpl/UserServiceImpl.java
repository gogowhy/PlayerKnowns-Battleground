package com.pkbg.eurekaclient.ServiceImpl;

import com.pkbg.eurekaclient.Dao.UserDao;
import com.pkbg.eurekaclient.Service.UserService;
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

    @Override
    public  String login(HttpServletRequest request)
    {
        return  userDao.login(request);
    }

    @Override
    public String resetPass(HttpServletRequest request)
    {
        return userDao.resetPass(request);
    }

    @Override
    public  String banUser(HttpServletRequest request)
    {
        return  userDao.banUser(request);
    }

    @Override
    public  String unbanUser(HttpServletRequest request)
    {
        return  userDao.unbanUser(request);
    }



}