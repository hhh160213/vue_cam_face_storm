<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" v-permission="['system:stuinfo:query']">

      <el-form-item label="学生姓名" prop="role_name">
        <el-input
          v-model="queryParams.stu_nick_name"
          placeholder="请输入学生姓名(还没做)"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button v-permission="['system:stuinfo:query']" type="primary" icon="el-icon-search" size="mini"
                   @click="handleQuery">搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">


      <el-col :span="1.5">
        <el-button
          v-permission="['system:stuinfo:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增学生
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          v-permission="['system:teainfo:add']"
          type="primary"
          icon="el-icon-table-lamp"
          size="mini"
          @click="handleXls"
        >批量导入学生
        </el-button>
      </el-col>


      <el-col :span="1.5">
        <el-button
          v-permission="['system:teainfo:del']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permission="['system:stuinfo:look']"
          type="primary"
          icon="el-icon-info"
          size="mini"
          @click="handlelooktea"
        >查看我的学生
        </el-button>
      </el-col>
    </el-row>
    <!--    教师个人信息的表格-->
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column label="教师姓名" prop="tea_nick_name" width="90"/>
      <el-table-column label="年龄" prop="tea_age" width="70"/>

      <el-table-column label="邮箱" prop="tea_email" width="190"/>

      <el-table-column label="性别" prop="tea_sex" width="70"/>
      <el-table-column label="手机号" prop="tea_mobile" width="140"/>
      <el-table-column label="身份证" prop="tea_idcard" width="180"/>
      <el-table-column label="户籍" prop="tea_oriplace" width="80"/>
      <el-table-column label="宿舍楼" prop="tea_dormitory" width="80"/>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button
            v-permission="['system:teainfo:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改教师个人信息
          </el-button>
          <el-button
            v-permission="['system:teainfo:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdatePwd(scope.row)"
          >修改教师密码
          </el-button>





        </template>
      </el-table-column>
    </el-table>
    <!--    查看教师的学生-->
    <el-drawer
      close-on-press-escape
      show-close
      title="查看学生"
      :visible.sync="noseetea"
      direction="rtl"
      size="45%">
    <el-table v-loading="loading" :data="stuList" @selection-change="handleSelectionChange" style="margin-top: 5%"
             >
      <el-table-column label="学生姓名" prop="stu_nick_name" width="90"/>
      <el-table-column label="年龄" prop="stu_age" width="70"/>
      <el-table-column
        prop="stu_pic"
        label="图片"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.stu_pic" style="width:100px;height:50px;"/>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="stu_sex" width="70"/>
      <el-table-column label="手机号" prop="stu_mobile" width="140"/>
      <el-table-column label="身份证" prop="stu_idcard" width="180"/>
      <el-table-column label="邮箱" prop="stu_email" width="180"/>
      <el-table-column label="户籍" prop="stu_oriplace" width="80"/>
      <el-table-column label="宿舍楼" prop="stu_dormitory" width="80"/>


<!--      <el-table-column label="修改时间" align="center" prop="update_time" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.update_time ? parseTime(scope.row.update_time) : '&#45;&#45;' }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="创建时间" align="center" prop="create_time" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.create_time) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    </el-drawer>

    <!--    教师添加学生的弹框-->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" >
        <!--        教师添加学生的弹框-->
        <el-form-item label="学生账号" prop="stu_name"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_name" placeholder="请输入学生账号"/>
        </el-form-item>
        <el-form-item label="学生姓名" prop="stu_nick_name"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_nick_name" placeholder="请输入学生姓名"/>
        </el-form-item>

        <el-form-item label="年龄" prop="stu_age"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_age" placeholder="请输入年龄"/>
        </el-form-item>

        <el-form-item label="性别" prop="stu_sex"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_sex" placeholder="请输入性别"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="stu_email"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_email" placeholder="请输入邮箱"/>
        </el-form-item>

        <el-form-item label="手机号" prop="stu_mobile"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_mobile" placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item label="身份证" prop="stu_idcard"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_idcard" placeholder="请输入身份证"/>
        </el-form-item>

        <el-form-item label="户籍" prop="stu_oriplace"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_oriplace" placeholder="请输入户籍"/>
        </el-form-item>

        <el-form-item label="住宿楼" prop="stu_dormitory"
                      v-if="form.action !== 'edit-tea'&&form.action==='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.stu_dormitory" placeholder="请输入住宿楼"/>
        </el-form-item>

        <!--        教师修改个人信息-->
        <el-form-item label="年龄" prop="tea_age"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_age" placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="昵称" prop="tea_nick_name"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_nick_name" placeholder="请输入昵称"/>
        </el-form-item>

        <el-form-item label="性别" prop="tea_sex"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_sex" placeholder="请输入性别"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="tea_email"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_email" placeholder="请输入邮箱"/>
        </el-form-item>

        <el-form-item label="手机号" prop="tea_mobile"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_mobile" placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item label="身份证" prop="tea_idcard"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_idcard" placeholder="请输入身份证"/>
        </el-form-item>

        <el-form-item label="户籍" prop="tea_oriplace"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_oriplace" placeholder="请输入户籍"/>
        </el-form-item>

        <el-form-item label="住宿楼" prop="tea_dormitory"
                      v-if="form.action === 'edit-tea'&&form.action!=='add-student'&&form.action !== 'upload-xls'">
          <el-input v-model="form.tea_dormitory" placeholder="请输入住宿楼"/>
        </el-form-item>



