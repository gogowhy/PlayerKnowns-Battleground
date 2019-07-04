package com.example.demo.Entity;

import  javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="userinfo")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer userid;


    @Column(name = "username")
    public String username;

    @Column(name="userpassword")
    public String userpassword;


    @Column(name = "useremail")
    public String useremail;

    @Column(name = "usertele")
    public String usertele;

    @Column(name = "state")
    public Integer state;

    @Column(name = "coins")
    public Integer coins;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

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