package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserClient userClient;

    @RequestMapping("register")
    public String register() {
        return userClient.register();
    }

    @RequestMapping("login")
    public String login() {
        return userClient.login();
    }

    @RequestMapping("resetPass")
    public String resetPass() {
        return userClient.resetPass();
    }

    @RequestMapping("test")
    public String test()
    {
        return  userClient.test();
    }
}
