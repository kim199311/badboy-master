<template>
  <div class="showCalendar">
    <div class="calendarHead">
      <div class="calendarTitle">
        <h2 class="h2">演出日历</h2>
      </div>
      <div class="calendarDate">
        <div class="calendarYear">
          <span class="leftShift" v-show="!(y==(new Date().getFullYear())&&(m==new Date().getMonth()+1))" @click="changeM(-1)"></span>
          <span class="year">{{this.y}}年</span>
          <span class="month">{{this.m}}月</span>
          <span class="rightShift" @click="changeM(+1)"></span>
        </div>
      </div>
    </div>
    <div class="calendarMain">
      <table cellpadding="0" cellspacing="0">
        <tbody>
          <tr class="weekHead">
            <td>
              <span>周日</span>
            </td>
            <td>
              <span>周一</span>
            </td>
            <td>
              <span>周二</span>
            </td>
            <td>
              <span>周三</span>
            </td>
            <td>
              <span>周四</span>
            </td>
            <td>
              <span>周五</span>
            </td>
            <td>
              <span>周六</span>
            </td>
          </tr>
          <tr v-for="(arr,i) of result" class="dateTd" :key="i">
            <td v-for="(date,j) of arr" :key="j" class="preMonthDay">
              <div class="activity">
                <i>{{
                  date?date.d:""
                  }}</i>

                <span class="span redDot" v-show="date!==undefined&&date.count!=0"></span>
                <span class="redSquare" @click="gotoTours(date.d)" v-if="date!==undefined&&date.count!=0">{{date?date.count:""}}场</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      y:new Date().getFullYear(),
      m:new Date().getMonth()+1,
      day:0,
      result:[]
    }
  },
  methods:{
    gotoTours(d){
      var starttime=new Date(`${this.y}/${this.m}/${Number(d)}`).getTime()
      var endtime=new Date(`${this.y}/${this.m}/${Number(d)+1}`).getTime()
      this.$router.push(`/lives/${starttime}/${endtime}`)
    },
    loadCalendar(){
      this.axios.get(
        "tours/bymonth",
        {
          params:{
            y:this.y,
            m:this.m,
            cid:this.cid
          }
        }
      ).then(res=>{
        var arr=res.data;
        var day=new Date(`${this.y}-${this.m}-1`).getDay();
        this.day=day;
        var arr1=new Array(day);
        var arr2=new Array(this.dates);
        for(var i=0;i<this.dates;i++){
          arr2[i]={d:String(i+1).padStart(2,"0"),count:0}
        }
        for(var date of arr){
          arr2[Number(date.d)-1]=date;
        }
        arr=[].concat(arr1,arr2);
        this.result.length=0;
        for(var i=0;i<arr.length;i+=7){
          this.result.push(arr.slice(i,i+7))
        }
        if(this.result[4]===undefined){
          this.result.push(new Array(7));
        }else if(this.result[4].length<7){
          this.result[4].length=7
        }
        console.log(this.result);
      })
    },
    changeM(i){
      if(i==-1&&this.m==1){
        this.m=12;
        this.y-=1;
      }else if(i==+1&&this.m==12){
        this.m=1;
        this.y+=1;
      }else{
        this.m+=i;
      }
    }
  },
  created(){
    this.loadCalendar();
  },
  computed:{
    dates(){
      if([1,3,5,7,8,10,12].indexOf(this.m)!==-1){
        console.log(this.m);
        return 31
      }else if([4,6,9,11].indexOf(this.m)!==-1){
        console.log(this.m);
        return 30
      }else if(this.y%4==0&&this.y%100!=0){
        console.log(this.m);
        return 29
      }else{
        return 28
      }
    },
    cid(){
      return this.$store.state.cid;
    }
  },
  watch:{
    m(){
      this.loadCalendar();
    },
    cid(){
      this.loadCalendar();
    }
  }
}
</script>
<style scoped>
  h2.h2{ 
    color:#666666 !important;
    font-size:20px !important;
  }
  .showCalendar>.calendarHead{
    height:50px;
    display:flex;
    justify-content: space-between;
  }
  .showCalendar>.calendarHead>.calendarTitle{
    width:150px;
  }
  span.year,span.month{
    display:inline-block;
    font-size:18px;
    color:#666666;
    vertical-align: middle;
  }
  .showCalendar>.calendarHead>.calendarDate{
    border: 1px #fff solid;
    padding: 0 10px; 
    margin: -1px -11px;
    overflow: hidden;
  }
  .showCalendar>.calendarHead>.calendarDate>.calendarYear>span.leftShift{
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    background-image: url("/images/index/droll-icon.png");
    background-position: -126px 0px;
    cursor: pointer;
  }
  .showCalendar>.calendarHead>.calendarDate>.calendarYear>span.rightShift{
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    background-image: url("/images/index/droll-icon.png");
    background-position: -127px -39px;
    cursor: pointer;
  }
  /*.showCalendar td{
    text-align:center;
    line-height:52px;
  }*/
  /* 日历主体 */
  .calendarMain{
    padding:0 10px;
    width:100%;
    height:323px;
    border:1px solid #eee;
  }
  /* 星期头 */
  .weekHead{
    width:100%;
    height:52px;
    border-bottom:1px solid #eee;
  }
  .weekHead>td{
    width:52px;
    height:52px;
    text-align:center;
    line-height:52px;
  }
  .dateTd>td{
    width:52px;
    height:45px;
    line-height:45px;
    text-align:center;
    position:relative;
    overflow:hidden;
  }
  .preMonthDay>div{
    position:absolute;
    top:0;
    left:0;
    overflow:hidden;
    height:90px;
    width:52px;
    cursor:pointer;
  }
  .dateTd span{
    opacity: 0;
    position:absolute;
    top:0;
    left:0;
    display:inline-block;
    width:52px;
    height:45px;
    line-height:45px;
    text-align:center;
  }
  .dateTd .redDot{
    opacity: 1;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    top: 37px;
    left: 26px;
    margin-left: -3px;
    background-color: #e72f2f;
    overflow: hidden;
    color: #e72f2f;
  }
  .dateTd .redSquare{
    position:absolute;
    left:0;
    top:45px;
    width:52px;
    opacity: 1;
    background-color: #e72f2f;
    color:#fff;
    transition:all .5s linear;
  }
  .preMonthDay:hover .redSquare{
    top:0px;
  }
  .dateTd i,span{
  font: 13px/1.5 "Microsoft YaHei", 宋体;
  }
</style>


