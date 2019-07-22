package com.pkbg.eurekaclient.DaoImpl;

import com.pkbg.eurekaclient.Dao.GameDao;
import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Handler.MyHandler;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
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
    public MongoTemplate mongoTemplate;

    @Autowired
    public MyHandler myHandler;

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
    }

    public  String shoot(String playername,Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb)
    {
        Player player1 = playerRepository.findByPlayername(playername);
        Integer team1 = player1.getPlayerteam();
        Integer roomnumber = player1.getRoomnumber();
        List<Player> players = playerRepository.findByRoomnumber(roomnumber);
        Double minn = new Double(30);
        Map<Integer,String> map = new HashMap<>();
        Integer j = new Integer(0);
        for(int i=0;i<players.size();i++)
        {
            Player player_temp = players.get(i);
            BigDecimal tempt = new BigDecimal(player_temp.getMale()+player_temp.getUpperr()+player_temp.getUpperg()+player_temp.getUpperb()+player_temp.getLowerr()+player_temp.getLowerg()+player_temp.getLowerb());
            BigDecimal orit = new BigDecimal(male+upperr+upperg+upperb+lowerr+lowerg+lowerb);
            Double dtempt = tempt.doubleValue();
            Double dorit = orit.doubleValue();
            Double mint = new Double(0);
            if (dtempt<dorit) mint=dorit-dtempt;
                else mint = dtempt-dorit;
            if (minn>mint) minn=mint;
            map.put(j,player_temp.getPlayername());
            j++;
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
            Integer newHP = HP-30;
            if (newHP>0)
            {
                player2.setHP(newHP);
            }
            else {

            }
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

        player.setHP(100);
        player.setWeaponname("AK47");

        switch (times)
        {
            case 1:
                player.setMale(male);
                player.setUpperr(upperr);
                player.setUpperg(upperg);
                player.setUpperb(upperb);
                player.setLowerr(lowerr);
                player.setLowerg(lowerg);
                player.setLowerb(lowerb);
                break;
            case 2:
                Double omale = new Double(player.getMale());
                Integer oupperr = new Integer(player.getUpperr());
                Integer oupperg = new Integer(player.getUpperg());
                Integer oupperb = new Integer(player.getUpperb());
                Integer olowerr = new Integer(player.getLowerr());
                Integer olowerg = new Integer(player.getLowerg());
                Integer olowerb = new Integer(player.getLowerb());
                Integer flag = new Integer(0);
                if (compared(male,omale)>0) flag++;
                if (compare(upperr,oupperr)>0) flag++;
                if (compare(upperg,oupperg)>0) flag++;
                if (compare(upperb,oupperb)>0) flag++;
                if (compare(lowerr,olowerr)>0) flag++;
                if (compare(lowerg,olowerg)>0) flag++;
                if (compare(lowerb,olowerb)>0) flag++;
                if (flag>2) return "unsuitable";//unsuitable
                player.setMale((male+omale)/2);
                player.setUpperr((upperr+oupperr)/2);
                player.setUpperg((upperg+oupperg)/2);
                player.setUpperb((upperb+oupperb)/2);
                player.setLowerr((lowerr+olowerr)/2);
                player.setLowerg((lowerg+olowerg)/2);
                player.setLowerb((lowerb+olowerb)/2);
                updateplayer(player);
                break;
            case 3:
                Double tmale = new Double(player.getMale());
                Integer tupperr = new Integer(player.getUpperr());
                Integer tupperg = new Integer(player.getUpperg());
                Integer tupperb = new Integer(player.getUpperb());
                Integer tlowerr = new Integer(player.getLowerr());
                Integer tlowerg = new Integer(player.getLowerg());
                Integer tlowerb = new Integer(player.getLowerb());
                Integer flag2 = new Integer(0);
                if (compared(male,tmale)>0) flag2++;
                if (compare(upperr,tupperr)>0) flag2++;
                if (compare(upperg,tupperg)>0) flag2++;
                if (compare(upperb,tupperb)>0) flag2++;
                if (compare(lowerr,tlowerr)>0) flag2++;
                if (compare(lowerg,tlowerg)>0) flag2++;
                if (compare(lowerb,tlowerb)>0) flag2++;
                if (flag2>2) return "unsuitable";//unsuitable
                player.setMale((male+tmale)/2);
                player.setUpperr((upperr+tupperr)/2);
                player.setUpperg((upperg+tupperg)/2);
                player.setUpperb((upperb+tupperb)/2);
                player.setLowerr((lowerr+tlowerr)/2);
                player.setLowerg((lowerg+tlowerg)/2);
                player.setLowerb((lowerb+tlowerb)/2);
                updateplayer(player);
                break;
        }
        return "Success";
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
        return "Success";
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
        return "Success";
    }
}
