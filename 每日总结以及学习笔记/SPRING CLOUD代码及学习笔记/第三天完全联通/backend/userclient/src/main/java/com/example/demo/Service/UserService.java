package com.example.demo.Service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
@Service
public interface UserService {
public String register(HttpServletRequest request);
public String login(HttpServletRequest request);
public String resetPass(HttpServletRequest request);

}
