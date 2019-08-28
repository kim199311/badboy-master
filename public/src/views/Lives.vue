<template>
<section>
    <div id="live">
      <!-- 大标题 -->
      <div class="title">
        <ul>
          <li>
            <a href="javascript:;">
              <img src="images/index/title_shows.png" alt="">
            </a>
          </li>
        </ul>
      </div>
      <!-- 演出城市 -->
      <div class="liveCity" :class="{hide:cityHide}">
        <span>演出城市</span>
        <div>
          <ul>
            <li>
              <a :class="{active:cid==0}" href="javascript:;" @click="citySelect(0)">全国</a>
            </li>
            <li v-for="(t,i) of cities" :key="i">
              <a :class="{active:cid==t.cid}" href="javascript:;" @click="citySelect(t.cid)" :cid="t.cid">{{t.city}}</a>
            </li>
          </ul>
        </div>
        <!--<span>
          <a href="javascript:;" @click="toggleCity">展开</a> 
        </span>-->
      </div>
      <!-- 演出现场 -->
      <div class="liveHouse" :class="{hide:venueHide}">
          <span>音乐现场</span>
          <div>
            <ul>
              <li>
                <a :class="{active:vid==0}" href="javascript:;" @click="venueSelect(0)">全国</a>
              </li>
              <li v-for="(t,i) of venues" :key="i">
                <a :class="{active:vid==t.vid}" href="javascript:;" @click="venueSelect(t.vid)">{{t.vname}}</a>
              </li>
            </ul>
          </div>
          <span>
            <a href="javascript:;" @click="toggleVenue">展开</a> 
          </span>
      </div>
      <!-- 演出时间 -->
      <div class="liveTime">
        <span>演出时间</span>
        <div>
          <ul>
            <li>
              <a href="javascript:;">全部</a>
            </li>
            <li>
              <a href="javascript:;" @click="today">今天</a>
            </li>
            <li>
              <a href="javascript:;" @click="week">最近一周内</a>
            </li>
            <li>
              <a href="javascript:;" @click="month">最近一个月</a>
            </li>
            <li>
              <input type="date" v-model="startt">
            </li>
            <li>
              到
            </li>
            <li>
              <input type="date" v-model="endt">
            </li>
            <li>
              <a href="javascript:;" >确定</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 演出风格 -->
      <div class="liveStyle">
        <span>演出风格</span>
        <div>
          <ul>
            <li>
              <a :class="{active:stid==0}" href="javascript:;" @click="styleSelect(0)">全部</a>
            </li>
            <li v-for="(t,i) of styles" :key="i">
              <a href="javascript:;" :class="{active:stid==t.stid}"  @click="styleSelect(t.stid)">{{t.stname}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 演出列表 -->
      <div class="liveList">
        <ul>
          <li v-for="(t,i) of lives_list" :key="i">
            <router-link :to="`/live_details/${t.tid}`">
              <div>
                <img :src="t.sphoto" alt="">
              </div>
              <p class="gTitle">{{t.stitle}}--{{t.city}}站</p>
              <p class="gName">艺人：{{t.artists}}</p>
              <p class="gPrice">
                价格：<b>¥{{t.price.toFixed(2)}}</b> 
              </p>
              <p class="gTime">时间：{{new Date(t.time).toLocaleString()}}</p>
              <p class="gPlace">
                <span></span>
                [{{t.city}}]{{t.vname}}
              </p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- <div class="page">
        <a href="" class="page-prve"></a>
        <a href="javascript:;" v-for="(pNum,i) of pcount" :key="i" :class="{active:pno==pNum}">{{pNum}}</a>
        <a href="" class="page-next"></a>
      </div> -->
      <page :pcount=pcount :pno=pno @pageChange="pageChange" @pageUp="pageUp"></page>
    </div>
</section>
</template>
<script>
import page from '@/components/page/page'
export default {
  data(){
    return {
      cityHide:true,
      venueHide:true,
      cid:0,
      vid:0,
      startime:0,
      endtime:0,
      stid:0,
      lives_list:[],   //演出列表
      cities:[],       //演出城市列表
      venues:[],       //演出现场
      styles:[],       //演出风格
      pno:"",
      psize:"",
      pcount:"",
      kws:"",
      startt:"",
      endt:""
    }
  },
  methods:{
    today(){
      var ms=new Date().getTime();
      this.startime=ms-ms%(24*60*60*1000);
      this.endtime=ms+24*60*60*1000;
    },
    week(){
      var ms=new Date().getTime();
      this.startime=ms-ms%(24*60*60*1000);
      this.endtime=ms+24*60*60*1000*7;
    },
    month(){
      var ms=new Date().getTime();
      this.startime=ms-ms%(24*60*60*1000);
      this.endtime=ms+24*60*60*1000*31;
    }, 
    toggleCity(){
      this.cityHide=!this.cityHide;
    },
    toggleVenue(){
      this.venueHide=!this.venueHide;
    },
    pageChange(e){
      this.pno=e;
      this.allLives()
    },
    pageUp(e){
      this.pno=e;
      this.allLives();
    },
    pageDown(e){
      this.pno=e;
      this.allLives();
    },
    allLives(){
      var {cid,vid,starttime,endtime,stid,pno,psize}=this;
      this.axios.get(
        "tours/list",
        {
          params:{
            cid,vid,starttime,endtime,stid,pno,psize
          }
        }
      ).then(result=>{
        this.lives_list=result.data.result;
        this.pcount=result.data.pcount;
        this.pno=result.data.pno;
        // console.log(this.pno);
        // console.log(this.pcount);
        // console.log(result.data);
        // console.log(result.data.result);
      })
    },
    citySelect(cid){
      this.cid=cid;
    },
    venueSelect(vid){
      this.vid=vid;
    },
   styleSelect(stid){
      this.stid=stid;
    },
    allVenues(){
      //演出场地请求
      this.axios.get(
        "venues",
        {
          params:{
            cid:this.cid
          }
        }
      ).then(result=>{
        this.venues=result.data;
        //console.log(this.cities);
      })
    },
    search(){
      this.axios.get(
        'tours/kws',
        {
          params:{
            kws:this.kws,
            pno:this.pno,
            psize:this.psize
          }
        }
      ).then(result=>{
       this.lives_list=result.data.result;
      })
    },
  },
   computed:{
    myKws:function(){
      // return this.$store.getters.cid;
      return this.$store.state.searchKws;
    }
  },
  created(){
    this.kws=this.$route.params.kws;
    this.starttime=this.$route.params.starttime;
    this.endtime=this.$route.params.endtime;
    if(this.kws){
      this.search();
      this.cid=0;
      this.vid=0;
      this.startime=0;
      this.endtime=0;
      this.stid=0;
      this.pno=0;
      this.psize=0;
    }else{
      //演出列表请求
      this.allLives()
    }
    //演出场次请求
    this.allVenues()
    //演出城市请求
    this.axios.get(
      "cities"
    ).then(result=>{
      this.cities=result.data;
      //console.log(this.cities);
    });
    //演出风格
    this.axios.get(
      "styles"
    ).then(result=>{
      this.styles=result.data;
     //console.log(this.styles);
    });
    
  },
  watch:{
    cid(){ this.allLives(); this.allVenues();this.venueSelect(0);},
    vid(){ this.allLives();},
    stid(){ this.allLives();},
    starttime(){ this.allLives() },
    endtime(){ this.allLives() },
    myKws(){this.search()},
    startt(){
      this.starttime=new Date(this.startt).getTime();
    },
    endt(){
      this.endtime=new Date(this.endt).getTime();
    }
  },
  components:{
    page
  }
}
</script>
<style scoped src="../../public/css/lives.css">
</style>