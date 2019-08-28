const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var user=req.user;
  var {status=100, pno=0, psize=4}=req.query;
  var sql="select cid,vid,tid,tkid,uid,tickets.time as ttime, tickets.count as tcount,status,sid,tours.count as totalCount,price,tours.time as starttime,endtime,vname,vphone,vaddress,vpic,city from tickets inner join tours using(tid) inner join venues using(vid) inner join cities using (cid) where uid=? ";
  if(status==100){
    var params=[user.uid];
  }else{
    var params=[user.uid,status,new Date().getTime()];
    sql+=` and status=? and tours.time>=?`;
  }
  var sql2=`select count(*) as count from (${sql}) as table1`
  pool.query(sql2,params,(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)})
    }else{
      var count=result[0]["count"];
      sql+=" order by ttime desc";
      sql+=" limit ?,?";
      params.push(pno*psize,psize);
      pool.query(sql,params,(err,result)=>{
        if(err){
          res.send({code:0, msg:String(err)})
        }else{
          res.send({
            pno,
            psize,
            pcount:Math.ceil(count/psize),
            count,
            result
          })
        }
      })
    }
  })
})
router.post("/addticket",(req,res)=>{
  var user=req.user;
  var {tid,count}=req.body;
  var sql="select * from tickets where uid=? and tid=? and status=0";
  pool.query(sql,[user.uid,parseInt(tid)],(err,result)=>{
    if(err){
      console.log(err);
      res.send({code:-1})
    }else{
      console.log(result.length);
      if(result.length>0){
        var now=new Date().getTime();
        var sql="update tickets set count=count+?, time=? where uid=? and tid=?";
        pool.query(sql,[parseInt(count),now,user.uid,parseInt(tid)],(err,result)=>{
          if(err){
            console.log(err);
            res.send({code:-1});
          }else{
            res.send({code:1});
          }
        });
      }else{
        var now=new Date().getTime();
        var sql="insert into tickets values (NULL,?,?,?,?,0)";
        pool.query(sql,[parseInt(tid),user.uid,now,parseInt(count)],(err,result)=>{
          if(err){
            console.log(err);
            res.send({code:-1});
          }else{
            res.send({code:1});
          }
        });
      }
    }
  })
})
router.post("/pay",(req,res)=>{
  var user=req.user;
  var tkid=req.body.tkid;
  if(tkid!==undefined){
    var sql1="select * from tickets where tkid=? and uid=?";
    var sql2="update tickets set status=1 where tkid=?";
    pool.query(sql1,[tkid,user.uid],(err,result)=>{
      if(err){
        console.log(err);
        res.send({code:-1})
      }else{
        if(result.length==1){
          pool.query(sql2,[tkid],(err,result)=>{
            if(err){
              console.log(err);
              res.send({code:-1});
            }else{
              res.send({code:1, msg:"支付成功!"})
            }
          })
        }else{
          res.send({code:-1, msg:"不是您的票，您无权支付"})
        }
      }
    })
  }else{
    res.send({code:-1,msg:"未提供票号"})
  }
})
module.exports=router;