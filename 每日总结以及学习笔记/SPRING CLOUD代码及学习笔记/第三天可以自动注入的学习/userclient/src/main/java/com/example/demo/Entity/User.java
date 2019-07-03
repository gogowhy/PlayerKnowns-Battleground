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
    private String username;

    @Column(name = "useremail")
    private String useremail;

    @Column(name = "usertele")
    private String usertele;

    @Column(name = "isbanned")
    private Integer isbanned;

    @Column(name = "coins")
    private Integer coins;

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

    public Integer getIsbanned() {
        return isbanned;
    }

    public void setIsbanned(Integer isbanned) {
        this.isbanned = isbanned;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }
}