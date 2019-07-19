package com.pkbg.eurekaclient.Service;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public interface GameService {
    public String shoot(String player, Double longitude, Double latitude);
    public String start(Integer roomnumber);
    public String aim(String player, Double direction);
    public String updategps(String player, Double longitude, Double latitude);
}
