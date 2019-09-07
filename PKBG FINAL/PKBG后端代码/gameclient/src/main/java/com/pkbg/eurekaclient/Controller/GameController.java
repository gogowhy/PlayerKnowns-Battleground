package com.pkbg.eurekaclient.Controller;

import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    public GameService gameService;

    @RequestMapping("/queryAll")
    @ResponseBody
    public List<Player> queryAll()
    {
        return gameService.queryAll();
    }
}
