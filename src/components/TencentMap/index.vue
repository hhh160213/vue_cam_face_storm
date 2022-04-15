<template>
  <div id="container" style="width:600px;height:500px;"></div>
</template>

<script>
// import TMap from "TMap";

export default {
  name: 'BackToTop',
  data() {
    return {
      longitude:0,//经度
      latitude:0,//纬度
      city:''
    }
  },
  mounted() {
    this.getMyLocation();
  },

  methods:{
    //第一部分
    //定位获得当前位置信息
    getMyLocation() {
      var geolocation = new qq.maps.Geolocation("CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB", "unikeyword");
      geolocation.getIpLocation(this.showPosition, this.showErr);
      //geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
    },
    showPosition(position) {
      console.log(position);
      this.latitude = position.lat;
      this.longitude = position.lng;
      this.city = position.city;
      this.setMap();
    },
    showErr() {
      console.log("定位失败");
      this.getMyLocation();//定位失败再请求定位，测试使用
    },
    //第二部分
    //位置信息在地图上展示
    setMap() {
      //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      //设置地图中心点
      var myLatlng = new qq.maps.LatLng(this.latitude,this.longitude);
      //定义工厂模式函数
      var myOptions = {
        zoom: 13,               //设置地图缩放级别
        center: myLatlng,    //设置中心点样式
        mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
      }
      // //获取dom元素添加地图信息
      var map = new qq.maps.Map(document.getElementById("container"), myOptions);
      //第三部分
      //给定位的位置添加图片标注
      var marker = new qq.maps.Marker({
        position: myLatlng,
        map: map
      });
      //给定位的位置添加文本标注
      var label= new qq.maps.Label({
        position: myLatlng,
        map: map,
        content:'这是我当前的位置，偏差有点大，哈哈'
      });
    }
  },}
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
