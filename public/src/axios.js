import axios from "axios";
import qs from "qs";
import store from './store'

//
const Axios=axios.create({
  baseURL:"http://localhost:5050/",
  //baseURL:"http://badboy.applinzi.com/",
  withCredentials:true
})
Axios.interceptors.request.use(
  config=>{
    console.log("进入请求拦截器...");
    //this.axios.get("url",{params:{uname:dingding,upwd:123456}})
    //this.axios.post("url",{uname:dingding,upwd:123456}}
    if(config.method==="post"){
      config.data=qs.stringify(config.data)
               // "uname=dingding&upwd=123456"
    }
    //自动为每个即将发出的请求，携带token字符串
    if(localStorage.getItem("token")){
      config.headers.token=localStorage.getItem("token");
    }
    if(sessionStorage.getItem("token")){
      config.headers.token=sessionStorage.getItem("token");
    }
    //必须加
    return config;
  },
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    if(res.data.status==402){
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIslogin",false);
      store.commit("setUname","");
    }else if(res.data.status==401){
      store.commit("setIslogin",false);
      store.commit("setUname","");
      //alert(res.data.msg+" 请先登录 !");
    }else if(res.data.token){
      store.commit("setUname",res.data.uname);
      store.commit("setIslogin",true);
      if(res.data.remember=="true"){
        localStorage.setItem("token",res.data.token);
      }else{
        sessionStorage.setItem("token",res.data.token);
      }
    }
    return res;
  },
  error=>{
    
  }
)
export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}