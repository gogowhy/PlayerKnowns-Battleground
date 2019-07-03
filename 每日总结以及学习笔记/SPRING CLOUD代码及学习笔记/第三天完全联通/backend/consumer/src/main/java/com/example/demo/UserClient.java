package com.example.demo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("user-client")
public interface UserClient {
    @RequestMapping("/user/register")
    String register();

    @RequestMapping("/user/login")
    String login();

    @RequestMapping("/user/resetPass")
    String resetPass();

    @RequestMapping("user/test")
    String test();
}
