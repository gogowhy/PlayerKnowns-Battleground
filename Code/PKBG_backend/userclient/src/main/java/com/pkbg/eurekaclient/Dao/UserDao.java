package com.pkbg.eurekaclient.Dao;

import com.pkbg.eurekaclient.Entity.Name;
import com.pkbg.eurekaclient.Entity.Storage;
import com.pkbg.eurekaclient.Entity.User;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Repository
public interface UserDao {
    public Integer register(User user);
    public Integer login(User user);
    public Integer resetPass(User user);
    public Integer banUser(User user);
    public Integer unbanUser(User user);
    public Integer buy(Storage storage);
    public Integer equip(Storage storage);
    public Map<String,Object> getstorage(Name name);
    public Map<String,Object> getmarket(Name name);
    public String mailReset(String name);
}