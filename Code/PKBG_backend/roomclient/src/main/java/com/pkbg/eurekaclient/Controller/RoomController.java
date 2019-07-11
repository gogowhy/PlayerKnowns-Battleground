package com.pkbg.eurekaclient.Controller;

import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Entity.Room;
import com.pkbg.eurekaclient.Repository.PlayerRepository;
import com.pkbg.eurekaclient.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    PlayerRepository playerRepository;

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



}
