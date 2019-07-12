package com.example.demo.Controller;

import com.example.demo.client.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {
    @Autowired
    UserClient userClient;

    @RequestMapping("/register")
    public Integer register(HttpServletRequest request) {
        return userClient.register(request);
    }

    @RequestMapping("/login")
    public Integer login(HttpServletRequest request) {
        return userClient.login(request);
    }

    @RequestMapping("/resetPass")
    public Integer resetPass(HttpServletRequest request) {
        return userClient.resetPass(request);
    }

    @RequestMapping("/test")
    public String test()
    {
        return  userClient.test();
    }

    @RequestMapping("/banUser")
    public Integer banUser(HttpServletRequest request)
    {
        return userClient.banUser(request);
    }

    @RequestMapping("/unbanUser")
    public  Integer unbanUser(HttpServletRequest request)
    {
        return  userClient.unbanUser(request);
    }
}
