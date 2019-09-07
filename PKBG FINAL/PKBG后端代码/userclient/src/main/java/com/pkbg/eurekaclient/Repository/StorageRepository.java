package com.pkbg.eurekaclient.Repository;

import com.pkbg.eurekaclient.Entity.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StorageRepository extends MongoRepository<Storage, String> {

    public List<Storage> findByUsername(String username);

}
