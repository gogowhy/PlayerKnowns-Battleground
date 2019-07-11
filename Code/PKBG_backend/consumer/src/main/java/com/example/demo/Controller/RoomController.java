package com.example.demo.Controller;


import com.example.demo.client.RoomClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {

    @Autowired
    RoomClient roomClient;

    @RequestMapping("roomtest")
    public String roomtest()
    {
        return roomClient.roomtest();
    }
}
