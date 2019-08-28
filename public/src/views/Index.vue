<template>
  <section style="margin-top:0px;">
    <!--轮播图 -->
    <carousel></carousel>
    <!-- 一楼近期演出 -->
    <div class="firstFloor">
      <div class="upcoming">
        <div class="titleBar">
          <i></i>
          <h2 class="h2">即将上演</h2>
          <router-link to="/lives">MORE</router-link>
        </div>
        <div class="upcomingList">
          <router-link
            v-for="(t,i) of recent_tours"
            :tid="tid"
            :key="i"
            :to="`/live_details/${t.tid}`"
          >
            <div class="showImg">
              <img :src="t.sphoto" alt :title="t.stitle" />
            </div>
            <p class="showTitle">{{t.stitle}}</p>
            <p class="showTime">{{new Date(t.time).toLocaleString()}}</p>
            <p class="site">[{{t.city}}]{{t.vname}}</p>
            <p class="showPrice">¥{{t.price.toFixed(2)}}</p>
          </router-link>
        </div>
      </div>
      <calendar></calendar>
    </div>
    <!-- 二楼导航 -->
    <div class="secondFloor">
      <div>
        <router-link to="/venues">
          <i></i>
          <dl>
            <dt>
              <span>混livehouse</span>感受音乐现场的魅力
            </dt>
            <dd>戳这里发现你附近的livehouse>></dd>
          </dl>
        </router-link>
      </div>
      <div>
        <router-link to="/artists">
          <i></i>
          <dl>
            <dt>
              <span>关注badboy音乐人</span>给你好看
            </dt>
            <dd>戳这里发现你喜爱的独立音乐人>></dd>
          </dl>
        </router-link>
      </div>
      <div>
        <a href>
          <i></i>
          <dl>
            <dt>
              <span>了解厂牌</span>大牌动态一手掌握
            </dt>
            <dd>戳这里发现你喜爱的厂牌>></dd>
          </dl>
        </a>
      </div>
    </div>
    <!-- 三楼热门演出 -->
    <div class="thirdFloor">
      <div class="titlebar">
        <i></i>
        <h2 class="h2">热门演出</h2>
        <router-link to="/lives">MORE</router-link>
      </div>
      <div class="hotShow">
        <router-link
          v-for="(t,i) of hot_tours"
          :key="i"
          :to="`/live_details/${t.tid}`"
          class="hotList"
        >
          <div>
            <img :src="t.sphoto" alt />
          </div>
          <div>
            <p class="hotTitle">{{t.stitle}}</p>
            <p class="hotArt">艺人： {{t.artists}}</p>
            <p class="hotTime">时间：{{new Date(t.time).toLocaleString()}}</p>
            <p class="hotSite">地点：{{t.city}} {{t.vname}}</p>
            <p class="hotPrice">¥{{t.price.toFixed(2)}}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 四楼音乐现场 -->
    <div class="fourthFloor">
      <div class="fourthLeft">
        <div class="titleBar">
          <i></i>
          <h2 class="h2">音乐现场</h2>
          <router-link to="/venues">MORE</router-link>
        </div>
        <div class="liveHouse">
          <router-link
            v-for="(t,i) of hot_venues"
            :key="i"
            :vid="vid"
            :to="`/venue_details/${t.vid}`"
            class="liveList"
          >
            <!--<img :src="t.sphoto" alt="" :title="t.stitle">-->
            <img :src="t.vpic" alt />
            <div class="liveDetail">
              <p class="liveTitle">
                <i></i>
                <span>{{t.vname}}</span>
              </p>
              <p class="liveAdd">{{t.vaddress}}</p>
              <p class="liveCount">最近有 {{t.tcount}}场 演出</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="fourthRight">
        <div class="boxTitle">
          <h2>骨灰乐迷</h2>
        </div>
        <div class="fans">
          <a href class="fansItem bgImgFirst">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">1</b>
          </a>
          <a href class="fansItem bgImgSecond">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">2</b>
          </a>
          <a href class="fansItem bgImgThird">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">3</b>
          </a>
          <a href class="fansItem">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">4</b>
          </a>
          <a href class="fansItem">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">5</b>
          </a>
          <a href class="fansItem">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">6</b>
          </a>
          <a href class="fansItem">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">7</b>
          </a>
          <a href class="fansItem">
            <img src="images/index/fans1.jpg" alt />
            <p>Gatsby</p>
            <b class="rankNum">8</b>
          </a>
        </div>
      </div>
    </div>
    <!-- 五楼音乐人 -->
    <div class="fifthFloor">
      <div class="fifthLeft">
        <div class="titleBar">
          <i></i>
          <h2 class="h2">热门音乐人</h2>
          <router-link to="/artists">MORE</router-link>
        </div>
        <div class="artList5">
          <ul>
            <li v-for="(t,i) of hot_artists" :key="i">
              <router-link :to="`artist_details/${t.aid}`" class="artItem">
                <img :src="t.aphoto" alt />
                <span class="bg"></span>
                <!--<img src="/image⁩s/artists/cw/hp.jpg" alt="">-->
                <div class="top">
                  <div class="topBg">
                    <span :class="`top${i+1}`"></span>
                  </div>
                  <div class="topDetail">
                    <p class="artName">{{t.aname}}</p>
                    <p class="artStyle">{{t.stname}}</p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="fifthRight">
        <div class="boxTitle">
          <h2>热门音乐</h2>
          <ul id="popMusic" @click="play($event)">
            <li v-for="(t,i) of popMusic" :key="i">
              <div>
                <img :src="t.imgSrc" alt />
                <audio :src="t.audioSrc" id="audio"></audio>
                <p>▶</p>
              </div>
              <div>
                <span>{{t.musicName}}</span>
                <br />
                <router-link :to="`/artist_details/${t.aid}`">{{t.artName}}</router-link>
              </div>
              <div>{{t.num}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import carousel from "../components/Index/Carousel";
import calendar from "../components/Index/Calendar";
export default {
  data() {
    return {
      recent_tours: [], //即将上演列表
      hot_tours: [], //热门演出列表
      hot_venues: [], //热门现场
      hot_artists: [], //热门音乐人列表
      tid: "",
      vid: "",
      cid: 0,
      playIcon: "▶",
      popMusic: [
        {
          artName: "低苦艾",
          musicName: "转山",
          imgSrc: "images/popmusic/zs.jpg",
          audioSrc: "audio/03 - 转山.mp3",
          aid: "14",
          num: 1
        },
        {
          artName: "痛仰",
          musicName: "生命中最美丽的一天",
          imgSrc: "images/popmusic/zmyt.jpg",
          audioSrc: "audio/06 - 生命中最美丽的一天.mp3",
          aid: 11,
          num: 2
        },
        {
          artName: "宋冬野",
          musicName: "关忆北",
          imgSrc: "images/popmusic/gyb.jpg",
          audioSrc: "audio/08 - 关忆北.mp3",
          aid: 1,
          num: 3
        },
        {
          artName: "谢天笑",
          musicName: "命运还是巧合",
          imgSrc: "images/popmusic/alb04.jpg",
          audioSrc: "audio/08 - 命运还是巧合.mp3",
          aid: 3,
          num: 4
        },
        {
          artName: "万能青年旅店",
          musicName: "揪心的玩笑和漫长的白日梦",
          imgSrc: "images/popmusic/wq.jpg",
          audioSrc: "audio/万能青年旅店 - 揪心的玩笑与漫长的白日梦.mp3",
          aid: 2,
          num: 5
        },
        {
          artName: "贰佰",
          musicName: "狗日的青春",
          imgSrc: "images/popmusic/eb.jpg",
          audioSrc: "audio/贰佰 - 狗日的青春.mp3",
          aid: 15,
          num: 6
        }
      ]
    };
  },
  methods: {
    //获取最近的四场演出列表
    getRecentTour() {
      this.axios
        .get("tours/recent", {
          params: {
            // cid:localStorage.getItem("cid")
            cid: this.myCid
          }
        })
        .then(result => {
          this.recent_tours = result.data;
        });
    },
    //获取最热门的演出列表
    getHotTour() {
      this.axios
        .get("tours/hot", {
          params: {
            // cid:localStorage.getItem("cid")
            cid: this.myCid
          }
        })
        .then(result => {
          this.hot_tours = result.data;
          console.log("------------"+result.data);
        });
    },
    //获取演出场次最多的现场列表
    getVenuesHot() {
      this.axios
        .get("venues/hot", {
          params: {
            cid: this.myCid
          }
        })
        .then(result => {
          this.hot_venues = result.data;
          //console.log(result.data);
        });
    },
    play(e) {
      let audio = e.currentTarget.getElementsByTagName("audio");
      if (e.target.tagName.toLowerCase() == "p") {
        if (e.target.previousElementSibling.paused) {
          for (let a of audio){
            a.pause();
            a.nextElementSibling.textContent = "▶";
          }
          e.target.textContent = "| |";
          e.target.previousElementSibling.play();
        } else {
          e.target.textContent = "▶";
          e.target.previousElementSibling.pause();
        }
      }
    }
  },
  computed: {
    myCid: function() {
      // return this.$store.getters.cid;
      return this.$store.state.cid;
    }
  },
  created() {
    //console.log(this.$store.getters.cid);
    // this.cid=this.$store.cid;
    //console.log("index" + this.cid);
    //this.cid=localStorage.getItem("cid");
    //console.log(this.cid)
    this.getRecentTour();
    this.getHotTour();
    this.getVenuesHot();
    this.axios.get("artists/hot").then(result => {
      this.hot_artists = result.data;
      //console.log(result.data);
    });
  },
  components: { carousel, calendar },
  watch: {
    myCid() {
      this.getRecentTour(), this.getHotTour(), this.getVenuesHot();
      // console.log(this.myCid)
    }
  }
};
</script>

<!--<style src="../../public/css/index.css" scoped>
</style>-->
<style scoped>
@import url("../assets/css/index.css");
</style>

