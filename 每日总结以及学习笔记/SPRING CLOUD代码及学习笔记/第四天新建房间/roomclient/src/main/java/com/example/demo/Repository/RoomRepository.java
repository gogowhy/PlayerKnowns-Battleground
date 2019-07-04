package com.example.demo.Repository;

import com.example.demo.Entity.Room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface RoomRepository extends JpaRepository<Room,Integer> {
    public Room findByRoomid(Integer id);
    public Room findByRoomnumber(Integer number);
}
