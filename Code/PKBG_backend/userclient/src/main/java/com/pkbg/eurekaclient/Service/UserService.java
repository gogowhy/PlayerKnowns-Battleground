package com.pkbg.eurekaclient.Service;

import com.pkbg.eurekaclient.Entity.User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface UserService {
    public Integer register(User user);
    public Integer login(User user);
    public Integer resetPass(User user);

    public  Integer banUser(User user);
    public  Integer unbanUser(User user);

}