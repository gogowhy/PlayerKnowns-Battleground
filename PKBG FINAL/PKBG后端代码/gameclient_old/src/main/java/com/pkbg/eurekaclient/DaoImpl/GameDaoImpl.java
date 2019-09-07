package com.pkbg.eurekaclient.DaoImpl;

import com.pkbg.eurekaclient.Dao.GameDao;
import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Entity.User;
import com.pkbg.eurekaclient.Handler.MyHandler;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.UserRepository;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.TextMessage;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class GameDaoImpl implements GameDao {

    @Autowired
    public PlayerRepository playerRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public MongoTemplate mongoTemplate;

    public void updateplayer(Player player)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player.getPlayername()));
        String collectionname = "player";
        Update update = new Update();
        update.set("male",player.getMale());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("upperr",player.getUpperr());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("upperg",player.getUpperg());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("upperb",player.getUpperb());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("lowerr",player.getLowerr());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("lowerg",player.getLowerg());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("lowerb",player.getLowerb());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("HP",player.getHP());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("weaponname",player.getWeaponname());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("times",player.getTimes());
        mongoTemplate.updateFirst(query,update,collectionname);
        update.set("kill",player.getKill());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public void updateuser(User user)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("username").is(user.getUsername()));
        String collectionname = "PKBG";
        Update update = new Update();
        update.set("coins",user.getCoins());
        mongoTemplate.updateFirst(query,update,collectionname);
    }

    public  String shoot(String playername,Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb)
    {
        MyHandler myHandler = new MyHandler();
        Player player1 = playerRepository.findByPlayername(playername);
        Integer team1 = player1.getPlayerteam();
        Integer roomnumber = player1.getRoomnumber();
        List<Player> players = playerRepository.findByRoomnumber(roomnumber);
        Double minn = new Double(500);
        Map<Integer,String> map = new HashMap<>();
        Integer j = new Integer(0);
        for (int i=0;i<players.size();i++)
        {
            Player player_temp = players.get(i);
            String name = player_temp.getPlayername();
            if (name.equals(playername)) continue;
            BigDecimal tempt = new BigDecimal(player_temp.getMale()+player_temp.getUpperr()+player_temp.getUpperg()+player_temp.getUpperb()+player_temp.getLowerr()+player_temp.getLowerg()+player_temp.getLowerb());
            BigDecimal orit = new BigDecimal(male+upperr+upperg+upperb+lowerr+lowerg+lowerb);
            Double dtempt = tempt.doubleValue();
            Double dorit = orit.doubleValue();
            Double mint = new Double(0);
            if (dtempt<dorit) mint=dorit-dtempt;
                else mint = dtempt-dorit;
            if (minn>mint)
            {
                minn = mint;
                map.put(j, player_temp.getPlayername());
                j++;
            }
        }
        if (j!=0)
        {
            Player player2 = playerRepository.findByPlayername(map.get(j-1));
            Integer team2 = player2.getPlayerteam();
            if (team1.equals(team2))
            {
                return "Hit Teammate!";
            }
            Integer HP = player2.getHP();
            Integer newHP = HP-34;
            Map<String,Object> map1 = new HashMap<>();
            map1.put("code",7);
            map1.put("victim",player2.getPlayername());
            JSONArray json1 = JSONArray.fromObject(map1);
            String message1 = json1.toString();
            myHandler.sendMessageToUser(playername, new TextMessage(message1));

            Map<String,Object> map2 = new HashMap<>();
            map2.put("code",8);
            map2.put("shooter",playername);
            JSONArray json2 = JSONArray.fromObject(map2);
            String message2 = json2.toString();
            String playername2 = player2.getPlayername();
            myHandler.sendMessageToUser(playername2, new TextMessage(message2));
            if (newHP>0)
            {
                player2.setHP(newHP);
                updateplayer(player2);
            }
            else {
                Integer kill = player1.getKill();
                player1.setKill(kill+1);
                updateplayer(player1);
                player2.setHP(0);
                updateplayer(player2);
                Map<String,Object> map3 = new HashMap<>();
                map3.put("code",6);
                map3.put("shooter",playername);
                map3.put("victim",player2.getPlayername());
                JSONArray json3 = JSONArray.fromObject(map3);
                String message3 = json3.toString();
                Integer flag = new Integer(0);
                for(int i=0;i<players.size();i++)
                {
                    Player player_temp = players.get(i);
                    if (player_temp.getPlayerteam()==player2.getPlayerteam())
                        if (player_temp.getHP()>0)
                            flag=1;
                    myHandler.sendMessageToUser(player_temp.getPlayername(), new TextMessage(message3));
                }
                if (flag==0)
                {
                    Map<String,Object> map4 = new HashMap<>();
                    map4.put("code",5);
                    JSONArray json4 = JSONArray.fromObject(map4);
                    String message4 = json4.toString();
                    Map<String,Object> map5 = new HashMap<>();
                    map5.put("code",4);
                    JSONArray json5 = JSONArray.fromObject(map5);
                    String message5 = json5.toString();
                    for(int i=0;i<players.size();i++)
                    {
                        Player player_temp = players.get(i);
                        Integer kill_temp = player_temp.getKill();
                        User user_temp = userRepository.findByUsername(player_temp.getPlayername());
                        Integer coins = user_temp.getCoins();
                        if (player_temp.getPlayerteam()==player2.getPlayerteam())
                        {
                            myHandler.sendMessageToUser(player_temp.getPlayername(), new TextMessage(message4));
                            user_temp.setCoins(coins+50+kill_temp*20);
                            updateuser(user_temp);
                        }
                        else
                        {
                            myHandler.sendMessageToUser(player_temp.getPlayername(), new TextMessage(message5));
                            user_temp.setCoins(coins+100+kill_temp*20);
                            updateuser(user_temp);
                        }
                    }
                }
            }
            return "Success!";
        }
        /*Map<String,Object> map = new HashMap<String,Object>();
        map.put("code",9);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername1 = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername1, new TextMessage(message));
        }*/
        return "Miss Shot!";
    }

    public Integer compare(Integer a,Integer b)
    {
        BigDecimal c = new BigDecimal((float)(a-b)/b);
        BigDecimal d = new BigDecimal(0.1);
        return c.compareTo(d);//< -1 = 0 > 1
    }

    public Integer compared(Double a,Double b)
    {
        BigDecimal c = new BigDecimal((float)(a-b)/b);
        BigDecimal d = new BigDecimal(0.1);
        return c.compareTo(d);//< -1 = 0 > 1
    }

    public String start(String playername,Integer times, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb)
    {
        Player player = playerRepository.findByPlayername(playername);
        Integer roomnumber = player.getRoomnumber();

        player.setHP(100);
        player.setWeaponname("AK47");

        if (times==1)
        {
            player.setMale(male);
            player.setUpperr(upperr);
            player.setUpperg(upperg);
            player.setUpperb(upperb);
            player.setLowerr(lowerr);
            player.setLowerg(lowerg);
            player.setLowerb(lowerb);
            player.setTimes(1);
            updateplayer(player);
            System.out.println("time1");
        }
        if (times == 2)
        {
            Double omale = new Double(player.getMale());
            Integer oupperr = new Integer(player.getUpperr());
            Integer oupperg = new Integer(player.getUpperg());
            Integer oupperb = new Integer(player.getUpperb());
            Integer olowerr = new Integer(player.getLowerr());
            Integer olowerg = new Integer(player.getLowerg());
            Integer olowerb = new Integer(player.getLowerb());
            Integer flag = new Integer(0);
            if (compared(male, omale) > 0) flag++;
            if (compare(upperr, oupperr) > 0) flag++;
            if (compare(upperg, oupperg) > 0) flag++;
            if (compare(upperb, oupperb) > 0) flag++;
            if (compare(lowerr, olowerr) > 0) flag++;
            if (compare(lowerg, olowerg) > 0) flag++;
            if (compare(lowerb, olowerb) > 0) flag++;
            if (flag > 2)
            {
                player.setTimes(0);
                updateplayer(player);
                return "unsuitable";//unsuitable
            }
            player.setMale((male + omale) / 2);
            player.setUpperr((upperr + oupperr) / 2);
            player.setUpperg((upperg + oupperg) / 2);
            player.setUpperb((upperb + oupperb) / 2);
            player.setLowerr((lowerr + olowerr) / 2);
            player.setLowerg((lowerg + olowerg) / 2);
            player.setLowerb((lowerb + olowerb) / 2);
            player.setTimes(2);
            updateplayer(player);
            System.out.println("time2");
        }
        if (times == 3)
        {
            Double tmale = new Double(player.getMale());
            Integer tupperr = new Integer(player.getUpperr());
            Integer tupperg = new Integer(player.getUpperg());
            Integer tupperb = new Integer(player.getUpperb());
            Integer tlowerr = new Integer(player.getLowerr());
            Integer tlowerg = new Integer(player.getLowerg());
            Integer tlowerb = new Integer(player.getLowerb());
            Integer flag2 = new Integer(0);
            if (compared(male, tmale) > 0) flag2++;
            if (compare(upperr, tupperr) > 0) flag2++;
            if (compare(upperg, tupperg) > 0) flag2++;
            if (compare(upperb, tupperb) > 0) flag2++;
            if (compare(lowerr, tlowerr) > 0) flag2++;
            if (compare(lowerg, tlowerg) > 0) flag2++;
            if (compare(lowerb, tlowerb) > 0) flag2++;
            if (flag2 > 2)
            {
                player.setTimes(0);
                updateplayer(player);
                return "unsuitable";//unsuitable
            }
            player.setMale((2 * male + tmale) / 3);
            player.setUpperr((2 * upperr + tupperr) / 3);
            player.setUpperg((2 * upperg + tupperg) / 3);
            player.setUpperb((2 * upperb + tupperb) / 3);
            player.setLowerr((2 * lowerr + tlowerr) / 3);
            player.setLowerg((2 * lowerg + tlowerg) / 3);
            player.setLowerb((2 * lowerb + tlowerb) / 3);
            player.setTimes(3);
            updateplayer(player);
            System.out.println("time3");
            MyHandler myHandler = new MyHandler();
            List<Player> players = playerRepository.findByRoomnumber(roomnumber);
            Integer flag3 = new Integer(0);
            for (int i = 0; i < players.size(); i++) {
                Player player_temp = players.get(i);
                Integer times_temp = player_temp.getTimes();
                if (times_temp != 3) {
                    flag3 = 1;
                    break;
                }
            }
            if (flag3 == 1) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("code", 101);//One Ready
                JSONArray json = JSONArray.fromObject(map);
                String message2 = json.toString();
                System.out.println(message2);
                myHandler.sendMessageToUser(playername, new TextMessage(message2));
            }
            if (flag3 == 0) {
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("code", 103);//All Ready
                JSONArray json = JSONArray.fromObject(map);
                String message2 = json.toString();
                System.out.println(message2);
                for (int i = 0; i < players.size(); i++) {
                    Player player_temp = players.get(i);
                    String playername_temp = player_temp.getPlayername();
                    myHandler.sendMessageToUser(playername_temp, new TextMessage(message2));
                }
            }
        }
        return "Success!";
    }

    public String aim(String player, Double direction)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player));
        String collectionname = "player";
        Update update = new Update();
        update.set("direction",direction);
        mongoTemplate.updateFirst(query,update,collectionname);
        return "Success!";
    }


    public String updategps(String player, Double longitude, Double latitude)
    {
        Query query = new Query();
        Criteria criteria = new Criteria();
        query.addCriteria(Criteria.where("playername").is(player));
        String collectionname = "player";
        Update update = new Update();
        update.set("longitude",longitude);
        update.set("latitude",latitude);
        mongoTemplate.updateFirst(query,update,collectionname);
        return "Success!";
    }
}
