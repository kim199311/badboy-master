<template>
  <div class="userRight">
    <div class="userTitle mt60 clearfix">
      <h2>我的资料</h2>
      <p class="comple">资料完整度</p>
      <div class="progress">
        <div class="progressbar" style="width:100%"></div>
      </div>
      <p class="collagen">100%</p>
    </div>
    <div class="tablebox mt50">
      <form action="" methods="post" id="infoForm" >
        <div class="infoHead clearfix">
          <div class="infoTitle">当前对象：</div>
          <div class="infoCont">
            <div class="myPhoto">
              <div class="wrapPhoto">
                <img src="images/index/default-photo.png" alt="" class="errImg">
                <div class="s-uploader">
                  <ul class="img-upload-list"></ul>
                  <div class="imgUpload" style="position:relative;overflow:hidden;">
                    <span></span>
                    <input type="file" name="userPicture" style="cursor:pointer;position:absolute;opacity:0;filter:alpha(opacity=0);left:-10px;top:-10px;background:#fff;font-size:900px;border:0;width:400px;height:200px;">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="uploadText">点击上传头像</span>
        </div>
        <div class="ctrlItem nickname">
          <p class="ctrlItem-l">昵称：</p>
          <p class="ctrlItem-r">
            <input type="text" name="uname" class="iptText" id="username" required="true" placeholder="昵称" autocomplete="off">
          </p>
        </div>
        <div class="ctrlItem">
          <p class="ctrlItem-l">性别：</p>
          <p class="ctrlItem-r feldSex">
            <label class="feld">
              <input type="radio" name="sex" value="1">
              <span class="i_name">男</span>
            </label>
            <label class="feld">
              <input type="radio" name="sex" value="0">
              <span class="i_name">女</span>
            </label>
          </p>
        </div>
        <div class="ctrlItem">
          <p class="ctrlItem-l">真实姓名：</p>
          <p class="ctrlItem-r">
            <input type="text" name="rname" class="iptText" id="rname" required="true" placeholder="真实姓名" autocomplete="off">
          </p>
        </div>
        <div class="ctrlItem">
          <p class="ctrlItem-l">邮箱：</p>
          <p class="ctrlItem-r">
            <input type="email" name="email" class="iptText" id="email" required="true" placeholder="邮箱" autocomplete="off">
          </p>
        </div>
        <div class="ctrlItem">
          <p class="ctrlItem-l">手机号：</p>
          <p class="ctrlItem-r">
            <input type="text" name="phone" class="iptText" id="uphone" required="true" placeholder="手机号" autocomplete="off">
          </p>
        </div>
        <div class="ctrlItem">
          <p class="ctrlItem-l">星座：</p>
          <p class="ctrlItem-r">
            <select name="selectStar" id="selectStar" class="iptText">
              <option  value="0" selected="selected"  >白羊座</option>
              <option  value="1">金牛座</option>
              <option  value="2">双子座</option>
              <option  value="3">巨蟹座</option>
              <option  value="4">狮子座</option>
              <option  value="5">处女座</option>
              <option  value="6">天秤座</option>
              <option  value="7">天蝎座</option>
              <option  value="8">射手座</option>
              <option  value="9">摩羯座</option>
              <option  value="10">水瓶座</option>
              <option  value="11">双鱼座</option>	
            </select>
          </p>
        </div>
        <div class="ctrlItem"> 
          <p class="ctrlItem-l">血型：</p> 
          <p class="ctrlItem-r"> 
            <select class="iptText" id="selectBlood" name="selectBlood"> 
              <option value="0">A型</option> 
              <option value="1">B型</option> 
              <option value="2">O型</option> 
              <option value="3">AB型</option> 
            </select>						 
          </p> 
        </div>	
        <div class="ctrlItem">
          <p class="ctrlItem-l">&nbsp;</p> 
          <p class="ctrlItem-r">
            <button class="submitBtn">确定修改</button>
          </p> 
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped src="../assets/css/profile.css">
</style>