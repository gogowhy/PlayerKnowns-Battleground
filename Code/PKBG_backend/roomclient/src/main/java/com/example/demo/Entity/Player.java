package com.example.demo.Entity;

import  javax.persistence.*;
import java.io.Serializable;



@Entity
@Table(name = "Playerinfo")
public class Player implements Serializable {

    @Column(name = "Playername")
    public String playername;

    @Column(name = "HP")
    public Integer HP;

    @Column(name="PlayerStatus")
    public Integer playerstatus;

    @Column(name="Location")
    public  GPS location;


    @Column(name = "Team")
    public Integer playerteam;

    @Column(name = "Weapon")
    public String weaponname;


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


    public GPS getLocation() {
        return location;
    }

    public void setLocation(GPS location) {
        this.location = location;
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
}