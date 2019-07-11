package com.pkbg.eurekaclient.Service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface UserService {
    public String register(HttpServletRequest request);
    public String login(HttpServletRequest request);
    public String resetPass(HttpServletRequest request);

    public  String banUser(HttpServletRequest request);
    public  String unbanUser(HttpServletRequest request);

}