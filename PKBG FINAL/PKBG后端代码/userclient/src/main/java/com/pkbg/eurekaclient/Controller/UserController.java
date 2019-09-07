package com.pkbg.eurekaclient.Controller;


import com.pkbg.eurekaclient.Entity.Name;
import com.pkbg.eurekaclient.Entity.Storage;
import com.pkbg.eurekaclient.Entity.User;

import com.pkbg.eurekaclient.Repository.UserRepository;
import com.pkbg.eurekaclient.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public MongoTemplate mongoTemplate;

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

    @RequestMapping("/buy")
    @ResponseBody
    public Integer buy(@RequestBody Storage storage)
    {
        return userService.buy(storage);
    }

    @RequestMapping("/equip")
    @ResponseBody
    public Integer equip(@RequestBody Storage storage)
    {
        return userService.equip(storage);
    }

    @RequestMapping("/getstorage")
    @ResponseBody
    public Map<String,Object> getstorage(@RequestBody Name name)
    {
        return userService.getstorage(name);
    }

    @RequestMapping("/getmarket")
    @ResponseBody
    public Map<String,Object> getmarket(@RequestBody Name name)
    {
        return userService.getmarket(name);
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

    @RequestMapping("/testuserexist")
    @ResponseBody
    public Integer testuserexist(HttpServletRequest request)
    {
        try
        {
            String name = request.getParameter("username");
            System.out.println(name);
            User user = userRepository.findByUsername(name);
            System.out.println("found");
            return 1;
        }
        catch (Exception e)
        {
            System.out.println("null");
            return 0;
        }
    }

    @RequestMapping("/changepass")
    @ResponseBody
    public Integer changepass(@RequestBody Map<String,Object> map) throws IOException
    {
        String name =map.get("username").toString();
        String oldpass =map.get("oldpass").toString();
        String newpass =map.get("newpass").toString();
        System.out.println(name);
        System.out.println(oldpass);
        System.out.println(newpass);
        User user = userRepository.findByUsername(name);
        String pass = user.getUserpassword();
        System.out.println(pass);
        if (!pass.equals(oldpass)) return 0;
        user.setUserpassword(newpass);
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("username").is(name));
        String collectionname = "PKBG";
        Update update = new Update();
        update.set("userpassword",user.getUserpassword());
        mongoTemplate.updateFirst(query,update,collectionname);
        return 1;
    }
}
