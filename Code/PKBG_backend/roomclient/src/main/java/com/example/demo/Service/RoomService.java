package com.example.demo.Service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
@Service
public interface RoomService {
    public String create(HttpServletRequest request);
    public String dismiss(HttpServletRequest request);
    public String join(HttpServletRequest request);
    public String quit(HttpServletRequest request);
}
