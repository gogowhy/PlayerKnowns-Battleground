package com.pkbg.eurekaclient.Service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public interface RoomService {
    public Map<String,Object> create(String hostname) throws IOException;
    public String dismiss(String if_hostname);
    public Integer join(Integer roomnumber, String username, Integer password) throws IOException ;
    public String quit(String username);
    public String hostquit(String username);
    public String kick(String if_hostname, Integer roomnumber, String username);
    public String changeToA(String username);
    public String changeToB(String username);
    public String ready(String username);
    public String cancel(String username);
    public String start(Integer roomnumber);
}
