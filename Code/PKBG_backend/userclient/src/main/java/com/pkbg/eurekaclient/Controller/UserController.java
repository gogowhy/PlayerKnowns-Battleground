package com.pkbg.eurekaclient.Controller;


import com.pkbg.eurekaclient.Entity.User;

import com.pkbg.eurekaclient.Repository.UserRepository;
import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    private JavaMailSender mailSender;


    @Autowired
    public UserRepository userRepository;

    @RequestMapping("/register")
    @ResponseBody
    public Integer register(@RequestBody User user)
    {
        return userService.register(user);
    }

    @RequestMapping("/login")
    @ResponseBody
    public Integer login(@RequestBody User user) { return userService.login(user); }

    @RequestMapping("/resetPass")
    @ResponseBody
    public Integer resetPass(@RequestBody User user) { return userService.resetPass(user); }

    @RequestMapping("/test")
    @ResponseBody
    public String test()
    {
        return "hi";
    }

    @RequestMapping("/banUser")
    @ResponseBody
    public Integer banUser(@RequestBody User user)
    {
        return userService.banUser(user);
    }
    @RequestMapping("/unbanUser")
    @ResponseBody
    public Integer unbanUser(@RequestBody User user)
    {
        return userService.unbanUser(user);
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

    @RequestMapping("/queryAll")
    @ResponseBody
    public List<User> queryAll()
    {
        List<User> users = new ArrayList<User>();
        users=userRepository.findAll();
        return users;
    }

    @RequestMapping("/testmail")
    @ResponseBody
    public String testmail()
    {
        SimpleMailMessage message = new SimpleMailMessage();//send mail
        message.setFrom("757994086@qq.com");
        message.setTo("757994086@qq.com");
        message.setSubject("Reset Password");
        message.setText("New password is "+"12345678");
        mailSender.send(message);
        return "success";
    }
}
