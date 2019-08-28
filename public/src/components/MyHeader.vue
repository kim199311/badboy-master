<template>
  <header >
    <div id="header1">
      <!--右侧logo-->
      <div class="logo">
        <router-link to="/">
          <img src="/images/index/logo.png" alt="badboy" title="badboy">
        </router-link>
      </div>
      <!--城市切换-->
      <div class="city">
        <div class="city-title">
          {{city}}
        </div>
        <div class="city-select">
            <a href="javascript:;" class="size cityActive" @click="cityChange($event)" id="cityButton">
              <i></i>切换城市
              </a>
            <div class="cityList" v-show="cityShow" id="cityBox">
              <a href="javascript:;" @click="citySelect(0,0)">全国</a>
              <a href="javascript:;" v-for="(t,i) of cities" :key="i" @click="citySelect(t.city,t.cid)">{{t.city}} </a>
            </div>
        </div>
      </div>
      <div class="list">
        <ul>
          <li>
            <!--<a href="live.html">演出</a>-->
            <router-link to="/lives">演出</router-link>
          </li>
          <li>
            <router-link to="/venues">音乐现场</router-link>
          </li>
          <li>
            <router-link to="/artists">音乐人</router-link>
          </li>
          <li><a href="">音乐人服务</a></li>
          <li><a href="">音乐周边</a></li>
        </ul>
      </div>
      <div class="user"><!--右边登录 注册 搜索-->
        <ul>
          <li v-show="!islogin">
            <a href="javascript:;" @click="open()">登录</a>
          </li>
          <li v-show="!islogin">
            <a href="javascript:;">注册</a>
          </li>
          <li v-show="islogin">
            <router-link to="/user/profile">Welcome {{uname}}</router-link>
          </li>
          <li v-show="islogin">
            <a href="javascript:;" @click="signout">注销</a>
          </li>
          <li>
            <input type="text" placeholder="搜索演出" @keyup.13="gosearch()" v-model="searchKws">
          </li>
          <li>
            <a href="javascript:;" @click="gosearch()">
                <img src="images/index/search.png" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="login" v-show="show">
      <div class="loginBox">
        <div class="loginForm">
          <div class="loginTitle">登录badboy</div>
          <form class="tableForm">
            <table cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr>
                  <td>
                    <input type="text" name="uname" id="uname" required="true" placeholder="请输入手机号或邮箱" v-model="txtUname" class="inputStyle error">
                    <label for="uname" class="labelError">请输入手机号</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="password" name="upwd" v-model="txtUpwd" class="inputStyle error" id="upwd" required="true" placeholder="请输入密码" autocomplete="off">
                    <label for="upwd" generated="true" class="labelError">请输入密码！</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label class="rememberLabel">
                      <input type="checkbox" name="remember" v-model="remember">下次自动登录
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type="button" class="loginBtn" id="loginBtn" @click="login">登 录</button>
                  </td>
                </tr>
                <tr>
                  <td class="forget">
                    <a href="" class="forgetUpwd">忘记密码？</a>
                    <span class="rememberLabel">
                      还没有badboy账号<a href="">点击注册</a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div class="otherLogin">
            <a href="" class="qq"></a>
            <a href="" class="sina"></a>
            <a href="" class="wechat"></a>
            <a href="" class="douban"></a>
          </div>
        </div>
      </div>
      <a href="javacript:;" class="close" @click="close()"></a>
    </div>
  </header>
</template>
<script>
import store from "../store";
export default {
  data(){
    return {
      show:false,
      cities:{},
      cityShow:false,
      city:"全国",
      cid:0,
      searchKws:"",
      txtUname:"dong@qq.com",
      txtUpwd:"123456ab",
      remember:false
    }
  },
  methods:{
    signout(){
      store.commit("setIslogin",false);
      this.remember=false;
      store.commit("setUname","");
      this.txtUpwd="";
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    open(){
      this.show=true;
    },
    close(){
      this.show=false;
    },
    login(){
      //console.log(this.$route.path);
      this.axios.post(
        "user/signin",
        {uname:this.txtUname, upwd:this.txtUpwd, remember:this.remember}
      ).then(res=>{
        //this.txtUname="";
        this.txtUpwd="";
        if(res.data.code==-1){
          alert(res.data.msg);
        }else{
          this.show=false;
        }
      })
    },
    //搜索演出
    gosearch(){
      this.$router.push(`/lives/${this.searchKws}`)
    },
    // 切换城市事件
    cityChange(e){
      var cityButton=document.getElementById("cityButton");
      var cityBox=document.getElementById("cityBox");
      //console.log(cityBox);
      if(this.cityShow){
        this.cityShow=false;
      }else{
        this.cityShow=true;
      }
    },
    // 城市选择事件
    citySelect(a,b){
      if(a==0){
        this.city="全国";
        sessionStorage.setItem("city",this.city)
        this.cid=b;
        // this.$store.getters.cidd=b;
        this.$store.commit('cityAlert',this.cid);
      }else{
        this.city=a;
        sessionStorage.setItem("city",this.city);
        this.cid=b;
        this.$store.commit('cityAlert',this.cid);
      }
    },
    closeTab(e){
      
    }
  },
  computed:{
    uname(){
      return this.$store.state.uname
    },
    islogin(){
      return this.$store.state.islogin
    }
  },
  watch:{
  },
  created(){
    var token = localStorage.getItem("token");
    if(token){
      this.remember=true;
    }else{
      this.remember=false;
    }
    this.axios.get("user/islogin",{
      params:{
        remember:this.remember
      }
    })
    this.city=localStorage.getItem("city");
     this.$store.commit('cityAlert',localStorage.getItem("cid"));
     //console.log("store"+localStorage.getItem("cid"));
     //this.citySelect(this.city,this.cid);
    // console.log(this);
    // console.log(this.$store.getters.cidd)
    this.axios.get(
      'cities'
    ).then(result=>{
      this.cities=result.data;
      //console.log(this.cities);
    })
  },
  mounted(){
    window.addEventListener("click",(e)=>{
      if(e.target.id!=="cityButton"){
        this.cityShow=false;
      }
    })
  }
}
</script>

<style scoped>
  @import "../assets/css/header.css"
</style>