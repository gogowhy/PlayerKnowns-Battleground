package com.example.demo.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient("room-client")
public interface RoomClient {

    @RequestMapping("/room/test")
    String roomtest();
}
