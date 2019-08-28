<template>
  <section>
    <div class="ucmain">
      <div class="auto-width clearfix">
        <my-sidebar></my-sidebar>
        <router-view></router-view>
     </div>
    </div>
  </section>
  <!--<div>
    <h2>这里是用户界面</h2>
    <my-sidebar></my-sidebar>
    <router-view/>
  </div>-->
</template>
<script>
export default {
  created(){
    console.log(this.islogin);
    if(this.islogin){

    }else{
      alert("请先登录！")
    }
  },
  computed:{
    islogin(){
      return this.$store.state.islogin
    }
  }
}
</script>

<style scoped src="../assets/css/person.css">
</style>
