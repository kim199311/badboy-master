<template>
<section class="map">
  <div id="containe" class="containe"></div>
</section>
</template>
<script>
export default {
  mounted(){
    //创建Map实例
    var map = new BMap.Map("containe");
    // 初始化地图坐标  
    var point = new BMap.Point(116.412498 ,39.883448); 
    // 初始化地图，设置中心点坐标和地图级别  
    map.centerAndZoom(point, 15);
    var marker = new BMap.Marker(point);        // 创建标注    
    map.addOverlay(marker);  //将标注添加到地图
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());
    //设置地图显示的城市，
    // map.setCurrentCity("杭州");
    //开启鼠标滚轮缩放
    map.enableScrollWheelZoom(true);
    // 设置定时器，对地图进行自动移动
    /*setTimeout(function(){
        map.panTo(new BMap.Point(113.262232,23.154345));
    }, 2000);
    setTimeout(function(){
        map.setZoom(14);
    },4000);*/
  // 创建点坐标  
  // 编写自定义函数,创建标注
	// function addMarker(point){
	//   var marker = new BMap.Marker(point);
	//   map.addOverlay(marker);
	// }
	var points=[
    {"lng":116.357717,"lat":39.950473},
    {"lng":116.409126,"lat":39.94192},
    {"lng":116.28377,"lat":39.916375},
    {"lng":116.357717,"lat":39.950473},
    {"lng":116.404442,"lat":39.888843}
  ];
  //创建添加标注点到地图,并为标注点添加事件
	function addMarker(point){
    for(var i=0,pointsLem=points.length;i<pointsLem;i++){
      //将标注点转化为地图上的点
      var point=new BMap.Point(points[i].lng,points[i].lat);
      var marker=new BMap.Marker(point);//将点转化为标注点
      map.addOverlay(marker);  //将标注点添加到地图
    }
	  var marker = new BMap.Marker(point);
	  map.addOverlay(marker);
  }
  addMarker(point);
  }
}
</script>
<style scoped>
  .map{
  height: 400px;
  margin-bottom: 40px;
  border:1px solid #f00;
  padding:0;
  margin-top:20px;
} 
.containe{
  width:100%;
  height:100%;
}
</style>