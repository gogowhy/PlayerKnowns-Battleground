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

    @Column(name = "HostId")
    public Integer hostid;

    @Column(name="PlayerNumber")
    public Integer playernumber;

    @Column(name = "GameStatus")
    public Integer gamestatus;

    @Column(name = "PlayerList")
    public List<String>  playerlist;






}
