<template>
  <div class="userLeft">
    <div class="photobox">
      <div class="photo">
        <img src="images/index/default-photo.png" alt="">
      </div>
    </div>
    <div class="userNav">
      <dl>
        <dt>我的资料</dt>
        <dd>
          <router-link to="/user/profile">
            <i class="icon10"></i>我的资料
          </router-link>
        </dd>
        <dd>
          <router-link to="/user/favs">
            <i class="icon11"></i>收藏的演出
          </router-link>
        </dd>
      </dl>
      <dl>
        <dt>订单相关</dt>
        <dd>
          <router-link to="/user/orders">
            <i class="icon12"></i>演出订单
          </router-link>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped src="../../public/css/mySideBar.css">

</style>