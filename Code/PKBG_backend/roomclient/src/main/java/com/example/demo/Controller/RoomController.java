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
    public String create(String hostname) throws IOException
    {
        return roomService.create(hostname);
    }


    @RequestMapping("/test")
    @ResponseBody
    public String test()
    {
        return "room-client";
    }


    @RequestMapping("/dismiss")
    @ResponseBody
    public String dismiss(String if_hostname)
    {
        return roomService.dismiss(if_hostname);
    }

    @RequestMapping("/join")
    @ResponseBody
    public String join(Integer roomnumber, String username, Integer password) throws IOException
    {
        return roomService.join(roomnumber, username, password);
    }



}
