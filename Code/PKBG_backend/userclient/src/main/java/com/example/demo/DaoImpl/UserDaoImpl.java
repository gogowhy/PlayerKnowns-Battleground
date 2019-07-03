package com.example.demo.DaoImpl;


import com.example.demo.Dao.UserDao;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;

@Repository
public class UserDaoImpl implements UserDao {
@Autowired
    public UserRepository userRepository;


@Override
    public String register(HttpServletRequest request)
{
    String username = request.getParameter("username");
    String password = request.getParameter("userpassword");
    String email = request.getParameter("useremail");
    String tele = request.getParameter("usertele");
    User user = new User();
    user.setUsername(username);
    user.setUserpassword(password);
    user.setUseremail(email);
    user.setUsertele(tele);
    userRepository.save(user);
    return "Register Successfully! Welcome "+username;
}

@Override
public String login(HttpServletRequest request)
{
    String username = request.getParameter("username");
    String password = request.getParameter("userpassword");
    User user = userRepository.findByUsername(username);
    String userpassword = user.getUserpassword();
    if (password.equals(userpassword)) return "Login Successfully! Welcome "+username;
        else return "Wrong Info, Please Check Your Password";
}

@Override
public String resetPass(HttpServletRequest request)
{
    String username = request.getParameter("username");//fetch user info
    User user = userRepository.findByUsername(username);
    String mail = user.getUseremail();

    String str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//generate new random password
    Random random=new Random();
    StringBuffer nnewPass=new StringBuffer();
    for(int i=0;i<10;i++){
        int number=random.nextInt(62);
        nnewPass.append(str.charAt(number));
    }
    String newPass=new String(nnewPass);

    SimpleMailMessage message = new SimpleMailMessage();//send mail
    message.setFrom("757994086@qq.com");
    message.setTo(mail);
    message.setSubject("Reset Password");
    message.setText("New password is "+newPass);
    user.setUserpassword(newPass);
    userRepository.save(user);

    return "Reset Password Successfully, Please Check Your Mailbox.";
}

}
