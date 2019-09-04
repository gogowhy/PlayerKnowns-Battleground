package com.pkbg.eurekaclient.DaoImpl;

import com.pkbg.eurekaclient.Dao.UserDao;
import com.pkbg.eurekaclient.Entity.Name;
import com.pkbg.eurekaclient.Entity.Storage;
import com.pkbg.eurekaclient.Entity.User;
import com.pkbg.eurekaclient.Entity.Weapon;
import com.pkbg.eurekaclient.Repository.StorageRepository;
import com.pkbg.eurekaclient.Repository.UserRepository;
import com.pkbg.eurekaclient.Repository.WeaponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoDbUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public StorageRepository storageRepository;

    @Autowired
    public WeaponRepository weaponRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void update(User user)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("username").is(user.getUsername()));
        String collectionname = "PKBG";
        Update update = new Update();
        update.set("userpassword",user.getUserpassword());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    @Override
    public Integer register(User uuuser) {
        String username = uuuser.getUsername();
        User uuser = new User();
        uuser = userRepository.findByUsername(username);
        if (uuser==null) {
            String password = uuuser.getUserpassword();
            String email = uuuser.getUseremail();
            String tele = uuuser.getUsertele();
            User user = new User();
            user.setUsername(username);
            user.setUserpassword(password);
            user.setUseremail(email);
            user.setUsertele(tele);
            user.setCoins(0);
            user.setState(0);
            user.setWeapon("M16");
            userRepository.save(user);
            return 1;//return "Register Successfully! Welcome " + username;
        }
        return 0;//return "Username Already Used!";
    }

    @Override
    public Integer login(User uuser) {
        String username = uuser.getUsername();
        String password = uuser.getUserpassword();
        System.out.println(username);
        System.out.println(password);
        User user = userRepository.findByUsername(username);
       /* if (user.equals(null)) return 3;//user not found
        Integer state = user.getState();
        if (state == 1) return 0;//return "Your Account Is Banned!";
        String userpassword = user.getUserpassword();
        if (password.equals(userpassword)) return 1;//return "Login Successfully! Welcome " + username;
        else return 2;//return "Wrong Info, Please Check Your Password";*/
        System.out.println(user.getUsername());
        System.out.println(user.getUserpassword());
       if(user.getUserpassword().equals(password))
       {
           System.out.println("jinlaile");
           return 1;
       }
       if(!user.getUserpassword().equals(password))
       {
           System.out.println("mimabudui");
           return 2;
       }
       return 0;
    }

    @Override
    public Integer resetPass(User uuser)
    {
        String username = uuser.getUsername();//fetch user info
        System.out.println(username);
        User user =userRepository.findByUsername(username);
        /*user.setUserpassword("111");
        String pass="111";
        Integer state =user.getState();*/

        //userRepository.save(user);
        //User user = userRepository.findByUsername(username);
        //if (user.equals(null)) return 1;//user not found
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
        mailSender.send(message);
        user.setUserpassword(newPass);
        update(user);
        System.out.println("update");

        //return 0;//return "Reset Password Successfully, Please Check Your Mailbox.";
        return 0;
    }

    @Override
    public Integer banUser(User uuser)
    {
        String username = uuser.getUsername();
        User user = userRepository.findByUsername(username);
        Integer s = user.getState();
        if (s == 0) {
            user.setState(1);
            return 0;//return "Ban Successfully!";
        }
        if (s == 1) return 1;//return "Error! User Already Banned!";
        return 2;//return "Cannot Ban Admin!";
    }

    @Override
    public Integer unbanUser(User uuser)
    {
        String username = uuser.getUsername();
        User user = userRepository.findByUsername(username);
        Integer s = user.getState();
        if (s == 1) {
            user.setState(0);
            return 0;//return "unBan Successfully!";
        }
        if (s == 0) return 1;//return "Error! User Already Unbanned!";
        return 2;//return "Cannot Unban Admin!";

    }

    @Override
    public Integer buy(Storage storage)
    {
        String username = storage.getUsername();
        String weapon = storage.getWeapon();
        List<Storage> storages = storageRepository.findByUsername(username);
        for (int i=0; i<storages.size(); i++)
        {
            Storage storage_temp = storages.get(i);
            String weapon_temp = storage_temp.getWeapon();
            if (weapon_temp.equals(weapon)) return -1;//already possess
        }
        User user = userRepository.findByUsername(username);
        Integer coins = user.getCoins();
        Weapon weapon1 = weaponRepository.findByName(weapon);
        Integer price = weapon1.getPrice();
        if (coins<price) return -1;//not enough coins
        storageRepository.save(storage);
        Integer newcoins = coins-price;
        user.setCoins(newcoins);
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("username").is(username));
        String collectionname = "PKBG";
        Update update = new Update();
        update.set("coins",user.getCoins());
        mongoTemplate.updateFirst(query,update,collectionname);
        return 0;//success
    }

    @Override
    public Integer equip(Storage storage)
    {
        String username = storage.getUsername();
        String weapon = storage.getWeapon();
        List<Storage> storages = storageRepository.findByUsername(username);
        User user = userRepository.findByUsername(username);
        for (int i=0; i<storages.size(); i++)
        {
            Storage storage_temp = storages.get(i);
            String weapon_temp = storage_temp.getWeapon();
            if (weapon_temp.equals(weapon))
            {
                user.setWeapon(weapon);
                Query query = new Query();
                Criteria criteria = new Criteria();
                query.addCriteria(Criteria.where("username").is(username));
                String collectionname = "PKBG";
                Update update = new Update();
                update.set("weapon",user.getWeapon());
                mongoTemplate.updateFirst(query,update,collectionname);
                return 0;//success
            }
        }
        return 1;//not have this
    }

    @Override
    public Map<String,Object> getstorage(Name name)
    {
        String username = name.getUsername();
        List<Storage> storages = storageRepository.findByUsername(username);
        Map<String,Object> map = new HashMap<>();
        User user = userRepository.findByUsername(username);
        String weapon = user.getWeapon();
        map.put("guns",storages);
        map.put("using_gun",weapon);
        return map;
    }

    @Override
    public Map<String,Object> getmarket(Name name)
    {
        String username = name.getUsername();
        List<Weapon> market = weaponRepository.findAll();
        User user = userRepository.findByUsername(username);
        Integer coins = user.getCoins();
        Map<String,Object> map = new HashMap<>();
        map.put("guns",market);
        map.put("gold",coins);
        return map;
    }

}
