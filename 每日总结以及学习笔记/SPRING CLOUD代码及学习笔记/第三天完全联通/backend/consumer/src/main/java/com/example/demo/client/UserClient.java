package com.example.demo.client;

import com.netflix.ribbon.proxy.annotation.Http;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@FeignClient("user-client")
public interface UserClient {
    @RequestMapping("/user/register")
    String register(HttpServletRequest request);

    @RequestMapping("/user/login")
    String login(HttpServletRequest request);

    @RequestMapping("/user/resetPass")
    String resetPass(HttpServletRequest request);

    @RequestMapping("user/test")
    String test();
}
