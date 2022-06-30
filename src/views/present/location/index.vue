<template>
  <div class="app-container">
    <el-alert
      :title=nowlocatitle
      type="success">
    </el-alert>


    <iframe id="mapPage" width="100%" height="400px" frameborder="0"
            src="https://apis.map.qq.com/tools/locpicker?search=0&type=1&policy=1&radius=300&key=
CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB&referer=unikeyword&total=5&mapdraggable=0"
    >
    </iframe>
    <el-button  @click="handleCheckCloseLocation" size="mini"  icon="el-icon-check">确认位置</el-button>
    <el-button type="primary" @click="HandleAttend" size="mini"  icon="el-icon-position" style="margin-left: 50px">进行签到</el-button>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {stuAttendLocation} from '@/api/present/stuapi'
import {FaceInfo,listFace} from '@/api/present/face'
import {MessageBox} from 'element-ui'
import store from '../../../store'
import axios from "axios";
let globalloc;
window.addEventListener('message', function(event) {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  globalloc = event.data;
  if (globalloc && globalloc.module === 'locationPicker')
  {
    console.log('globalloc', globalloc);
  }
}, false);


export default {
  name: 'stu',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {

    return {
      captureSrc: "",
      noseetea:false,
      // ifstudent:this.$store.getters.name,
      ifstudent: false,
      avatar: '',
      liststu_id:0,

      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      userList: [],
      teaList: [],
      // 弹出层标题
      nowlocatitle: '当前位置: ',
      // 是否显示弹出层
      open: false,
      // 角色
      roles: [],
      // 查询参数
      queryParams: {
        stu_name: '',
        stu_id: 0,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      // 表单校验
      uploadData: {
        //使用 vuex 将用户名放在了 state 中 便于存取
        name: this.$store.getters.name,
        mystu_id:0
      },
      fromparam:{
        LATI:'',
        LONGTI:'',
        ATTENDID:0,

      }

    }
  },
  created() {

  },
  mounted() {
    this.fromparam.ATTENDID=this.$route.params.ATTENDID
    this.fromparam.LATI=this.$route.params.LATI
    this.fromparam.LONGTI=this.$route.params.LONGTI


  },
  methods: {
    handleCheckCloseLocation(){
      console.log(globalloc.poiaddress)
      this.form.reasonLocation=globalloc.poiaddress+globalloc.poiname
      this.nowlocatitle='当前位置: '+globalloc.poiaddress+globalloc.poiname
      this.form.LongtiTude=globalloc.latlng.lng
      this.form.LatiTude=globalloc.latlng.lat

      console.log(this.from)

    },



    HandleAttend(){
      console.log(globalloc.poiaddress)
      // let distancedata={
      //   from:{
      //    lat:this.fromparam.LATI,
      //    lng:this.fromparam.LONGTI
      //
      //   },
      //   to:{
      //     lat:this.form.LatiTude,
      //     lng:this.form.LongtiTude,
      //
      //   },
      //   key:'CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB',
      //   mode:'walking'
      // }
      axios.get('/api/ws/distance/v1/matrix',
        {  params:{
            // from:{
            //   lat: Number(  this.$route.params.LATI),
            //   lng:Number( this.$route.params.LONGTI)
            //
            // },
            from:`${Number(this.$route.params.LATI)},${Number(this.$route.params.LONGTI)}`,
            to:`${Number(this.form.LatiTude)},${Number(this.form.LongtiTude)}`,

            key:'CBRBZ-B5QCX-SJZ4C-Z2SKO-W74ME-JMFPB',
          }}).then(respp=>{
        console.log(respp)
        let distan = respp.data.result.rows[0].elements[0].distance; //拿到距离(米)
        if (distan>1001)
        {
          this.msgError('距离误差过大,请在指定的范围内进行签到，')



        }
        if (distan<1001)
        {
          let httpData = {
            stu_id:this.$store.getters.user_id,
            stu_name:this.$store.getters.name,
            stu_nick_name:this.$store.getters.user_nick_name,
            actualLoctaion:this.form.reasonLocation,
            actualDistance:distan,
            ATTENDID:this.$route.params.ATTENDID
          };

          stuAttendLocation(httpData).then(rett=>{
            console.log(rett)
            this.msgSuccess(rett.message)

          })
        }
      })



    },





  }
}
</script>
<style lang="scss" scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


/deep/ .el-select--default {
  width: 100%;
}
</style>
