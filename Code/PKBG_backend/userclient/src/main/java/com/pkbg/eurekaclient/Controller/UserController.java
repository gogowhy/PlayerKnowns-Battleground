package com.pkbg.eurekaclient.Controller;


import com.pkbg.eurekaclient.Entity.User;

import com.pkbg.eurekaclient.Repository.UserRepository;
import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;


    @Autowired
    public UserRepository userRepository;

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

    @RequestMapping("add/{username}/{state}/{tele}/{pass}/{coins}/{email}")
    @ResponseBody
    public  String newuser(@PathVariable("username") String name,@PathVariable("state") Integer state,
                           @PathVariable("tele") String tele,@PathVariable("pass") String pass,
                           @PathVariable("coins") Integer coins,@PathVariable("email") String email) {
        User user = new User();
        user.setState(state);
        user.setUseremail(email);
        user.setUserpassword(pass);
        user.setUsername(name);
        user.setUsertele(tele);
        user.setCoins(coins);
        userRepository.save(user);
        return "new ok";
    }
}
