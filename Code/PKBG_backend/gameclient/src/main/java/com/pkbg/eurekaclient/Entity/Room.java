package com.pkbg.eurekaclient.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "room")
public class Room {

    public Integer roomnumber;

    public String hostname;

    public Integer playernumber;

    public Integer gamestatus;

    public Integer roompassword;

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

    public Integer getRoompassword() {
        return roompassword;
    }

    public void setRoompassword(Integer roompassword) {
        this.roompassword = roompassword;
    }
}
