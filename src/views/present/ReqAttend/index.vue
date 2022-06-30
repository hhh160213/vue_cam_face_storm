<template>
  <div class="app-container">

    <!--    学生查看签到请求-->
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column label="发起人" align="center" prop="user_nick_name" width="70"/>
      <el-table-column label="签到方式" align="center" prop="attendTypeCheck" width="120"/>
      <el-table-column label="截止时间" align="center" prop="dead_time" width="200"/>
      <el-table-column label="位置范围" align="center" prop="reasonlocation" width="200"/>


      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-s-promotion"
            @click="handleAttendRow(scope.row)"
          >去签到
          </el-button>


        </template>
      </el-table-column>
    </el-table>


    <!--    展示地图点选的open选择地图的弹框-->
    <el-dialog :title="maptitle" :visible.sync="ifMapOpen" width="800px">

      <iframe id="mapPage" width="100%" height="600px" frameborder="0"
              src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=
JMFPB&referer=unikeyword"
      >
      </iframe>

      <el-button type="primary" @click="handleCheckCloseLocation" size="small" icon="el-icon-check">确认位置</el-button>


    </el-dialog>


    <!--    教师发起签到请求的弹框-->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发起人" prop="user_nick_name">
          <el-input v-model="form.user_nick_name" placeholder="请输入发起人" disabled/>
        </el-form-item>

        <el-form-item label="签到方式">
          <el-select v-model="form.attendTypeCheck" placeholder="请选择"
                     @change="selectCHange"
          >
            <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="具体位置" prop="reasonLocation" v-if="ifChooseLocSHow">
          <el-input v-model="form.reasonLocation" placeholder="具体位置" disabled/>
        </el-form-item>

        <el-form-item label="获取位置" prop="user_nick_name" v-if="ifChooseLocSHow">
          <el-button type="primary" @click="ChoosePosition" size="mini" icon="el-icon-search">选择</el-button>
        </el-form-item>

        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="form.startTime"
            value-format="HH:mm:ss"
            placeholder="开始时间"
          >
          </el-time-picker>
        </el-form-item>

        <el-form-item label="截止日期" prop="enddate">
          <el-date-picker
            v-model="form.enddate"
            value-format="yyyy-MM-dd"
            placeholder="结束日期"
          >
          </el-date-picker>

        </el-form-item>

        <el-form-item label="截止时间" prop="endTime">
          <el-time-picker
            v-model="form.endTime"
            value-format="HH:mm:ss"
            placeholder="截止时间"
          >
          </el-time-picker>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <pagination
      :total="total"
      :page="queryParams.page"
      :limit="queryParams.limit"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TencentMap from '@/components/TencentMap'
import Pagination from '@/components/Pagination'

import { stuGetTeaAttend ,stuJudgeIfEXIST} from '@/api/present/stuapi'
import { MessageBox } from 'element-ui'
import store from '../../../store'
import axios from 'axios'
import { sendEmail } from '@/api/system/user'
import { stueditpwd } from '@/api/present/stuapi'
import moment from 'moment'

let globalloc
window.addEventListener('message', function(event) {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  globalloc = event.data
  if (globalloc && globalloc.module === 'locationPicker') {
    console.log('globalloc', globalloc)
  }
}, false)

