package com.pkbg.eurekaclient.Controller;


import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;

    @RequestMapping("/register")
    @ResponseBody
    public String register(HttpServletRequest request)
    {
        return userService.register(request);
    }

    @RequestMapping("/login")
    @ResponseBody
    public String login(HttpServletRequest request) { return userService.login(request); }

    @RequestMapping("/resetPass")
    @ResponseBody
    public String resetPass(HttpServletRequest request) { return userService.resetPass(request); }

    @RequestMapping("/test")
    @ResponseBody
    public String test()
    {
        return "hi";
    }

    @RequestMapping("/banUser")
    @ResponseBody
    public String banUser(HttpServletRequest request)
    {
        return userService.banUser(request);
    }
    @RequestMapping("/unbanUser")
    @ResponseBody
    public String unbanUser(HttpServletRequest request)
    {
        return userService.unbanUser(request);
    }
}
