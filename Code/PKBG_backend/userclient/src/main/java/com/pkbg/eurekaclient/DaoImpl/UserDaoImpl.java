package com.pkbg.eurekaclient.DaoImpl;

import com.pkbg.eurekaclient.Dao.UserDao;
import com.pkbg.eurekaclient.Entity.User;
import com.pkbg.eurekaclient.Repository.UserRepository;
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
    public String register(HttpServletRequest request) {
        String username = request.getParameter("username");
        User uuser = new User();
        uuser = userRepository.findByUsername(username);
        if (uuser==null) {
            String password = request.getParameter("userpassword");
            String email = request.getParameter("useremail");
            String tele = request.getParameter("usertele");
            User user = new User();
            user.setUsername(username);
            user.setUserpassword(password);
            user.setUseremail(email);
            user.setUsertele(tele);
            userRepository.save(user);
            return "Register Successfully! Welcome " + username;
        }
        return "Username Already Used!";
    }

    @Override
    public String login(HttpServletRequest request) {
        String username = request.getParameter("username");
        String password = request.getParameter("userpassword");
        User user = userRepository.findByUsername(username);
        Integer state = user.getState();
        if (state == 1) return "Your Account Is Banned!";
        String userpassword = user.getUserpassword();
        if (password.equals(userpassword)) return "Login Successfully! Welcome " + username;
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

    @Override
    public String banUser(HttpServletRequest request)
    {
        String username = request.getParameter("username");
        User user = userRepository.findByUsername(username);
        Integer s = user.getState();
        if (s == 0) {
            user.setState(1);
            return "Ban Successfully!";
        }
        if (s == 1) return "Error! User Already Banned!";
        return "Cannot Ban Admin!";
    }

    @Override
    public String unbanUser(HttpServletRequest request)
    {
        String username = request.getParameter("username");
        User user = userRepository.findByUsername(username);
        Integer s = user.getState();
        if (s == 1) {
            user.setState(0);
            return "unBan Successfully!";
        }
        if (s == 0) return "Error! User Already Unbanned!";
        return "Cannot Unban Admin!";

    }

}
