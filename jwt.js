// 引入模块依赖
const fs = require('fs');
const path = require('path');
//先安装npm i -save jsonwebtoken
const jwt = require('jsonwebtoken');

//生成token
function generateToken(data){
    //获得当前时间换算成秒
    let created = Math.floor(Date.now() / 1000);
    //从硬盘读取私钥内容，用于加密算法之用
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_private_key.pem'));//调用jwt模块的sign()函数，将传入的data对象转为token字符串
    let token = jwt.sign({
        data,
        //提供过期时间：从当前时间开始，向后+多少秒数
        exp: created + 60 * 60, //token只能使用1小时
    }, cert, {algorithm: 'RS256'});
    //还必读提供私钥和加密算法。

    //返回生成的token字符串
    return token;
}

// 校验token： 就是将token字符串转为原来的对象
function verifyToken(token) {
    //从硬盘读取公钥内容
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_public_key.pem'));//公钥 可以自己生成
    let res;
    try {
        //如果提供了token字符串
        if(token!==undefined){
            //才调用jwt模块的verify函数，用公钥，解密并转换token字符串为原对象。
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            res = result.data || {};
            //如果token过期，verify会自动返回一个错误对象，说token过期
            //如果token格式不正确，verify会自动返回一个错误对象，说token不正确
        }
    } catch (e) {
        //如果转换出错，就返回错误信息。
        res = e;
    }
    return res;
}
// var token=generateToken({uid:1, uname:"dingding"});
// console.log(token);
// var ding=verifyToken(token);
// console.log(ding);
module.exports = { generateToken, verifyToken };