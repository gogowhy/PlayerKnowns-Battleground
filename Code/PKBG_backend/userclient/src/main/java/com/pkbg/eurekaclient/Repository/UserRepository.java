package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class UserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public User findByUsername(String username)
    {
        Query query=new Query(Criteria.where("username").is(username));
        User user =  mongoTemplate.findOne(query , User.class);
        return user;
    }

    public void save(User user)
    {
        mongoTemplate.save(user);
    }


}
