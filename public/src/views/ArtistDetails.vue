<template>
  <section>
    <div class="hr"></div>
    <!-- 一楼艺人简介 -->
    <div class="artHead">
      <div class="artPhoto">
        <img :src="artist_details.aphoto" alt="">
      </div>
      <div class="artDesc">
        <i class="arrow"></i>
        <h1>{{artist_details.aname}}<span></span></h1>
        <p>风格：{{artist_details.stname}}</p>
      </div>
      <div class="artFans">
        <div class="attention">
          <a href="javascript:;" @click="addfans"><span></span>我要关注</a>
        </div>
        <div class="share">
          <span>分享到</span>
          <div>
            <a href="" class="qznoe"></a>
            <a href="" class="sina"></a>
            <a href="" class="douban"></a>
            <a href="" class="txwb"></a>
            <a href="" class="qq"></a>
          </div>
        </div>
      </div>
    </div>
    <!-- 二楼艺人详情 -->
    <div class="detailWrap">
      <div class="wrap-head">
        <ul>
          <li>
            <a href="javascript:;" @click="liveShow()">演出</a>
          </li>
          <li>
            <a href="javascript:;">作品</a>
          </li>
          <li>
            <a href="javascript:;" @click="briefShow()">简介</a>
          </li>
        </ul>
      </div>
      <div class="wrap-content">
        <div class="itemLeft">
          <!-- 艺人相关演出 -->
          <div class="content" v-show="shows">
            <div class="group">
              <h2>全部演出</h2>
              <ul class="comingList">
                <li v-for="(t,i) of artist_tours" :key="i">
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
              <div class="more">
                <a href="">查看更多</a>
              </div>
            </div>
          </div>
          <!-- 艺人简介 -->
          <div class="content" v-show="unshows" id="tab2">
            <div class="group">
              <h2>简介</h2>
              <div v-html="artist_details.profile" class="artistProfile"></div>
              <h2 class="imgTitle">相关图片</h2>
              <ul>
                <li v-for="(t,i) of artist_pics" :key="i">
                  <a href="javascript:;">
                    <img :src="t.pic" alt="">
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 右侧互动区域 -->
        <div class="itemRight">
          <div class="tag">
            <h3><i></i>标签</h3>
            <div><a href="">{{artist_details.stname}}</a></div>
          </div>
          <div class="fans">
            <div class="fansHead">乐迷(<span>{{artist_fans.length}}</span>)</div>
            <div class="fansList">
              <a href="javascript:;" v-for="(t,i) of artist_fans" :key="i">
                <img :src="t.avatar" :title="t.uname" alt="">
              </a>
            </div>
          </div>
          <div class="around">
            <h3>你可能还想了解</h3>
            <ul>
              <li>
                <a href="">
                  <span class="bg">
                    <img src="images/index/fans002.jpg" alt="">
                    <span></span>
                  </span>
                  <span class="aboutName">耳光乐队</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span class="bg">
                    <img src="images/index/fans002.jpg" alt="">
                    <span></span>
                  </span>
                  <span class="aboutName">耳光乐队</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span class="bg">
                    <img src="images/index/fans002.jpg" alt="">
                    <span></span>
                  </span>
                  <span class="aboutName">耳光乐队</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      artist_item:{},
      artist_details:{},
      artist_fans:{},
      artist_venues:{},
      shows:true,
      unshows:false,
      artist_pics:[],
      artist_tours:{}
    }
  },
  methods: {   
    addfans(){
      this.axios.post(
        "user/addfans",
        {
          aid:this.aid
        }
      ).then(res=>{
        alert("关注成功");
        this.loadDetails();
      })
    },
    liveShow:function(){
      this.shows=true;
      this.unshows=false;
    },
    briefShow:function(){
      this.shows=false;
      this.unshows=true;
    },
    loadDetails(){
      //艺人详情页
      this.axios.get(
        "artists/details",
        {
          params:{aid:this.aid}
        }
      ).then(result=>{
        this.artist_item=result.data;
        this.artist_details=result.data.artist;
        this.artist_fans=result.data.fans;
        this.artist_venues=result.data.recent_venues;
        this.artist_pics=result.data.art_pics;
        //console.log(this.artist_details);
        //console.log(this.artist_fans);
        //console.log(this.artist_venues);
        //console.log(this.artist_pics);
      })
    }
  },
  props:{aid:{default:0}},
  created(){
    this.loadDetails();
    this.axios.get(
      "tours/byartist",
      {
         params:{aid:this.aid}
      }
    ).then(result=>{
      this.artist_tours=result.data.result;
    })
  }
}
</script>
<style scoped>
  @import url("../assets/css/artDetail.css");
</style>