package com.example.demo.Service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
@Service
public interface RoomService {
    public String create(HttpServletRequest request);

}