package com.example.demo.DaoImpl;


import com.example.demo.Dao.UserDao;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    public UserRepository userRepository;
}
