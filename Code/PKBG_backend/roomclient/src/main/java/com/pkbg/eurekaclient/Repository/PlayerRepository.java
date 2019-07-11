package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

public class PlayerRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Player findByPlayername(String playername)
    {
        Query query=new Query(Criteria.where("playername").is(playername));
        Player player =  mongoTemplate.findOne(query , Player.class);
        return player;
    }

    public void save(Player player)
    {
        mongoTemplate.save(player);
    }

    public void delete(Player player)
    {
        mongoTemplate.remove(player);
    }

    public List<Player> findByRoomnumber(Integer roomnumber)
    {
        String str = Integer.toString(roomnumber);
        List players = new ArrayList();
        players=mongoTemplate.findAll(Player.class,str);
        return players;
    }
}
