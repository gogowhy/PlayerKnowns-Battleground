package com.pkbg.eurekaclient.Dao;

import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;

@Repository
public interface UserDao {
    public String register(HttpServletRequest request);
    public String login(HttpServletRequest request);
    public String resetPass(HttpServletRequest request);
    public String banUser(HttpServletRequest request);
    public String unbanUser(HttpServletRequest request);
}