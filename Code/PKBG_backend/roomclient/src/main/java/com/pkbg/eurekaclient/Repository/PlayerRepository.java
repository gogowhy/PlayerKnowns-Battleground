package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public interface PlayerRepository extends MongoRepository<Player, String> {

    public Player findByPlayername (String playername);
    public List<Player> findByRoomnumber(Integer roomnumber);

}
