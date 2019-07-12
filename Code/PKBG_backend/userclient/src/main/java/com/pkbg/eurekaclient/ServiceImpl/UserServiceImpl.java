package com.pkbg.eurekaclient.ServiceImpl;

import com.pkbg.eurekaclient.Dao.UserDao;
import com.pkbg.eurekaclient.Entity.User;
import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    public UserDao userDao;

    @Override
    public Integer register(User user)
    {
        return userDao.register(user);
    }

    @Override
    public  Integer login(User user)
    {
        return  userDao.login(user);
    }

    @Override
    public Integer resetPass(User user)
    {
        return userDao.resetPass(user);
    }

    @Override
    public  Integer banUser(User user)
    {
        return  userDao.banUser(user);
    }

    @Override
    public  Integer unbanUser(User user)
    {
        return  userDao.unbanUser(user);
    }



}