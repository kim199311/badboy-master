<template>
<section>
  <div class="hr"></div>
  <div class="venue">
    <!--一楼音乐现场导航栏 -->
    <div class="venueHead">
      <h2>音乐现场</h2>
      <div class="userSearch">
        <form action="">
          <input type="text" name="searchKeyword" placeholder="搜索音乐现场" v-model="kws">
          <button @click="search(kws)">搜索</button>
        </form>
      </div>
    </div>
    <!-- 二楼城市切换 -->
    <div class="citySelect">
      <ul>
        <li>
          <a href="javascript:;" :class="{active:cid==0}" @click="citySelect(0)">全国</a>
        </li>
        <li v-for="(t,i) of cities" :key="i">
          <a href="javascript:;" :class="{active:cid==t.cid}" @click="citySelect(t.cid)">{{t.city}}</a>
        </li>
      </ul>
     <!-- <span>
        展开<i></i>
      </span>-->
    </div>
    <!-- 三楼地图 -->
    <geog></geog>
    <!-- <div class="map" id="containe">
    </div> -->
    <!-- 四楼音乐现场列表 -->
    <div class="venueList">
      <div class="listItem" v-for="(v,i) of venue_list" :key="i">
        <div class="item">
          <router-link :to="`/venue_details/${v.vid}`">
            <img :src="v.vpic" alt="">
          </router-link>
          <div class="itemDetail">
            <router-link :to="`/venue_details/${v.vid}`" class="venueName">{{v.vname}}</router-link>
            <p class="venuePlace">{{v.vaddress}}</p>
            <router-link :to="`/venue_details/${v.vid}`" class="venueCount">最近有<span>{{v.tcount}}</span>场演出</router-link >
            <div class="aboutList">
              <router-link v-for="(t,j) of v.shows" :key="j" 
              :to="`/live_details/${t.tid}`">
                <img :src="t.sphoto" alt="">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--四楼分页-->
    <page :pcount=pcount :pno=pno @pageChange="pageChange" @pageUp="pageUp"></page>
  </div>
</section>
</template>
<script>
import geog from '@/components/map/map'
import page from '@/components/page/page'
export default {
  data(){
    return {
      venue_list:[],
      cities:[],
      cid:0,
      kws:"",
      pno:"",
      psize:"",
      pcount:"",
      start:new Date().getTime()
    }
  },
  methods:{
    citySelect(cid){
      this.cid=cid;
    },
    pageChange(e){
      this.pno=e;
      this.getList();
    },
    pageUp(e){
      this.pno=e;
      this.getList();
    },
    pageDown(e){
      this.pno=e;
      this.getList();
    },
    getList(){
      console.log(this.cid+"#########");
      this.axios.get(
      "venues/list",
      {
        params:{
          cid:this.cid,
          kws:this.kws,
          pno:this.pno,
          psize:this.psize,
          start:this.start
        }
      }
    ).then(result=>{
      this.venue_list=result.data.result;
      this.pcount=result.data.pcount;
      console.log(result.data);
      console.log(this.venue_list);
      //console.log(this.pcount);
    })
    },
    search(kws){
      // this.cid=0;
      this.kws=kws;
      // this.getList();
      //this.$router.push({path:'venues'});
      //this.$router.go(0);
    },
  },
 created(){
    // 获取现场列表
  this.getList(),
  this.axios.get(
    "cities"
  ).then(result=>{
    this.cities=result.data;
    console.log(this.cities);
  })
  },
  watch:{
    // kws(){this.cid=0;this.getList()},
    kws(){this.getList()},
    cid(){this.getList();this.kws=""}
  },
  components:{
    page,
    geog
  }
}
</script>
<style scoped src="../../public/css/venue.css">
</style>