<!--        批量添加学生信息-->
        <el-form-item label="上传xls" prop="stu_xls"
                      v-if="form.action === 'upload-xls'&&form.action!=='add-student'&&form.action!=='edit-tea'&&form.action!=='upload-image'">
          <el-upload drag action="/stu/addbyxls"
                     ref="upload"
                     class="image-uploader"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload"
                     :on-success="getAvatarSuccess">

            <i class="el-icon-upload"/>
            <div class="el-upload_text"><em>上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="下载模板" prop="stu_xls"
                      v-if="form.action === 'upload-xls'&&form.action!=='add-student'&&form.action!=='edit-tea'&&form.action!=='upload-image'">

          <el-button
            type="primary"
            icon="el-icon-download"
            size="mini"
            @click="handleTempXls"
          >请先下载模板
          </el-button>


        </el-form-item>

<!--        修改教师图片信息-->
        <el-form-item label="修改图片" prop="tea_pic" v-if="form.action === 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-upload drag action="tea/uploadimage" multiple list-type="picture"
                     class="image-uploader"
                     :data="uploadData"
                     :show-file-list="false"
                     :on-success="getAvatarSuccess"
                     :before-upload="beforeTeaAvatarUpload"

          >
            <i class="el-icon-upload"/>
            <div class="el-upload_text"><em>上传</em></div>
          </el-upload>
        </el-form-item>
        <!--        修改学生密码-->
        <el-form-item v-if="form.action === 'edit-pwd'&& form.action !== 'upload-image'&&form.action !== 'email-pwd'" label="原密码"
                      prop="old_password">
          <el-input v-model="form.old_password" type="password" placeholder="请输入原用户密码"/>
        </el-form-item>
        <el-form-item v-if="form.action === 'edit-pwd'&& form.action !== 'upload-image'&&form.action !== 'email-pwd'" label="用户密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入用户密码"/>
        </el-form-item>
        <el-form-item v-if="form.action === 'edit-pwd'&& form.action !== 'upload-image'&&form.action !== 'email-pwd'" label="确认密码" prop="repassword">
          <el-input v-model="form.repassword" type="password" placeholder="请再次输入用户密码"/>
        </el-form-item>



        <el-form-item v-if="form.action === 'edit-pwd'&& form.action !== 'upload-image'&&form.action !== 'email-pwd'" label="忘记密码"
                      prop="forgetpassword">
          <el-button
            v-permission="['system:teainfo:forget']"
            type="info"
            icon="el-icon-message"
            size="mini"
            @click="handleForgetPwd"
          >忘记密码？
          </el-button>

        </el-form-item>
        <!--        通过邮箱验证码的方式重置密码-->
        <el-form-item v-if="form.action === 'email-pwd'&& form.action !== 'upload-image'&& form.action !== 'edit-pwd'" label="验证码"
                      prop="email_pwd">
          <el-input v-model="form.email_pwd" type="text" placeholder="用户邮箱接收到的验证码"/>
        </el-form-item>
        <el-form-item v-if="form.action === 'email-pwd'&& form.action !== 'upload-image'&& form.action !== 'edit-pwd'"  label="用户密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入用户密码"/>
        </el-form-item>
        <el-form-item v-if="form.action === 'email-pwd'&& form.action !== 'upload-image'&& form.action !== 'edit-pwd'" label="确认密码" prop="repassword">
          <el-input v-model="form.repassword" type="password" placeholder="请再次输入用户密码"/>
        </el-form-item>


        <!--        </el-form>-->

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {addstu, geteainfo, listtea, updatetea,Teaeditpwd,sendTEaEmail} from '@/api/present/teaapi'
import {MessageBox} from 'element-ui'
import store from '../../../store'
import axios from "axios";
import {sendEmail} from "@/api/system/user";
import {stueditpwd} from "@/api/present/stuapi";

