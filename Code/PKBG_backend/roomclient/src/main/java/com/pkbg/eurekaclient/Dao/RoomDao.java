package com.pkbg.eurekaclient.Dao;

import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public interface RoomDao {
    public String create(String hostname) throws IOException;
    public String dismiss(String if_hostname);
    public String join(Integer roomnumber, String username, Integer password) throws IOException ;
    public String quit(String username);
    public String hostquit(String username);
    public String kick(String if_hostname, Integer roomnumber, String username);
    public String changeToA(String username);
    public String changeToB(String username);
    public String ready(String username);
    public String cancel(String username);
    public String start(Integer roomnumber);
}
