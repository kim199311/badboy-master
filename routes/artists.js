const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/hot",(req,res)=>{
  var sql=`SELECT aid, aname, aphoto, stname, (select count(*) from fans where fans.aid=artists.aid) as fcount, (select count(*) from tours inner join shows using(sid) inner join arshows using(sid) where aid=artists.aid and time>=(select UNIX_TIMESTAMP(NOW()) * 1000)) as tcount FROM artists inner join styles using(stid) order by tcount desc,fcount desc limit 8`;
  pool.query(sql,[],(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)})
    }else{
      res.send(result);
    }
  });
})
router.get("/list",(req,res)=>{
  var stid=req.query.stid;
  var kws=req.query.kws;
  var pno=req.query.pno;
  var psize=req.query.psize;
  var sql=`SELECT aid, aname, aphoto, stname, (select count(*) from fans where fans.aid=artists.aid) as fcount, (select count(*) from tours inner join shows using(sid) inner join arshows using(sid) where aid=artists.aid and time>=(select UNIX_TIMESTAMP(NOW()) * 1000)) as tcount FROM artists inner join styles using(stid) `;
  var params=[];
  if(stid!==undefined&&stid!=0){
    sql+=` where stid=? `;
    params=[stid];
  }
  if(kws!==undefined){
    kws=kws.split(/\s+/);
    var arr=[];
    for(var kw of kws){
      arr.push(` ( aname like '%${kw}%' || stname like '%${kw}%' ) `)
    }
    sql += (params.length==0?" where ":" and ")+arr.join(" and ");
  }
  sql+=" order by tcount desc,fcount desc ";
  var sql2=`select count(*) as count from (${sql}) as table1`;
  pool.query(sql2,params,(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)});
    }else{
      var count=result[0]["count"];
      sql+=" limit ?,?";
      pno=pno||0;
      psize=psize||20;
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
});
router.get("/byvenue",(req,res)=>{
  var vid=req.query.vid;
  if(vid!==undefined&&vid!=0){
    var sql=`SELECT aid,aname,aphoto, count(*) as tcount FROM tours inner join arshows using(sid) inner join artists using(aid) where vid=? and time>=unix_timestamp(now()) group by aid order by tcount desc, time `;
    var params=[vid];
    var sql2=`select count(*) as acount from (${sql}) as table2`;
    pool.query(sql2,params,(err,result)=>{
      if(err){
        res.send({code:0, msg:String(err)})
      }else{
        var count=result[0]["acount"];
        var pno=req.query.pno||0;
        var psize=req.query.psize||8;
        var output={
          pno,
          psize,
          count,
          pcount:Math.ceil(count/psize),
          result:[]
        };
        params=[vid,pno*psize,parseInt(psize)];
        sql+=` limit ?,? `;
        pool.query(sql,params,(err,result)=>{
          if(err){
            res.send({code:0, msg:String(err)})
          }else{
            output.result=result;
            res.send(output);
          }
        })
      }
    })
  }else{
    res.send({code:0, msg:"未提供"})
  }
})
router.get("/details",(req,res)=>{
  var aid=req.query.aid;
  if(aid!==undefined&&aid!=0){
    var output={};
    (async function(){
      await Promise.all([
        //任务1: 
        new Promise((resolve,reject)=>{
          var sql=`select * from art_pics where aid=?`
          var params=[aid];
          pool.query(sql,params,(err,result)=>{
            if(err){
              res.send({code:0,msg:String(err)})
            }else{
              output.art_pics=result;
              resolve();
            }
          })
        }),
        //任务二:
        new Promise((resolve,reject)=>{
          var sql=`SELECT vid,vname,vaddress,vphone,vpic,city,(select count(*) from tours where tours.vid=tours2.vid and time>=(select UNIX_TIMESTAMP(NOW()) * 1000)) as tcount FROM tours as tours2 inner join venues using(vid) inner join cities using(cid) inner join arshows using(sid) where aid=? and time>=(select UNIX_TIMESTAMP(NOW()) * 1000) group by vid order by tcount DESC limit 3`
          params=[aid];
          pool.query(sql,params,(err,result)=>{
            if(err){
              res.send({code:0,msg:String(err)})
            }else{
              output.recent_venues=result;
              resolve();
            }
          })
        }),
        //任务三: 
        new Promise((resolve,reject)=>{
          var sql="select distinct uid,uname,aid,avatar, (select count(*) from tickets inner join users using(uid) where tickets.uid=fans.uid) as tcount from fans inner join users using(uid) where aid=? order by tcount desc limit 8";
          pool.query(sql,[aid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.fans=result;
              resolve();
            }
          })
        }),
        //任务四: 
        new Promise((resolve,reject)=>{
          var sql=`SELECT *, (select count(*) from fans where fans.aid=artists.aid) as fcount FROM artists inner join styles using(stid) where aid=?`;
          pool.query(sql,[aid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.artist=result[0]
              resolve();
            }
          })
        })
      ])//.then(()=>{
      res.send(output);
    //})
    })()
  }else{
    res.send({code:0, msg:String()})
  }
})
module.exports=router;