package com.example.demo.Entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="roominfo")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public  Integer roomid;

    @Column(name = "RoomNumber")
   public Integer roomnumber;

    @Column(name = "HostName")
    public String hostname;

    @Column(name="PlayerNumber")
    public Integer playernumber;

    @Column(name = "GameStatus")
    public Integer gamestatus;

    @Column(name = "PlayerList")
    public List<String>  playerlist;


    @Column(name = "RoomPassword")
    public Integer roompassword;

    public Integer getRoomid() {
        return roomid;
    }

    public void setRoomid(Integer roomid) {
        this.roomid = roomid;
    }

    public Integer getRoomnumber() {
        return roomnumber;
    }

    public void setRoomnumber(Integer roomnumber) {
        this.roomnumber = roomnumber;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public Integer getPlayernumber() {
        return playernumber;
    }

    public void setPlayernumber(Integer playernumber) {
        this.playernumber = playernumber;
    }

    public Integer getGamestatus() {
        return gamestatus;
    }

    public void setGamestatus(Integer gamestatus) {
        this.gamestatus = gamestatus;
    }

    public List<String> getPlayerlist() {
        return playerlist;
    }

    public void setPlayerlist(List<String> playerlist) {
        this.playerlist = playerlist;
    }

    public Integer getRoompassword() {
        return roompassword;
    }

    public void setRoompassword(Integer roompassword) {
        this.roompassword = roompassword;
    }
}
