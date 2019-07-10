package com.example.demo.DaoImpl;

import org.junit.Assert;
import org.junit.Test;
import org.junit.Before; 
import org.junit.After; 

/** 
* RoomDaoImpl Tester. 
* 
* @author <Authors name> 
* @since <pre>七月 9, 2019</pre> 
* @version 1.0 
*/ 
public class RoomDaoImplTest { 

@Before
public void before() throws Exception { 
} 

@After
public void after() throws Exception { 
}

/*
Test Data
①
roomnumber:1234
host:user1
player:user2,user4,user7
user1&user4&user7:Ready
gamestatus:0
password:5678

②
roomnumber:3456
host:user5
gamestatus:1
password:5678

③
roomnumber:6789
host:user6
player:user8-user22
playernumber:16
password:5678
user6,user8-user14:TeamA
user15-user22:TeamB
All user:Not Ready

④
roomnumber:1111
host:user23
 */

/** 
* 
* Method: create(String hostname) 
* 
*/ 
@Test
public void testCreate() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.create("user100");
    Assert.assertEquals("Judge Wrong", "Success!", result);
} 

/** 
* 
* Method: dismiss(String if_hostname) 
* 
*/ 
@Test
public void testDismiss() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.dismiss("user23");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.dismiss("user2");
    Assert.assertEquals("Judge Wrong", "Not Host!", result);
} 

/** 
* 
* Method: kick(Integer roomnumber, String username) 
* 
*/ 
@Test
public void testKick() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.kick("user1",1234,"user2");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.kick("user1",3456,"user2");
    Assert.assertEquals("Judge Wrong", "Not In This Room!", result);
    result = roomDaoImpl.kick("user4",1234,"user1");
    Assert.assertEquals("Judge Wrong", "Not Host!", result);
    result = roomDaoImpl.kick("user1",1234,"user3");
    Assert.assertEquals("Judge Wrong", "No Such Player In Room!", result);
} 

/** 
* 
* Method: join(Integer roomnumber, String username, Integer password) 
* 
*/ 
@Test
public void testJoin() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.join(1234,"user3",5678);
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.join(9999,"user3",5678);
    Assert.assertEquals("Judge Wrong", "Cannot Find Target Room!", result);
    result = roomDaoImpl.join(1234,"user3",6544);
    Assert.assertEquals("Judge Wrong", "Wrong Password!", result);
    result = roomDaoImpl.join(3456,"user3",5678);
    Assert.assertEquals("Judge Wrong", "Target Room Has Started Game!", result);
    result = roomDaoImpl.join(3456,"user3",5678);
    Assert.assertEquals("Judge Wrong", "Target Room Is Full!", result);

} 

/** 
* 
* Method: quit(String username) 
* 
*/ 
@Test
public void testQuit() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.quit("user7");
    Assert.assertEquals("Judge Wrong", "Success!", result);
} 

/** 
* 
* Method: hostquit(String username) 
* 
*/ 
@Test
public void testHostquit() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.hostquit("user6");
    Assert.assertEquals("Judge Wrong", "Success!", result);
} 

/** 
* 
* Method: changeToA(String username) 
* 
*/ 
@Test
public void testChangeToA() throws Exception {

    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.changeToA("user15");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.changeToA("user15");
    Assert.assertEquals("Judge Wrong", "Already In Team A!", result);
    result = roomDaoImpl.changeToA("user16");
    Assert.assertEquals("Judge Wrong", "Team A Is Full!", result);
} 

/** 
* 
* Method: changeToB(String username) 
* 
*/ 
@Test
public void testChangeToB() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.changeToB("user15");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.changeToB("user15");
    Assert.assertEquals("Judge Wrong", "Already In Team B!", result);
    result = roomDaoImpl.changeToB("user16");
    Assert.assertEquals("Judge Wrong", "Team B Is Full!", result);
} 

/** 
* 
* Method: ready(String username) 
* 
*/ 
@Test
public void testReady() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.ready("user15");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.ready("user15");
    Assert.assertEquals("Judge Wrong", "Already Ready!", result);
} 

/** 
* 
* Method: cancel(String username) 
* 
*/ 
@Test
public void testCancel() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.cancel("user15");
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.cancel("user15");
    Assert.assertEquals("Judge Wrong", "Already Canceled!", result);
} 

/** 
* 
* Method: start(Integer roomnumber) 
* 
*/ 
@Test
public void testStart() throws Exception {
    RoomDaoImpl roomDaoImpl = new RoomDaoImpl();
    String result = roomDaoImpl.start(1234);
    Assert.assertEquals("Judge Wrong", "Success!", result);
    result = roomDaoImpl.start(1234);
    Assert.assertEquals("Judge Wrong", "Already Started!", result);
    result = roomDaoImpl.start(6789);
    Assert.assertEquals("Judge Wrong", "Not All Ready!", result);
} 


} 
