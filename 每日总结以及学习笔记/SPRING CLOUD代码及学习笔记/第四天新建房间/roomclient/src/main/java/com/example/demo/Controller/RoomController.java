package com.example.demo.Controller;


import com.example.demo.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    public RoomService roomService;

    @RequestMapping("/create")
    @ResponseBody
    public String create(HttpServletRequest request)
    {
        return roomService.create(request);
    }


    @RequestMapping("/test")
    @ResponseBody
    public String test()
    {
        return "room-client";
    }

}
