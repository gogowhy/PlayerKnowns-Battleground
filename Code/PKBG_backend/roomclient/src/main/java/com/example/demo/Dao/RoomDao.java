package com.example.demo.Dao;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.stereotype.Repository;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Repository
public interface RoomDao {
    public String create(WebSocketSession session) throws IOException;
    public String dismiss(WebSocketSession session);
    public String join(WebSocketSession session) throws IOException ;
    public String quit(WebSocketSession session);
}
