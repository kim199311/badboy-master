<template>
<section>
  <div class="goods">
    <div class="auto-width goodsItem">
      <!--演出图片-->
      <a href="" class="goodsImg">
        <img :src="live_tour.sphoto" alt="">
      </a>
      <!-- 演出信息列表 -->
      <div class="goodsDetails">
        <!-- 标题 -->
        <h1 class="goodsName">{{live_tour.stitle}}&nbsp;{{live_tour.city}}站</h1>
        <!-- 详情信息列表 -->
        <div class="detailsList">
          <p>演出时间：{{new Date(live_tour.time).toLocaleString()}}-{{new Date(live_tour.endtime).toLocaleString()}}</p>
          <p class="artistsList">艺人：<router-link  v-for="(t,i) of artists_details" :key="i" :to="`/artist_details/${t.aid}`">{{t.aname}}&nbsp;</router-link></p>
          <p>场地：<router-link :to="`/venue_details/${live_tour.vid}`">{{live_tour.city}} {{live_tour.vname}}</router-link></p>
          <p style="height:auto">地址：{{live_tour.vaddress}}<a href="" style="margin-left:5px;">查看地图</a></p>
          <p>电话：{{live_tour.vphone}}</p>
          <p class="goodsPrice">价格：<span><b class="¥">¥</b>{{(live_tour.price).toFixed(2)}}</span></p>
          <p class="count">数量：<button class="icon1"></button><input value="1" type="number" min="1"/><button class="icon2"></button></p>
        </div>
        <a href="">购买</a>
      </div>
      <div class="fansAtten">
        <div class="tag">
          <h3><i></i>标签</h3>
          <div><a href="" v-for="(t,i) of live_styles" :key="i">{{t.stname}}&nbsp;</a></div>
        </div>
        <div class="fansWant">
          <a href="" v-for="(t,i) of live_wants" :key="i">
            <img :src="t.avatar" alt="">
          </a>
        </div>
        <div class="attention">
          <a href=""><span class="icon3"></span>想去<span class="fansCount">{{live_wCount}}</span></a>
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
  </div>
  <div class="details">
    <div class="wrapHead">
      <div class="auto-width">
        <a href="">演出信息</a> 
      </div>
    </div>
    <!-- 演出详细信息 -->
    <div class="wrapContent auto-width">
      <!-- 左侧演出信息 -->
      <div class="leftContent">
        <!-- 左侧一层巡演信息 -->
        <div class="tour">
          <!-- 巡演title -->
          <div class="tourHead">
            <h3>
              <i class="tourIcon"></i>巡演城市
              <span>|
                <a href="javascript:;">查看更多</a>
              </span>
            </h3>
          </div>
          <div class="cityList">
            <ul>
              <li v-for="(t,i) of live_tours" :key="i">
                <router-link :to="`/live_details/${t.tid}`" :class="{active:tid==t.tid}" @click="tourSelect(t.tid)">
                  <p>
                    <span>{{t.city}}</span>{{new Date(t.time).toLocaleDateString()}}
                  </p>
                  <span class="listIcon"></span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <!--左侧二层参演相关 -->
        <div class="group">
          <div class="groupArt">
            <h3 class="groupH3">
              <i class="icon"></i>参演音乐人
            </h3>
            <ul>
              <li v-for="(t,i) of artists_details" :key="i" >
                <router-link :to="`/artist_details/${t.aid}`">
                  <span>
                    <img :src="t.aphoto" alt="">
                    <span class="icon artIcon"></span>
                  </span>
                  <div>
                    <p class="name">{{t.aname}}</p>
                    <p class="pStyle">演出音乐人</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="activityPlace">
            <h3 class="groupH3">
              <i class="icon placeIcon0"></i>演出场地
            </h3>
            <ul>
              <li>
                <router-link :to="`/venue_details/${live_tour.vid}`">
                  <span>
                    <img :src="live_tour.vpic" alt="">
                    <span class="icon placeIcon"></span>
                  </span>
                  <div>
                    <p class="name">{{live_tour.vname}}</p>
                    <p class="place">{{live_tour.vaddress}}</p>
                    <p class="phone">{{live_tour.vphone}}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- 左侧三层演出详情 -->
        <div class="liveDetails">
          <h2 class="h21">演出详情</h2>
          <div class="liveDesc" v-html="live_tour.description">
          </div>
        </div>
      </div>
      <!-- 右侧推荐信息 -->
      <div class="rightContent">
        <h3 class="groupH3">
          <i class="icon recomIcon"></i>演出推荐
        </h3>
        <ul>
          <li v-for="(t,i) of live_tours" :key="i" >
            <router-link :to="`/live_details/${t.tid}`" class="hotList">
              <div>
                <img src="images/index/hotshow1.jpg" alt="">
              </div>
              <div>
                <p class="hotTitle">ONE THIRD X SMILEY派对</p>
                <p class="hotArt">艺人： DJ A-DA</p>
                <p class="hotTime">时间：2019-06-06 22:00</p>
                <p class="hotSite">地点：北京 ONE THIRD酒吧</p>
                <p class="hotPrice">¥120</p>
              </div>
            </router-link>
          </li>
          <li>
            <a href="" class="hotList">
              <div>
                <img src="images/index/hotshow1.jpg" alt="">
              </div>
              <div>
                <p class="hotTitle">ONE THIRD X SMILEY派对</p>
                <p class="hotArt">艺人： DJ A-DA</p>
                <p class="hotTime">时间：2019-06-06 22:00</p>
                <p class="hotSite">地点：北京 ONE THIRD酒吧</p>
                <p class="hotPrice">¥120</p>
              </div>
            </a>
          </li>
          <li>
            <a href="" class="hotList">
              <div>
                <img src="images/index/hotshow1.jpg" alt="">
              </div>
              <div>
                <p class="hotTitle">ONE THIRD X SMILEY派对</p>
                <p class="hotArt">艺人： DJ A-DA</p>
                <p class="hotTime">时间：2019-06-06 22:00</p>
                <p class="hotSite">地点：北京 ONE THIRD酒吧</p>
                <p class="hotPrice">¥120</p>
              </div>
            </a>
          </li>
        </ul>
        <h3 class="groupH3 connect">
          <i class="icon connectIcon"></i>联系badboy
        </h3>
        <div class="connection">
          <p>遇到问题？无论是下单, 付款过程中发现问题，或举报失实，均可通过以下方式联系秀动，获得最快反馈和帮助。</p>
          <br>
          <br>
          <a href="">
            <p>客服电话：400-188-6980</p>
            <p>秀动客服微信号：showstart-service</p>
            <p>工作时间：周一至周五 10:00~18:30</p>
          </a>
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
      tour_details:{},
      artists_details:{},
      live_styles:{},
      live_tour:{},
      live_tours:{},
      live_wCount:" ",
      live_wants:{},
      // tid:"",
      comment_tour:{}    //推荐演出列表
    }
  },
  methods:{
    getList(){
      this.axios.get(
      "tours/details",
      {
         params:{tid:this.tid}
      }
    ).then(result=>{
      console.log(this.tid)
      this.tour_details=result.data;
      this.artists_details=result.data.artists;
      this.live_styles=result.data.styles;
      this.live_tour=result.data.tour;
      this.live_tours=result.data.tours;
      this.live_wCount=result.data.wCount;
      this.live_wants=result.data.wants;
      console.log(result.data);
      //console.log(result.data.tours);
    })
    },
    tourSelect(tid){
      this.tid=a;
    }
  },
  props:{tid:{default:0}},
  created(){
    //即将上演
    this.getList();
  },
  watch:{
    tid(){this.getList();}
  }
}
</script>
<style scoped src="../../public/css/liveDetails.css">
</style>