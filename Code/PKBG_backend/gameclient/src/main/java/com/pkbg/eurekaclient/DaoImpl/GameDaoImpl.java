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

    public  String shoot(String player, Double longitude, Double latitude)
    {
        Player player1 = playerRepository.findByPlayername(player);
        Integer roomnumber = player1.getRoomnumber();
        List<Player> players = playerRepository.findByRoomnumber(roomnumber);
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("code",9);
        JSONArray json2 = JSONArray.fromObject(map);
        String message = json2.toString();
        for(int i=0;i<players.size();i++)
        {
            Player player_temp=players.get(i);
            String playername = player_temp.getPlayername();
            myHandler.sendMessageToUser(playername, new TextMessage(message));
        }
        //wait for all GPS

        return "";
    }


    public String start(Integer roomnumber)
    {

        return "";
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
