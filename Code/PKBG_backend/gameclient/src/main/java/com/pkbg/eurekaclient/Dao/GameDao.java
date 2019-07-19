package com.pkbg.eurekaclient.Dao;

import org.springframework.stereotype.Repository;

@Repository
public interface GameDao {
    public String shoot(String player, Double longitude, Double latitude);
    public String start(Integer roonmunber);
    public String aim(String player, Double direction);
    public String updategps(String player, Double longitude, Double latitude);
}
