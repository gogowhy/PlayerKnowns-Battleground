package com.pkbg.eurekaclient.ServiceImpl;

import com.pkbg.eurekaclient.Dao.GameDao;
import com.pkbg.eurekaclient.DaoImpl.GameDaoImpl;
import com.pkbg.eurekaclient.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    public GameDao gameDao;

    @Override
    public String shoot(String player, Double longitude, Double latitude)
    {
        return gameDao.shoot(player,longitude,latitude);
    }

    @Override
    public String start(Integer roomnumber)
    {
        return gameDao.start(roomnumber);
    }

    @Override
    public String aim(String player, Double direction)
    {
        return gameDao.aim(player,direction);
    }

    @Override
    public String updategps(String player, Double longitude, Double latitude)
    {
        return gameDao.updategps(player,longitude,latitude);
    }
}
