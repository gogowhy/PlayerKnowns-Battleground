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

    public Integer upperr1;

    public Integer upperg1;

    public Integer upperb1;

    public Integer lowerr1;

    public Integer lowerg1;

    public Integer lowerb1;

    public Integer upperr2;

    public Integer upperg2;

    public Integer upperb2;

    public Integer lowerr2;

    public Integer lowerg2;

    public Integer lowerb2;

    public Integer upperr3;

    public Integer upperg3;

    public Integer upperb3;

    public Integer lowerr3;

    public Integer lowerg3;

    public Integer lowerb3;

    public Double sigmaur;

    public Double sigmaug;

    public Double sigmaub;

    public Double sigmalr;

    public Double sigmalg;

    public Double sigmalb;

    public Integer times;

    public Integer kill;

    public Integer getUpperr1() {
        return upperr1;
    }

    public void setUpperr1(Integer upperr1) {
        this.upperr1 = upperr1;
    }

    public Integer getUpperg1() {
        return upperg1;
    }

    public void setUpperg1(Integer upperg1) {
        this.upperg1 = upperg1;
    }

    public Integer getUpperb1() {
        return upperb1;
    }

    public void setUpperb1(Integer upperb1) {
        this.upperb1 = upperb1;
    }

    public Integer getLowerr1() {
        return lowerr1;
    }

    public void setLowerr1(Integer lowerr1) {
        this.lowerr1 = lowerr1;
    }

    public Integer getLowerg1() {
        return lowerg1;
    }

    public void setLowerg1(Integer lowerg1) {
        this.lowerg1 = lowerg1;
    }

    public Integer getLowerb1() {
        return lowerb1;
    }

    public void setLowerb1(Integer lowerb1) {
        this.lowerb1 = lowerb1;
    }

    public Integer getUpperr2() {
        return upperr2;
    }

    public void setUpperr2(Integer upperr2) {
        this.upperr2 = upperr2;
    }

    public Integer getUpperg2() {
        return upperg2;
    }

    public void setUpperg2(Integer upperg2) {
        this.upperg2 = upperg2;
    }

    public Integer getUpperb2() {
        return upperb2;
    }

    public void setUpperb2(Integer upperb2) {
        this.upperb2 = upperb2;
    }

    public Integer getLowerr2() {
        return lowerr2;
    }

    public void setLowerr2(Integer lowerr2) {
        this.lowerr2 = lowerr2;
    }

    public Integer getLowerg2() {
        return lowerg2;
    }

    public void setLowerg2(Integer lowerg2) {
        this.lowerg2 = lowerg2;
    }

    public Integer getLowerb2() {
        return lowerb2;
    }

    public void setLowerb2(Integer lowerb2) {
        this.lowerb2 = lowerb2;
    }

    public Integer getUpperr3() {
        return upperr3;
    }

    public void setUpperr3(Integer upperr3) {
        this.upperr3 = upperr3;
    }

    public Integer getUpperg3() {
        return upperg3;
    }

    public void setUpperg3(Integer upperg3) {
        this.upperg3 = upperg3;
    }

    public Integer getUpperb3() {
        return upperb3;
    }

    public void setUpperb3(Integer upperb3) {
        this.upperb3 = upperb3;
    }

    public Integer getLowerr3() {
        return lowerr3;
    }

    public void setLowerr3(Integer lowerr3) {
        this.lowerr3 = lowerr3;
    }

    public Integer getLowerg3() {
        return lowerg3;
    }

    public void setLowerg3(Integer lowerg3) {
        this.lowerg3 = lowerg3;
    }

    public Integer getLowerb3() {
        return lowerb3;
    }

    public void setLowerb3(Integer lowerb3) {
        this.lowerb3 = lowerb3;
    }


    public Double getSigmaur() {
        return sigmaur;
    }

    public void setSigmaur(Double sigmaur) {
        this.sigmaur = sigmaur;
    }

    public Double getSigmaug() {
        return sigmaug;
    }

    public void setSigmaug(Double sigmaug) {
        this.sigmaug = sigmaug;
    }

    public Double getSigmaub() {
        return sigmaub;
    }

    public void setSigmaub(Double sigmaub) {
        this.sigmaub = sigmaub;
    }

    public Double getSigmalr() {
        return sigmalr;
    }

    public void setSigmalr(Double sigmalr) {
        this.sigmalr = sigmalr;
    }

    public Double getSigmalg() {
        return sigmalg;
    }

    public void setSigmalg(Double sigmalg) {
        this.sigmalg = sigmalg;
    }

    public Double getSigmalb() {
        return sigmalb;
    }

    public void setSigmalb(Double sigmalb) {
        this.sigmalb = sigmalb;
    }

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