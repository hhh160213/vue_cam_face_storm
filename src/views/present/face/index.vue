<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permission="['present:face:look']"

          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="invokingCamera()"
        >打开摄像头
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          v-permission="['present:face:look']"

          type="danger"
          icon="el-icon-close"
          size="mini"
          @click="closedCamera()"
        >关闭摄像头
        </el-button>
      </el-col>


   <el-col :span="1.5">
        <el-button
          v-permission="['present:face:look']"

          type="primary"
          icon="el-icon-check"
          size="mini"
          @click="screenShot()"
        >进行识别
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          v-permission="['present:face:look']"
          type="primary"
          icon="el-icon-info"
          size="mini"
          @click="handlelooktea"
        >查看签到记录
        </el-button>
      </el-col>

    </el-row>

    <!--    学生个人信息的表格-->
    <el-table v-loading="loading" :data="userList" v-if="noseetea">
      <el-table-column label="编号" prop="stu_id" width="90"/>
      <el-table-column label="姓名" prop="stu_name" width="90"/>
      <el-table-column label="签到方式" prop="attend_type" width="90"/>
      <el-table-column label="签到时间" align="center" prop="create_time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
    </el-table>



    <video :src="captureSrc" ref="capture" class="bg-black" height="395" autoplay></video>
    <!-- 视频流截图 -->
    <canvas id="canvas" width="531" height="395"></canvas>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {getstuInfo, listUser, stuFaceMatched} from '@/api/present/stuapi'
import {FaceInfo,listFace} from '@/api/present/face'
import {MessageBox} from 'element-ui'
import store from '../../../store'
import axios from "axios";

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
      title: '',
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


    }
  },
  created() {

  },
  mounted() {
    this.getList()


  },
  methods: {

    /** 查询用户列表 */
    getList() {
      if (this.$store.getters.roles[0] === '学生') {
        this.queryParams.stu_id=this.$store.getters.user_id
        FaceInfo(this.queryParams).then(
          response => {
            this.userList = response.data
            this.total = response.data.length
            this.loading = false
          }
        )
      } else {
        this.queryParams.stu_name = undefined
        this.queryParams.stu_id = undefined
        listFace(this.queryParams).then(
          response => {
            console.log('打印获取到学生个人信息以后的response---------------------')
            console.log(response)
            console.log('打印获取到学生个人信息以后的data---------------------')
            console.log(response.data)
            this.userList = response.data
            this.total = response.data.length
            this.loading = false
          }
        )

      }
    },
    //查看签到记录的表格
    handlelooktea(){
      this.noseetea = !this.noseetea

    },

    /** 查询用户列表 */
    //摄像头部分
    // 开启摄像头
    invokingCamera() {
      window.navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
            audio: false
          },
          this.getVideoStream,
          this.failToGet
        );
      } else {
        alert("您的浏览器不支持调用摄像头");
      }
    },
    // 关闭摄像头
    closedCamera() {
      this.$refs.capture.srcObject.getTracks()[0].stop();
    },
    getVideoStream(stream) {
      try {
        // chrome 新版本写法
        this.$refs.capture.srcObject = stream;
      } catch (error) {
        // chrome 旧版本写法
        this.captureSrc = window.URL && window.URL.createObjectURL(stream);
      }
    },
    failToGet(err) {
      console.log("error：", err);
    },
    screenShot() {
      // 创建画布绘制上下文
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.$refs.capture, 0, 0, 531, 395);
      //把当前canvas转化为base64
      const basePath = canvas.toDataURL("image/jpeg");
      console.log(this.$store.getters.name)
      let faceData={
        imgUrl: basePath,
        picName: this.$store.getters.name,
        stu_id: this.$store.getters.user_id,
      }
      console.log(faceData)
      // 发送到服务端人脸识别校验
      stuFaceMatched(faceData).then(respon=>{
        console.log(respon)
        this.msgSuccess(respon.message)

      })
    },








    /** 提交按钮 */
    /** 删除按钮操作 */
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
