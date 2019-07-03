package com.example.demo.Dao;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;

@Repository
public interface UserDao {
    public String register(HttpServletRequest request);
    public String login(HttpServletRequest request);
    public String resetPass(HttpServletRequest request);
}
