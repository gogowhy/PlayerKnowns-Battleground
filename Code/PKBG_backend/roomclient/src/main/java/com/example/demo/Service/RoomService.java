package com.example.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Service
public interface RoomService {
    public String create(WebSocketSession session) throws IOException;
    public String dismiss(WebSocketSession session);
    public String join(WebSocketSession session) throws IOException;
    public String quit(WebSocketSession session);
}
