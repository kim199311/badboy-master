//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  /*host: 'w.rdc.sae.sina.com.cn',
  port:3306,
  user: '2z052kk414',
  password: 'jkmyjzm2mm0ilj0yj50hwmz40i0h5xjxy4j31lz4',
  database: 'app_badboy',*/

  host:"127.0.0.1",
  port:3306,
  user:"root",
  password:"",
  database:"badboy",
  
  connectionLimit: 10 
});
//把创建好的连接池导出
module.exports = pool;




