package com.pkbg.eurekaclient.Repository;

        import com.pkbg.eurekaclient.Entity.User;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.data.mongodb.core.MongoTemplate;
        import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
        import org.springframework.data.mongodb.core.query.Criteria;
        import org.springframework.data.mongodb.core.query.Query;
        import org.springframework.data.mongodb.repository.MongoRepository;
        import org.springframework.stereotype.Service;

@Service
public interface UserRepository extends MongoRepository<User, Integer> {

    public User findByUsername(String username);

}
