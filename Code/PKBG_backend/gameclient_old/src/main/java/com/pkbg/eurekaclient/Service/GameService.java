package com.pkbg.eurekaclient.Service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public interface GameService {
    public String shoot(String playername, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String start(String playername,Integer times, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb);
    public String aim(String player, Double direction);
    public String updategps(String player, Double longitude, Double latitude);
}
