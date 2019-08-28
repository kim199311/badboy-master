<template>
  <div id="demo" class="carousel" :style="{width:innerWidth+'px'}">
      <!--1.轮播图片-->
    <div class="carousel-inner" :style="ulStyle">
      <div v-for="(img,i) of imgs" :key="i" class="carousel-item" :style="{width:innerWidth+'px'}">
        <router-link :to="img.to" :title="img.title">
          <img :src="img.src" :style="{width:innerWidth+'px'}"/>
        </router-link>
        <router-link :to="img.to" v-text="img.title"></router-link>
      </div>
      <div class="carousel-item" :style="{width:innerWidth+'px'}">
        <router-link :to="imgs[0].to" :title="imgs[0].title">
          <img :src="imgs[0].src" :style="{width:innerWidth+'px'}"/>
        </router-link>
        <router-link :to="imgs[0].to" v-text="imgs[0].title"></router-link>
      </div>
    </div>
    <!--2.左右箭头-->
    <a href="javascript:;" class="carousel-control-next">
        <span class="carousel-control-next-icon"></span>
    </a>
    <a href="javascript:;" class="carousel-control-prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <!--3.轮播指示符-->
    <ul class="carousel-indicators">
        <li v-for="(img,idx) of imgs" :key="idx" :class="idx==i?'active':''"></li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      innerWidth:window.innerWidth,
      i:0,//当前正在播放的是第几张图片
      imgs:[
        {
          src:"/images/carousel_item/carousel-1.jpg",
          title:"《Ghost Mane》| STARR J与恶魔一起住在Dark Castle",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-2.jpg",
          title:"赐我们一首比“情歌而已”更值得唱的歌 声音碎片第三支预热单曲《送流水》首发",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-3.jpg",
          title:"我眼里只有一个3号他永远昂着头 | 黄旭全新单曲《低位》致敬韦德",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-4.jpg",
          title:"彭坦春晓携女率性玩音乐 Modern Sky Kids厂牌汇聚亲子市场新能量",
          to:"javascript:;"
        },
        /*{ 
          src:"/images/carousel_item/carousel-5.jpg",
          title:"曾轶可另类创作再出击 全新单曲《Truly》真心上线",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-6.jpg",
          title:"16层新专辑先行单曲上线，精巧器乐铺排搭建诡异《失落园》",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-7.jpg",
          title:"标题如歌” | OBi《爱你》温柔上线",
          to:"javascript:;"
        },
        { 
          src:"/images/carousel_item/carousel-8.jpg",
          title:"李大奔的硬核浪漫：如果不是你，随便谁都一样",
          to:"javascript:;"
        }*/
      ]
    }
  },
  created(){
    window.addEventListener("resize",()=>{
      this.innerWidth=window.innerWidth;
    })
  },
  methods:{

  },
  computed:{//希望网页宽度变化或i变化，则自动重新计算ul的位置和大小
    ulStyle(){//修饰所有图片的父元素
      var width=this.innerWidth*(this.imgs.length+1)+"px";
      var transition="all .5s linear";
      var marginLeft=-this.i*this.innerWidth+"px";
      return { transition, width, marginLeft }
    }
  }
}
</script>
<style scoped>
/* section>#carousel>.carousel-inner>div>a{
    display:block;
  } */
  section>.carousel{
    margin-top:60px;
    overflow:hidden;
  }
  section>.carousel:after{
    content:"";
    display:block;
    clear:both;
  }
  section>.carousel>.carousel-inner>.carousel-item{
    display:block;
    float:left;
  }
  section>.carousel>.carousel-inner>.carousel-item>a:last-child{
    display:block;
    height:50px;
    color:#fff;
    text-align:center;
    font-size:15px;
    line-height:50px;
    text-decoration:none;
    background-color:#f68cc6;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(2)>a:last-child{
    background-color:#fa9c77;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(3)>a:last-child{
    background-color:#ba4b5d;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(4)>a:last-child{
    background-color:#02c0f0f5;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(5)>a:last-child{
    background-color:#bc76dd;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(6)>a:last-child{
    background-color:#539788;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(7)>a:last-child{
    background-color:#c67ee79b;
  }
  section>.carousel>.carousel-inner>.carousel-item:nth-child(8)>a:last-child{
    background-color:#2f49079b;
  }

  /*重写指示符的样式*/
  .carousel-indicators{
    bottom:130px;
  }
  .carousel-indicators li{
    width:15px;height:15px;
    background-color:#fff;
    margin-left:6px;
    margin-right:6px;
    border-radius: 50%;
    top:60px;
  }
  .carousel-indicators>li:hover, .carousel-indicators>li.active{
    transform:scale(1.3)
  }
  .carousel-indicators>li:first-child{
    background-color:#f68cc6;
  }
  .carousel-indicators>li:nth-child(2){
    background-color:#fa9c77;
  }
  .carousel-indicators>li:nth-child(3){
    background-color:#ba4b5d;
  }
  .carousel-indicators>li:nth-child(4){
    background-color:#02c0f0f5;
  }
  .carousel-indicators>li:nth-child(5){
    background-color:#bc76dd;
  }
  .carousel-indicators>li:nth-child(6){
    background-color:#539788;
  }
  .carousel-indicators>li:nth-child(7){
    background-color:#c67ee79b;
  }
  .carousel-indicators>li:nth-child(8){
    background-color:#2f49079b;
  }
  /*重写左右箭头的样式*/
  .carousel-control-prev,
  .carousel-control-next{
    width:40px;height:100px;
    background-color:rgba(95, 95, 92, 0.3);
    top:20%;
    margin-left:40px;
    border-radius:0.25rem;
  }
  .carousel-control-next{
    margin-right:40px;
  }
</style>


