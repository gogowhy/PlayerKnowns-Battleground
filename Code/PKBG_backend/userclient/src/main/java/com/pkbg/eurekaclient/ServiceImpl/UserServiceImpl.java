package com.pkbg.eurekaclient.ServiceImpl;

import com.pkbg.eurekaclient.Dao.UserDao;
import com.pkbg.eurekaclient.Entity.Name;
import com.pkbg.eurekaclient.Entity.Storage;
import com.pkbg.eurekaclient.Entity.User;
import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

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

    @Override
    public  Integer buy(Storage storage)
    {
        return  userDao.buy(storage);
    }

    @Override
    public  Integer equip(Storage storage)
    {
        return  userDao.equip(storage);
    }

    @Override
    public Map<String,Object> getstorage(Name name) {return userDao.getstorage(name);}

    @Override
    public Map<String,Object> getmarket(Name name) { return userDao.getmarket(name); }

    @Override
    public String mailReset(String name) { return userDao.mailReset(name); }
}