export default {
  name: 'tea',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    // 验证密码
    const validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else if (value.length < 1) {
        callback(new Error('密码长度不能小于1'))
      } else {
        callback()
      }
    }
    // 验证密码
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 1) {
        callback(new Error('密码长度不能小于1'))
      } else {
        callback()
      }
    }
    // 二次验证密码
    const validateRePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      noseetea: false,
      // ifstudent:this.$store.getters.name,
      ifstudent: false,
      avatar: '',
      liststu_id: 0,

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
      // 是否显示弹出层
      open: false,
      // 角色
      // 查询参数
      queryParams: {
        stu_name: '',
        tea_name: '',
        tea_id: 0,
        stu_nick_name: ''
      },
      // 表单参数
      form: {},

      //教师添加学生的表单
      addstuform: {},

      // 表单校验
      rules: {
        stu_name: [
          {required: true, message: '帐号不能为空', trigger: 'blur'},
        ],

        stu_nick_name: [
          {required: true, message: '真实姓名不能为空', trigger: 'blur'},

        ],
        stu_age: [
          {required: true, message: '年龄不能为空', trigger: 'blur'},

        ],

        stu_sex: [
          {required: true, message: '性别不能为空', trigger: 'blur'},

        ],
        stu_oriplace: [
          {required: true, message: '户籍不能为空', trigger: 'blur'},

        ],
        stu_dormitory: [
          {required: true, message: '宿舍不能为空', trigger: 'blur'},

        ],



        stu_mobile: [
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          },
          {required: true, message: '手机号格式不正确', trigger: 'blur'},
        ],
        stu_idcard: [
          {
            pattern: /^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/,
            message: '身份证格式不正确',
            trigger: 'blur'
          },
          {required: true, message: '身份证格式不正确', trigger: 'blur'},
        ],


        stu_email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {
            pattern:  /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
            message: '邮箱格式不正确！',
            trigger: 'blur'
          }
        ],



        old_password: [{validator: validateOldPwd, trigger: 'change'}],
        password: [{validator: validatePwd, trigger: 'change'}],
        repassword: [{validator: validateRePwd, trigger: 'change'}]
      },

      uploadData: {
        //使用 vuex 将用户名放在了 state 中 便于存取
        name: this.$store.getters.name,
        mystu_id: this.$store.getters.user_id
      },


    }
  },
  created() {

  },
  mounted() {
    this.getList()


  },
  methods: {

    Onsubmit() {
      this.$refs.upload.submit();
    },
    //上传之前进行的回调函数
    beforeAvatarUpload(file) {
      //文件类型

      const isXlS =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      // const isLt2M = file.size / 1024 / 1024 < 2

        const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isXlS) {
        this.$message.error("您上传的格式有误,仅支持xls、xlsx格式的文件!");
      }
      if (!isLt10M) {
        this.$message.error('上xls文件大小不能超过 10MB!')
      }
      //返回 true 时进行请求上传

      return isXlS && isLt10M


      // this.filename = file.name;
    },

    //教师上传图片之前回调函数
    beforeTeaAvatarUpload(file){

      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      //返回 true 时进行请求上传
      return isJPG && isLt2M
    },

    //上传文件之后回调
    getAvatarSuccess(res, file, filelist) {
      // res是响应数据 file是文件信息
      console.log(res)
      this.msgSuccess(res.message)
      this.open = false
      this.getList()


    },


    /** 查询用户列表 */
    getList() {
      if (this.$store.getters.roles[0] === '教师') {
        console.log('如果是教师打印vuex的id')

        console.log(this.$store.getters.user_id)


        // this.queryParams.stu_name = this.$store.getters.name
        this.queryParams.tea_id = this.$store.getters.user_id

        geteainfo(this.queryParams).then(
          response => {
            console.log(response)

            console.log(response.data[0].stuinfos)
            this.uploadData.mystu_id = response.data[0].tea_id
            console.log(this.uploadData.mystu_id)
            this.userList = response.data
            this.stuList = response.data[0].stuinfos
            this.total = response.data.length
            this.loading = false
          }
        )
      } else {
        this.queryParams.tea_name = undefined
        this.queryParams.tea_id = undefined
        listtea(this.queryParams).then(
          response => {
            console.log(response)
            console.log(response.data)
            this.userList = response.data
            this.total = response.data.length
            this.loading = false
          }
        )


      }


      if (this.queryParams.stu_name === '') {
        this.queryParams.stu_name = undefined
      }
      if (this.queryParams.stu_id === 0) {
        this.queryParams.stu_id = undefined
      }

      this.loading = true


    },


    //获取单个学生信息
    getstuList() {

      // if (this.$store.getters.roles[0] === '学生') {
      //   console.log(this.liststu_id)
      // }

      this.loading = true
      if (this.queryParams.tea_name === '') {
        this.queryParams.tea_name = undefined
      }
      this.queryParams.tea_id = this.$store.getters.user_id

      geteainfo(this.queryParams.tea_id).then(
        response => {
          this.userList = response.data
          this.total = response.data.length
          this.loading = false
        }
      )
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
        password: undefined,
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

    //忘记密码闲邮箱发送信息弹框
    handleForgetPwd(row) {
      this.$confirm('此操作将会往你的邮箱"' + this.$store.getters.user_email + '"发送一条邮件,是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let upemail = {

          email: this.$store.getters.user_email,
          tea_id:this.$store.getters.user_id,

        }
        console.log(upemail)
        sendTEaEmail(upemail).then(response => {
          console.log(response)
          this.msgSuccess(response.message)
          this.open = false
          this.handleEmailPwd()
        }).catch(e => {
          console.log(e)
        })
      }).catch(function (e) {
        console.log(e)
      })
    },



    /** 修改密码按钮操作 */
    handleUpdatePwd(row) {

      this.form = {
        tea_id: row.tea_id,
        password: undefined,
        repassword: undefined,
        old_password: undefined,
        action: 'edit-pwd'
      }
      this.open = true
      this.title = '通过原密码修改密码'
    },


    /** 通过邮箱来修改 密码 */
    handleEmailPwd(row) {

      this.form = {
        tea_id: this.$store.getters.user_id,
        password: undefined,
        repassword: undefined,
        email_pwd:undefined,
        action: 'email-pwd'
      }
      this.open = true
      this.title = '教师通过邮箱修改密码'
    },

    /** 新增按钮操作 */
    handleAdd() {
      // this.getListRole()
      this.form = {
        action: 'add-student',
        tea_id: this.$store.getters.user_id,
        stu_id: undefined,
        stu_name: undefined,
        stu_age: undefined,
        stu_pic: undefined,
        stu_sex: undefined,
        stu_mobile: undefined,
        stu_idcard: undefined,
        stu_oriplace: undefined,
        stu_dormitory: undefined,
        stu_email: undefined,
        stu_nick_name: undefined,
        password: '123',

      }
      this.open = true
      this.title = '教师添加学生'
    },

    //下载xls模板进行的按钮操作
    handleTempXls(){
      window.open('/public/xlstempfile/stu_multiply_template.xls'
      )



    },
    /** 批量导入xls学生按钮操作 */
    handleXls() {
      // this.getListRole()
      this.form = {
        action: 'upload-xls',
        tea_id: this.$store.getters.user_id,
        stu_id: undefined,
        stu_name: undefined,
        stu_age: undefined,
        stu_pic: undefined,
        stu_sex: undefined,
        stu_mobile: undefined,
        stu_idcard: undefined,
        stu_oriplace: undefined,
        stu_dormitory: undefined,
        stu_email: undefined,
        stu_nick_name: undefined,
        password: '123',

      }
      this.open = true
      this.title = '教师批量添加学生'
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

    //查看我的教师
    handlelooktea() {
      this.noseetea = !this.noseetea

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset()
      // this.getListRole()
      console.log('打印教师修改当前行教师数据')
      console.log(row)
      this.form = {
        // tea_id: row.tea_id,
        action: 'edit-tea',
        tea_id: row.tea_id,
        tea_name: row.tea_name,
        tea_nick_name: row.tea_nick_name,
        // tea_pic: row.tea_pic,
        tea_age: row.tea_age,
        tea_email: row.tea_email,
        tea_sex: row.tea_sex,
        tea_mobile: row.tea_mobile,
        tea_idcard: row.tea_idcard,
        tea_oriplace: row.tea_oriplace,
        tea_dormitory: row.tea_dormitory,
      }
      this.open = true
      this.title = '修改教师个人信息'
    },
    /** 修改图片按钮操作 */
    handleUpdateImage(row) {
      // this.reset()
      this.form = {
        tea_id: row.stu_id,
        tea_pic: row.stu_pic,
        action: 'upload-image'
      }
      this.open = true
      this.title = '修改教师图片'
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {

          //更新教师信息的方法
          if (this.form.tea_id !== undefined && this.form.action === 'edit-tea') {
            updatetea(this.form).then(response => {

              this.msgSuccess(response.message)
              this.open = false
              this.reLogin()

              this.getList()
            })
          }
          //添加学生点方法
          if (this.form.action === 'add-student' && this.form.action !== 'edit-tea') {
            addstu(this.form).then(response => {
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          }
          //教师通过原密码修改密码的方法
          if (this.form.action === 'edit-pwd') {
            Teaeditpwd(this.form).then(response => {
              if (this.form.tea_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
            return false
          }
          //教师通过邮箱重置密码算方法
          if (this.form.action === 'email-pwd') {
            Teaeditpwd(this.form).then(response => {
              if (this.form.tea_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
            return false
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
      }).then(function () {
        return delUser(user_ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function () {
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
