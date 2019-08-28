const express=require("express");
const router=express.Router();
const pool=require("../pool");
const jwt=require("../jwt");

router.get("/islogin",(req,res)=>{
  var {remember}=req.query;
  if(req.user){
    res.send({code:1, uname: req.user.uname, remember, token:jwt.generateToken(req.user)})
  }else{
    res.send({code:-1, msg:"暂未登录"})
  }
})
router.post("/signin",(req,res)=>{
  var {uname,upwd,remember}=req.body;
  if(uname&&upwd){
    var sql="select uid,uname from users where (email=? or phone=?) and binary upwd=?";
    pool.query(sql,[uname,uname,upwd],(err,result)=>{
      if(err){
        console.log(err);
        res.send({code:-1, msg:"登录不成功！"})
      }else{
        if(result.length>0){
          console.log(remember);
          res.send({code:1, uname: result[0]["uname"], remember, token:jwt.generateToken(result[0])})
        }else{
          res.send({code:-1, msg:"用户名或密码不正确"})
        }
      }
    })
  }else{
    res.send({code:-1, msg:"未提供用户名或密码"})
  }
})
router.get("/profile",(req,res)=>{
  var user=req.user;
  var sql="select  uid,uname,email,phone,avatar,rname,gender,cid,city, const,blood from users inner join cities using(cid) where uid=?";
  pool.query(sql,[user.uid],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:-1})
    }else{
      res.send(result[0])
    }
  })
})
router.get("/favs",(req,res)=>{
  var user=req.user;
  var {pno,psize}=req.query;
  var sql="select DISTINCT cid,sid,vid,tid,count,price,time,endtime,vname,vpic,city,stitle,sphoto from tours inner join venues using(vid) inner join shows using(sid) inner join arshows using(sid) inner join artists using(aid) inner join cities using (cid) inner join wants using(tid) where uid=?  and time>=? ";
  var sql2=`select count(*) as count from (${sql}) as table1`;
  var params=[user.uid, new Date().getTime()];
  pool.query(sql2,params,(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)})
    }else{
      var count=result[0]["count"];
      sql+=" order by time ";
      sql+=" limit ?,?";
      pno=pno||0;
      psize=psize||20;
      params.push(pno*psize,psize);
      pool.query(sql,params,(err,result)=>{
        if(err){
          res.send({code:0, msg:String(err)})
        }else{
          var tasks=[];
          for(var r of result){
            tasks.push(new Promise((function(r){return (open)=>{
              pool.query("SELECT distinct(aname) FROM arshows inner join artists using(aid) where sid=?",[r["sid"]],(err,result)=>{
                if(err){
                  console.log(err);
                }else{
                  var as=[];
                  for(var re of result){
                    as.push(re["aname"])
                  }
                  r["artists"]=as.join("/");
                  open();
                }
              })
            }})(r)))
          }
          Promise.all(tasks).then(()=>{
            res.send({
              pno,
              psize,
              pcount:Math.ceil(count/psize),
              count,
              result
            })
          })
        }
      })
    }
  })
})
router.post("/addfav",(req,res)=>{
  var user=req.user;
  var {tid}=req.body;
  console.log(user);
  console.log(tid);
  var sql="insert into wants values(NULL,?,?)"
  pool.query(sql,[tid,user.uid],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:-1})
    }else{
      res.send({code:1})
    }
  })
})
router.post("/addfans",(req,res)=>{
  var user=req.user;
  var {aid}=req.body;
  pool.query("select * from fans where aid=? and uid=?",[aid,user.uid],(err,result)=>{
    if(err){
      console.log(err)
      res.send({code:-1})
    }else if(result.length>0){
      res.send({code:1})
    }else{
      var sql="insert into fans values(NULL,?,?)";
      pool.query(sql,[aid,user.uid],(err,result)=>{
        if(err){
          console.log(err);
          res.send({code:-1})
        }else{
          res.send({code:1})
        }
      })
    }
  })
  
})
module.exports=router;