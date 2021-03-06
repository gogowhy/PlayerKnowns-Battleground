package com.pkbg.eurekaclient.ServiceImpl;

import com.pkbg.eurekaclient.Dao.GameDao;
import com.pkbg.eurekaclient.Entity.Player;
import com.pkbg.eurekaclient.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    public GameDao gameDao;

    @Override
    public String shoot(String playername, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb)
    {
        return gameDao.shoot(playername,male,upperr,upperg,upperb,lowerr,lowerg,lowerb);
    }

    @Override
    public String start(String playername,String target,Integer times, Double male,Integer upperr,Integer upperg,Integer upperb,Integer lowerr,Integer lowerg,Integer lowerb)
    {
        return gameDao.start(playername,target,times,male,upperr,upperg,upperb,lowerr,lowerg,lowerb);
    }

    @Override
    public String aim(String player, Double direction)
    {
        return gameDao.aim(player,direction);
    }

    @Override
    public List<Player> queryAll()
    {
        return gameDao.queryAll();
    }

    @Override
    public String updategps(String player, Double longitude, Double latitude)
    {
        return gameDao.updategps(player,longitude,latitude);
    }
}