export default {

  name: 'tea',
  components: {
    TencentMap,
    Pagination
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  data() {

    return {
      noseetea: false,
      // ifstudent:this.$store.getters.name,
      ifstudent: false,
      avatar: '',
      liststu_id: 0,

      ifChooseLocSHow: false,
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
      stuList: [],
      // 弹出层标题
      title: '',
      maptitle: '',
      // 是否显示弹出层
      open: false,
      ifMapOpen: false,
      // 角色
      // 查询参数
      queryParams: {
        stu_name: '',
        tea_name: '',
        tea_id: 0,
        stu_nick_name: '',
        page:1,
        limit:5,
      },
      // 表单参数
      form: {
        tea_id: this.$store.getters.user_id,
        user_name: this.$store.getters.tea_name,
        user_nick_name: this.$store.getters.user_nick_name,
        endTime: undefined,
        enddate: undefined,
        startTime: undefined,
        startDate: undefined,
        attendTypeCheck: 0,
        reasonLocation: undefined,
        LongtiTude: undefined,
        LatiTude: undefined,
        options: [
          {
            value: 0,
            label: '人脸识别签到'
          },
          {
            value: 1,
            label: '地理位置签到'
          }

        ]

      },

      //教师添加学生的表单
      addstuform: {}

    }
  },
  created() {

  },
  mounted() {
    this.getList()

  },
  methods: {

    /** 查询教师发起的签到记录列表 */
    getList() {
      if (this.$store.getters.roles[0] === '学生') {
        console.log('如果是教师打印vuex的id')
        console.log(this.$store.getters.user_id)

        // this.queryParams.stu_name = this.$store.getters.name
        this.queryParams.stu_id = this.$store.getters.user_id

        stuGetTeaAttend(this.queryParams).then(
          response => {
            console.log(response)
            this.userList = response.data.Arrdata
            this.total = response.data.total
            this.loading = false
          }
        )
      }

      this.loading = true

    },

    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([])
      }
      this.form = {
        tea_id: undefined,
        tea_name: undefined,
        tea_age: undefined,
        tea_pic: undefined,
        tea_sex: undefined,
        tea_mobile: undefined,
        tea_idcard: undefined,
        tea_oriplace: undefined,
        tea_dormitory: undefined,
        password: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.user_id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    //按钮发生变化
    selectCHange(event, item) {
      this.ifChooseLocSHow = event === 1

    },

    //当行签到请求
    handleAttendRow(row) {
      console.log('handleAttendRow', row)
      let tablesuffix = moment(row.dead_time).unix()
      let nowsuffix = moment().unix()
      if (nowsuffix<tablesuffix)
      {

        stuJudgeIfEXIST({stu_id:this.$store.getters.user_id,ATTENDID:row.sendattends_id}).then(repp=>{
          if (repp.code===20000)
          {


            if (row.attendTypeCheck === '人脸识别签到') {
              this.$router.push({
                name: 'face',
                params: {
                  ATTENDID:row.sendattends_id


                }
              })

            }
            if (row.attendTypeCheck === '地理位置签到') {
              this.$router.push({
                name: 'loca',
                params: {
                  LATI: row.reasonLati,
                  LONGTI: row.reasonLongTi,
                  ATTENDID:row.sendattends_id
                }
              })
            }
          }
          else {
            this.msgError(repp.message)
          }

        })



      }
      else {
      //  超过了时间
        this.msgError('签到截止时间已经过期，不允许再进行签到')

      }




    },

    /** 新增按钮操作 */
    handleAdd() {
      this.form = {
        tea_id: this.$store.getters.user_id,
        user_name: this.$store.getters.name,
        user_nick_name: this.$store.getters.user_nick_name,
        endTime: undefined,
        enddate: undefined,
        startTime: undefined,
        startDate: undefined,
        attendTypeCheck: undefined,
        reasonLocation: undefined,
        LongtiTude: undefined,
        LatiTude: undefined,
        options: [
          {
            value: 0,
            label: '人脸识别签到'
          },
          {
            value: 1,
            label: '地理位置签到'
          }

        ]
      }

      this.open = true
      this.title = '发起签到请求'
    },

    /** 选择按钮操作 */
    ChoosePosition() {
      this.ifMapOpen = true
      this.maptitle = '选择位置'
    },

    handleCheckCloseLocation() {
      console.log(globalloc.poiaddress)
      this.form.reasonLocation = globalloc.poiaddress + globalloc.poiname
      this.form.LongtiTude = globalloc.latlng.lng
      this.form.LatiTude = globalloc.latlng.lat
      this.ifMapOpen = false
      console.log(this.from)

    },

    //重新登陆
    reLogin() {
      MessageBox.confirm('修改成功，请重新登录', '重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).finally(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    },

    /** 分页改变 */
    handlePageChange(arg) {
      this.queryParams.page = arg.page
      this.queryParams.limit = arg.limit
      this.getList()
    },


    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let httpData = {
            tea_id: this.form.tea_id,
            user_name: this.form.user_name,
            user_nick_name: this.form.user_nick_name,
            timeSel: this.form.startTime,
            endtimeSel: this.form.endTime,
            dateSel: this.form.startDate,
            enddateSel: this.form.enddate,
            attendTypeCheck: this.form.options[this.form.attendTypeCheck].label,
            reasonlocation: this.form.reasonLocation,
            reasonLati: this.form.LatiTude,
            reasonLongTi: this.LongtiTude
          }
          console.log(httpData)

          // //发送请求
          if (this.form.tea_id !== undefined) {
            TeaAddReqAttend(httpData).then(response => {
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          }

        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const user_ids = row.user_id ? [row.user_id] : this.ids
      this.$confirm('是否确认删除用户编号为"' + user_ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delUser(user_ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {
      })
    }
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

/*@media  \0 screen {
  div{
    color: red;
  }
}*/

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
