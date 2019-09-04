package com.pkbg.eurekaclient.Service;

import com.pkbg.eurekaclient.Entity.Name;
import com.pkbg.eurekaclient.Entity.Storage;
import com.pkbg.eurekaclient.Entity.User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Service
public interface UserService {
    public Integer register(User user);
    public Integer login(User user);
    public Integer resetPass(User user);

    public  Integer banUser(User user);
    public  Integer unbanUser(User user);

    public Integer buy(Storage storage);
    public Integer equip(Storage storage);

    public Map<String,Object> getstorage(Name name);
    public Map<String,Object> getmarket(Name name);

}