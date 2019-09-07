package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room,Integer> {


    public Room findByRoomnumber(Integer roomnumber);
    public  Room findByHostname(String hostname);
}