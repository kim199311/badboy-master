const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/recent",(req,res)=>{
  var cid=req.query.cid;
  var sql="select tid,sid,vid, stitle, sphoto, city, vname, price, time from tours inner join venues using(vid) inner join shows using(sid) inner join cities using (cid) where time>=(select UNIX_TIMESTAMP(NOW()) * 1000) "
  var params=[];
  if(cid!==undefined&&cid!=0){
    sql+=" and cid=? ";
    params=[cid];
  }
  sql+=" order by time,tid limit 4 "
  pool.query(sql,params,(err,result)=>{
    if(err){
      res.send({
        code:0,
        msg:String(err)
      });
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
        res.send(result);
      })
    }
  })
})
router.get("/bymonth",(req,res)=>{
  var m=req.query.m;
  var y=req.query.y;
  var cid=req.query.cid;
  if(m!==undefined&&m>=1&&m<=12){
    y=y||new Date().getFullYear();
    var sql=`SELECT count(*) as count,from_unixtime(time/1000,"%d") as d FROM tours inner join venues using(vid) where from_unixtime(time/1000,"%Y")=? and from_unixtime(time/1000,"%m")=? `;
    var params=[parseInt(y),parseInt(m)];
    if(cid!==undefined&&cid!=0){
      sql+=` and cid=? `;
      params.push(parseInt(cid));
    }
    sql+=` group by d order by d `;
    pool.query(sql,params,(err,result)=>{
      if(err){
        res.send({code:0, msg:String(err)});
      }else{
        res.send(result);
      }
    })
  }else{
    res.send({code:0, msg:"未指定月份！"})
  }
});
router.get("/bymv",(req,res)=>{
  var vid=req.query.vid;
  var y=req.query.y;
  var m=req.query.m;
  if(m!==undefined&&m>=1&&m<=12){
    y=y||new Date().getFullYear();
    if(vid!==undefined&&vid!==0){
      var sql=`sELECT tours.*, stitle, sphoto, from_unixtime(time/1000,"%Y") as y, from_unixtime(time/1000,"%m") as m,  from_unixtime(time/1000,"%d") as d FROM tours inner join shows using(sid) where from_unixtime(time/1000,"%Y")=? and from_unixtime(time/1000,"%m")=? and vid=?  order by d `;
      var params=[parseInt(y),parseInt(m),parseInt(vid)];
      pool.query(sql,params,(err,result)=>{
        if(err){
          res.send({code:0, msg:String(err)});
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
                  r["artists"]=as.join(",");
                  open();
                }
              })
            }})(r)))
          }
          Promise.all(tasks).then(()=>{
            res.send(result);
          })
        }
      })
    }else{
      res.send({code:0, msg:"未指定现场编号！"})
    }
  }else{
    res.send({code:0, msg:"未指定月份！"})
  }
});
router.get("/hot",(req,res)=>{
  var cid=req.query.cid;
  var start=new Date().getTime();
  var end=start+7*24*3600*1000;
  getHot(res,start,end,cid);
});
function getHot(res,start, end, cid){
  var sql=`select cid,sid,vid,tid,count,price,time,endtime,vname,vpic,city,stitle,sphoto, (select count(*) from wants where wants.tid=tours.tid) as wants from tours inner join venues using(vid) inner join shows using(sid) inner join cities using (cid) where time>=? and time<=? `;
  var params=[start,end];
  if(cid!==undefined&cid!=0){
    sql+=` and cid=? `;
    params.push(cid);
  }
  sql+=` order by wants desc limit 4 `;
  pool.query(sql,params,(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)});
    }else{
      if(result.length==4){
        result.sort((a,b)=>a["time"]-b["time"])
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
          res.send(result);
        })
      }else{
        if(end-start<=12*7*24*3600*1000){
          arguments.callee(res,start, end+7*24*3600*1000,cid)
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
            res.send(result);
          })
        }
      }
    }
  })
}
router.get("/list",(req,res)=>{
  //cid vid stid starttime endtime
  var {cid,vid,stid,starttime,endtime,pno,psize}=req.query;
  var conds=[];
  var params=[];
  if(vid!==undefined&&vid!=0){
    conds.push(" vid=? ");
    params.push(vid);
  }else if(cid!==undefined&&cid!=0){
    conds.push(" cid=? ");
    params.push(cid);
  }
  
  if(stid!==undefined&&stid!=0){
    conds.push(" stid=? ");
    params.push(stid);
  }
  if(starttime!==undefined&&starttime!=0){
    conds.push(" time>=? ");
    params.push(starttime);
  }else{
    conds.push(" time>=? ");
    params.push(new Date().getTime());
  }
  if(endtime!==undefined&&endtime!=0){
    conds.push(" time<=? ");
    params.push(endtime);
  }
  var sql="select DISTINCT cid,sid,vid,tid,count,price,time,endtime,vname,vpic,city,stitle,sphoto from tours inner join venues using(vid) inner join shows using(sid) inner join arshows using(sid) inner join artists using(aid) inner join cities using (cid) ";
  var where=conds.length==0?"":` where ${conds.join(" and ")}`;
  sql+=where;
  var sql2=`select count(*) as count from (${sql}) as table1`
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
router.get("/kws",(req,res)=>{
  var kws=req.query.kws;
  var pno=req.query.pno;
  var psize=req.query.psize;
  if(kws!==""&&kws!==undefined){
    kws=kws.split(/\s+/);
    var arr=[];
    for(var kw of kws){
      arr.push(` ( stitle LIKE '%${kw}%' || aname like '%${kw}%' ) `);
    }
    var where=` where ${arr.join(" and ")} `;
    var sql=`select count(*) as count from tours inner join venues using(vid) inner join shows using(sid) inner join arshows using (sid) inner join artists using(aid) `;
    sql+=where;
    pool.query(sql,[],(err,result)=>{
      if(err){
        res.send({code:0, msg:String(err)})
      }else{
        var count=result[0]["count"];
        var sql=`select cid,sid,vid,tid,count,price,time,endtime,vname,vpic,city,stitle,sphoto from tours inner join venues using(vid) inner join shows using(sid) inner join arshows using (sid) inner join artists using(aid) inner join cities using(cid) `;
        sql+=where;
        sql+=" order by time ";
        sql+=" limit ?,?";
        pno=pno||0;
        psize=psize||10;
        var params=[];
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
  }else{
    res.send({code:0, msg:"没有关键词"})
  }
})
router.get("/details",(req,res)=>{
  var tid=req.query.tid;
  if(tid!==undefined&&tid!=0){
    var output={
      tour:{},
      wants:[],//想看的用户列表前4位
      wCount:0,//想看的用户总数
      artists:[],//艺人列表
      styles:[],//风格列表
      tours:[] //场次列表
    };
    (async function(){
      await Promise.all([
        new Promise(function(resolve){
          //查询想看的人的列表
          var sql=`SELECT uid,wid,tid,uname,avatar,rname,(select count(*) from tickets where tickets.uid=wants.uid) as tcount FROM wants inner join users using(uid) where tid=? order by tcount desc limit 4`;
          pool.query(sql,[tid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.wants=result;
              resolve();
            }
          })
        }),
        new Promise(function(resolve){
          //再查询想看的用户总数
          var sql=`SELECT count(*) as count FROM wants where tid=? `;
          pool.query(sql,[tid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.wCount=result[0]["count"];
              resolve();
            }
          })
        }),
        new Promise(function(resolve){
          var sql="select * from tours inner join venues using(vid) inner join cities using(cid) inner join shows using(sid) where tid=?";
          //先查询想看的用户列表前4位的
          pool.query(sql,[tid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.tour=result[0];
              resolve();
            }
          })
        })
      ]);
      await Promise.all([
        new Promise(function(resolve){
          //再查询场次列表
          var sql="select * from tours inner join venues using(vid) inner join cities using (cid) where sid=? order by time"
          pool.query(sql,[output.tour.sid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.tours=result;
              resolve();
            }
          })
        }),
        new Promise(function(resolve){
          //再查询风格列表
          var sql="SELECT DISTINCT(stname) as stname FROM arshows inner join artists using(aid) inner join styles using(stid) where sid=?";
          pool.query(sql,[output.tour.sid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.styles=result;
              resolve();
            }
          })
        }),
        new Promise(function(resolve){
          //再查询艺人列表
          var start=new Date().getTime();
          var sql=`SELECT distinct aid,aname,aphoto, (select count(*) from tours inner join shows using(sid) inner join arshows using(sid) where time>=${start} and arshows.aid=arshows2.aid) as tcount FROM arshows as arshows2 inner join artists using(aid) where sid=? order by tcount desc`;
          pool.query(sql,[output.tour.sid],(err,result)=>{
            if(err){
              res.send({code:0, msg:String(err)})
            }else{
              output.artists=result;
              resolve();
            }
          })
        })
      ]);
      res.send(output);
    })();
  }else{
    res.send({code:0, msg:"未提供场次编号"})
  }
})
router.get("/byartist",(req,res)=>{
  var aid=req.query.aid;
  var pno=req.query.pno||0;
  var psize=req.query.psize||8;
  if(aid!==undefined&&aid!=0){
    var sql=`SELECT cid,sid,vid,tid,count,price,time,endtime,vname,vpic,city,stitle,sphoto FROM tours inner join shows using(sid) inner join venues using(vid) inner join cities using(cid) inner join arshows using(sid) inner join artists using(aid) where aid=? order by time`;
    var sql2=`select count(*) as tcount from (${sql}) as table2`;
    var params=[aid];
    pool.query(sql2,params,(err,result)=>{
      if(err){
        res.send({code:0,msg:String(err)})
      }else{
        var count=result[0]["tcount"];
        sql+=` limit ?,?`
        params=[aid,psize*pno,parseInt(psize)];
        pool.query(sql,params,(err,result)=>{
          if(err){
            res.send({code:0,msg:String(err)})
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
  }else{
    res.send({code:0, msg:"未提供音乐人编号"})
  }
})
module.exports=router;