package com.pkbg.eurekaclient.Controller;

import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Handler.MyHandler;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.RoomRepository;
import com.pkbg.eurekaclient.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    public PlayerRepository playerRepository;

    @Autowired
    public RoomService roomService;

    @Autowired
    public MyHandler myHandler;

    @RequestMapping("/roomtest/{roomnumber}/{hostname}/{playernumber}/{gamestatus}/{password}")
    @ResponseBody
    public String roomtest(@PathVariable("roomnumber") Integer roomnumber, @PathVariable("hostname") String hostname,
                           @PathVariable("playernumber")Integer playernumber,@PathVariable("gamestatus") Integer status,
                           @PathVariable("password") Integer password) {

        Room room = new Room();
        room.setGamestatus(status);
        room.setHostname(hostname);
        room.setPlayernumber(playernumber);
        room.setRoomnumber(roomnumber);
        room.setRoompassword(password);
        roomRepository.save(room);
        return "room ok";
    }


    @RequestMapping("/playertest/{playername}/{HP}/{playerstatus}/{longtitude}/{latitude}/{playerteam}/{weaponname}/{roomnumber}")
    @ResponseBody
    public String playertest(@PathVariable("playername") String playername, @PathVariable("HP") Integer HP,
                           @PathVariable("playerstatus")Integer playerstatus,@PathVariable("longtitude") double longtitude,
                           @PathVariable("latitude") double latitude, @PathVariable("playerteam") Integer playerteam,
                             @PathVariable("weaponname")String weaponname, @PathVariable("roomnumber") Integer roomnumber) {

        Player player=new Player();
        player.setHP(HP);
        player.setLatitude(latitude);
        player.setLongtitude(longtitude);
        player.setPlayername(playername);
        player.setPlayerstatus(playerstatus);
        player.setPlayerteam(playerteam);
        player.setWeaponname(weaponname);
        player.setRoomnumber(roomnumber);
        playerRepository.save(player);
        return "room ok";
    }

    @RequestMapping("/create")
    @ResponseBody
    public Map<String,Object> create(@RequestBody Map<String,Object> map) throws IOException
    {
        String username =map.get("username").toString();
       return roomService.create(username);
    }

    @RequestMapping("/join")
    @ResponseBody
    public Integer join(@RequestBody Map<String,Object> map) throws IOException
    {
        String username =map.get("username").toString();
        String room = map.get("roomID").toString();
        String pass = map.get("password").toString();
        Integer roomnumber = Integer.valueOf(room);
        Integer password = Integer.valueOf(pass);
        Integer Result2 = roomService.join(roomnumber,username,password);
        return Result2;
    }

    @RequestMapping("/queryAll")
    @ResponseBody
    public List<Player> queryAll()
    {
        return roomService.queryAll();
    }

    @RequestMapping("/query/{ID}/{roomnumber}")
    @ResponseBody
    public List<Player> query(@PathVariable("ID") String ID,@PathVariable("roomnumber") Integer roomnumber)
    {
        return roomService.query(ID,roomnumber);
    }

}
