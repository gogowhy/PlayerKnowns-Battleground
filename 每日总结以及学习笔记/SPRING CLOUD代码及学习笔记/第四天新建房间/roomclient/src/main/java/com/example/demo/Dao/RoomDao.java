package com.example.demo.Dao;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;

@Repository
public interface RoomDao {
    public String create(HttpServletRequest request);
}
