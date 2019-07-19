package com.pkbg.eurekaclient.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "player")
public class Player implements Serializable {

    public String playername;

    public Integer HP;

    public Integer playerstatus;

    public double longitude;

    public double latitude;

    public Integer playerteam;

    public String weaponname;

    public Integer roomnumber;

    public double direction;

    public double getDirection() {
        return direction;
    }

    public void setDirection(double direction) {
        this.direction = direction;
    }

    public String getPlayername() {
        return playername;
    }

    public void setPlayername(String playername) {
        this.playername = playername;
    }

    public Integer getHP() {
        return HP;
    }

    public void setHP(Integer HP) {
        this.HP = HP;
    }

    public Integer getPlayerstatus() {
        return playerstatus;
    }

    public void setPlayerstatus(Integer playerstatus) {
        this.playerstatus = playerstatus;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongtitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public Integer getPlayerteam() {
        return playerteam;
    }

    public void setPlayerteam(Integer playerteam) {
        this.playerteam = playerteam;
    }

    public String getWeaponname() {
        return weaponname;
    }

    public void setWeaponname(String weaponname) {
        this.weaponname = weaponname;
    }

    public Integer getRoomnumber() {
        return roomnumber;
    }

    public void setRoomnumber(Integer roomnumber) {
        this.roomnumber = roomnumber;
    }

    @Override
    public String toString() {
        return "Player [Playername=" + playername + ", HP=" + HP + ", PlayerStatus=" + playerstatus + ", Longtitude=" + longitude + ", Latitude=" + latitude + ", Team=" + playerteam + ", Weapon=" + weaponname + ", roomnumber=" + roomnumber + "]";
    }

    public String toJSON(Integer code) {
        return "Player [code=" + code + ", Playername=" + playername + "]";
    }

    public String toJSON2(Integer code, String hostname) {
        return "Player [code=" + code + ", Playername=" + playername + ", hostname=" + hostname + "]";
    }


}