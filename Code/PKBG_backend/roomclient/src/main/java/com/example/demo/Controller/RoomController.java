package com.example.demo.Controller;


import com.example.demo.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    public RoomService roomService;

    @RequestMapping("/create")
    @ResponseBody
    public String create(WebSocketSession session) throws IOException
    {
        return roomService.create(session);
    }


    @RequestMapping("/test")
    @ResponseBody
    public String test()
    {
        return "room-client";
    }


    @RequestMapping("/dismiss")
    @ResponseBody
    public String dismiss(WebSocketSession session)
    {
        return roomService.dismiss(session);
    }

    @RequestMapping("/join")
    @ResponseBody
    public String join(WebSocketSession session)
    {
        return roomService.join(session);
    }

    @RequestMapping("/quit")
    @ResponseBody
    public String quit(WebSocketSession session)
    {
        return roomService.quit(session);
    }

}
