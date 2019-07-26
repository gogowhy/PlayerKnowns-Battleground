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

    public Double male;

    public Integer upperr;

    public Integer upperg;

    public Integer upperb;

    public Integer lowerr;

    public Integer lowerg;

    public Integer lowerb;

    public Integer times;

    public Integer kill;

    public Integer getKill() {
        return kill;
    }

    public void setKill(Integer kill) {
        this.kill = kill;
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

    public Double getMale() {
        return male;
    }

    public void setMale(Double male) {
        this.male = male;
    }

    public Integer getUpperr() {
        return upperr;
    }

    public void setUpperr(Integer upperr) {
        this.upperr = upperr;
    }

    public Integer getUpperg() {
        return upperg;
    }

    public void setUpperg(Integer upperg) {
        this.upperg = upperg;
    }

    public Integer getUpperb() {
        return upperb;
    }

    public void setUpperb(Integer upperb) {
        this.upperb = upperb;
    }

    public Integer getLowerr() {
        return lowerr;
    }

    public void setLowerr(Integer lowerr) {
        this.lowerr = lowerr;
    }

    public Integer getLowerg() {
        return lowerg;
    }

    public void setLowerg(Integer lowerg) {
        this.lowerg = lowerg;
    }

    public Integer getLowerb() {
        return lowerb;
    }

    public void setLowerb(Integer lowerb) {
        this.lowerb = lowerb;
    }

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