package com.example.demo.Repository;


import com.example.demo.Entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlayerRepository extends JpaRepository<Player,Integer> {
    public List<Player> findByRoomnumber(Integer roomnumber);
    public Player findByPlayername(String playername);
}
