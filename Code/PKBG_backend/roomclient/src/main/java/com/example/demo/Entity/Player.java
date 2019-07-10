package com.example.demo.Entity;

import  javax.persistence.*;
import java.io.Serializable;



@Entity
@Table(name = "Playerinfo")
public class Player implements Serializable {

    @Id
    @Column(name = "Playername")
    public String playername;

    @Column(name = "HP")
    public Integer HP;

    @Column(name="PlayerStatus")
    public Integer playerstatus;

    @Column(name="Longtitude")
    public double longtitude;


    @Column(name="Latitude")
    public double latitude;

    @Column(name = "Team")
    public Integer playerteam;

    @Column(name = "Weapon")
    public String weaponname;

    @Column(name="roomnumber")
    public Integer roomnumber;

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

    public double getLongtitude() {
        return longtitude;
    }

    public void setLongtitude(double longtitude) {
        this.longtitude = longtitude;
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
        return "Player [Playername=" + playername + ", HP=" + HP + ", PlayerStatus=" + playerstatus + ", Longtitude=" + longtitude + ", Latitude=" + latitude + ", Team=" + playerteam + ", Weapon=" + weaponname + ", roomnumber=" + roomnumber + "]";
    }

    public String toJSON(Integer code) {
        return "Player [code=" + code + ", Playername=" +playername + "]";
    }

    public String toJSON2(Integer code, String hostname) {
        return "Player [code=" + code + ", Playername=" +playername + ", hostname=" + hostname + "]";
    }
}