package com.pkbg.eurekaclient.Entity;

import java.io.Serializable;

public class User implements Serializable {

    public String username;

    public String userpassword;

    public String useremail;

    public String usertele;

    public Integer state;

    public Integer coins;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }

    public String getUsertele() {
        return usertele;
    }

    public void setUsertele(String usertele) {
        this.usertele = usertele;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }

    public String getUserpassword() {
        return userpassword;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }
}