package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class RoomRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Room findByRoomnumber(Integer roomnumber)
    {
        Query query=new Query(Criteria.where("roomnumber").is(roomnumber));
        Room room =  mongoTemplate.findOne(query , Room.class);
        return room;
    }

    public void save(Room room)
    {
        mongoTemplate.save(room);
    }

    public  Room findByHostname(String hostname)
    {
        Query query=new Query(Criteria.where("hostname").is(hostname));
        Room room =  mongoTemplate.findOne(query , Room.class);
        return room;
    }

    public void delete(Room room)
    {
        mongoTemplate.remove(room);
    }
}