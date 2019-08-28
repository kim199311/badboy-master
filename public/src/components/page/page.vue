<template>
  <div class="page" v-show="!(pcount==1|pcount==0)">
    <a href="javascript:;" class="page-prve" v-show="!(pNo==0)" @click="pageUp(pNo)"></a>
    <!--<a href="" class="active">1</a>-->
    <a
      href="javascript:;"
      v-for="(pNum,i) of pcount"
      :key="i"
      :class="{active:pNo+1==pNum}"
      @click="pageTabClick(pNum)"
    >{{pNum}}</a>
    <a href="javascript:;" class="page-next" v-show="!(pNo==pcount-1)" @click="pageDown(pNo)"></a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pNo:this.pno,
      pNum:0
    };
  },
  methods:{
    pageTabClick(pNum){
      this.pNo=pNum-1;
      this.$emit('pageChange',this.pNo);
    },
    pageUp(pNo){
      if(pNo>=1){
        this.pNo=pNo-1;
        this.$emit('pageUp',this.pNo);
      }
    },
    pageDown(pNo){
      if(pNo<=13){
        this.pNo=pNo+1;
        this.$emit('pageUp',this.pNo);
      }
    }
  },
  props: { pcount: { default: 10 }, pno: { default: 0 } }
};
</script>
<style scoped>
.page {
  margin-top: 20px;
  margin-bottom: 100px;
  width: 1200px;
  height: 42px;
  text-align: center;
}
.page > a.page-prve,
.page > a.page-next {
  margin: 0;
  width: 28px;
  height: 42px;
  background: url("/images/index/icon.png") #fff -94px -500px no-repeat;
}
.page > a.page-next {
  background-position: -136px -503px;
}
.page > a {
  display: inline-block;
  text-decoration: none;
  width: 42px;
  margin-left:2px;
  margin-right:2px;
  text-align: center;
  line-height: 42px;
  color: #333;
  font-size: 18px;
  /* align-items: center; */
  vertical-align: middle;
  font-family: "Microsoft YaHei", "\5b8b\4f53";
}
.page > a:hover {
  color: #fff;
  background-color: #e72f2f;
}
.page > a.page-next:hover {
  background-color: #fff;
}
.page > a.page-prve:hover {
  background-color: #fff;
}
.page > a.active {
  background-color: #e72f2f;
  color: #fff;
}
</style>