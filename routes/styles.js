const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var sql="select * from styles";
  pool.query(sql,[],(err,result)=>{
    if(err){
      res.send({code:0, msg:String(err)})
    }else{
      res.send(result);
    }
  })
})

module.exports=router;