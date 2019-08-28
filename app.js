//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
//const session=require("express-session");
/*引入路由模块*/
const tours=require("./routes/tours");
const artists=require("./routes/artists");
const venues=require("./routes/venues");
const cities=require("./routes/cities");
const styles=require("./routes/styles");
const user=require("./routes/user");
const orders=require("./routes/orders");
/*引入token的模块*/
const jwt=require("./jwt.js")


var app = express();
//新浪云要求只能监听5050
app.listen(5050);
//统一伪装跨域，之后不用再res.writeHead
app.use(cors({
  //origin:"http://badboy.applinzi.com",
  origin:"http://localhost:8080",
  credentials:true
}));
//托管静态资源到public目录下
app.use(express.static('public'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//配置session
/*app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));*/
//所有请求，先经过中间件函数
app.use((req, res, next)=>{ 
  //除了登录请求以外的所有跟用户和订单有关的请求，都需要先验证是否有正确的token
  if (req.url != '/user/signin' && (req.url.startsWith("/user") || req.url.startsWith("/orders"))) {
    //获得请求头中的token
    let token = req.headers.token;
    //将token字符串，转为对象
    let result = jwt.verifyToken(token);
    //如果没有token
    if(result===undefined){
      //则返回未登录
      res.send({status:401, msg:"未提供证书"})
    }else if (result.name == 'TokenExpiredError') {
      res.send({status: 402, msg: '登录超时，请重新登录'});
    } else if (result.name=="JsonWebTokenError"){
      res.send({status: 403, msg: '证书出错'})
    } else{
      req.user=result;
      next();
    }
  } else {
    next();
  }
});
/*使用路由器来管理路由*/
app.use("/tours",tours);
app.use("/artists",artists);
app.use("/venues",venues);
app.use("/cities",cities);
app.use("/styles",styles);
app.use("/user",user);
app.use("/orders",orders);


