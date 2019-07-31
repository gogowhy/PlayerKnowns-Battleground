package com.pkbg.eurekaclient.Dao;

import com.pkbg.eurekaclient.Entity.Player;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameDao {
    public String shoot(String playername,Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String start(String playername,Integer times, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String aim(String player, Double direction);
    public String updategps(String player, Double longitude, Double latitude);
    public List<Player> queryAll();
}
