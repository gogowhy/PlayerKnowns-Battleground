package com.example.demo.Dao;

import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;

@Repository
public interface UserDao {
    public String register(HttpServletRequest request);
}
