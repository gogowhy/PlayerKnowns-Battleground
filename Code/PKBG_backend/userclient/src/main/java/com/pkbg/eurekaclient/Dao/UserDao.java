package com.pkbg.eurekaclient.Dao;

import com.pkbg.eurekaclient.Entity.User;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;

@Repository
public interface UserDao {
    public Integer register(User user);
    public Integer login(User user);
    public Integer resetPass(User user);
    public Integer banUser(User user);
    public Integer unbanUser(User user);
}