package com.pkbg.eurekaclient.Dao;

import org.springframework.stereotype.Repository;

@Repository
public interface GameDao {
    public String shoot(String playername,Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String start(String playername,Integer times, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String aim(String player, Double direction);
    public String updategps(String player, Double longitude, Double latitude);
}
