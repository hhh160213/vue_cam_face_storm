<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" v-permission="['system:stuinfo:query']">
      <el-form-item label="用户帐号" prop="role_name">
        <el-input
          v-model="queryParams.stu_name"
          placeholder="请输入学生姓名"
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
          v-permission="['system:stuinfo:del']"
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
        >查看我的教师
        </el-button>
      </el-col>


    </el-row>

    <!--    学生个人信息的表格-->
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column label="编号" prop="stu_id" width="90"/>
      <el-table-column label="用户帐号" prop="stu_name" width="90"/>
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
      <el-table-column label="邮箱" prop="stu_email" width="70"/>
      <el-table-column label="手机号" prop="stu_mobile" width="140"/>
      <el-table-column label="身份证" prop="stu_idcard" width="180"/>
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
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">


          <el-button
            v-permission="['system:stuinfo:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改学生个人信息
          </el-button>
          <el-button
            v-permission="['system:stuinfo:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdatePwd(scope.row)"
          >修改学生密码
          </el-button>


          <el-button
            v-permission="['system:stuinfo:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateImage(scope.row)"
          >修改/上传图片
          </el-button>



        </template>
      </el-table-column>
    </el-table>

    <!--    查看学生的个人教师-->
    <el-table v-loading="loading" :data="teaList" @selection-change="handleSelectionChange" style="margin-top: 5%"
              v-if="noseetea">
      <el-table-column label="编号" prop="tea_id" width="90"/>
      <el-table-column label="用户帐号" prop="tea_name" width="90"/>
      <el-table-column label="年龄" prop="tea_age" width="70"/>
      <!--            <el-table-column-->
      <!--              prop="stu_pic"-->
      <!--              label="图片"-->
      <!--              width="180">-->
      <!--              <template slot-scope="scope">-->
      <!--                <img :src="scope.row.stu_pic" style="width:100px;height:50px;"/>-->
      <!--              </template>-->
      <!--            </el-table-column>-->
      <el-table-column label="性别" prop="tea_sex" width="70"/>
      <el-table-column label="手机号" prop="tea_mobile" width="140"/>
      <el-table-column label="身份证" prop="tea_idcard" width="180"/>
      <el-table-column label="户籍" prop="tea_oriplace" width="80"/>
      <el-table-column label="宿舍楼" prop="tea_dormitory" width="80"/>


      <el-table-column label="修改时间" align="center" prop="update_time" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time ? parseTime(scope.row.update_time) : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="create_time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改学生个人信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" label-width="80px">


        <el-form-item label="年龄" prop="stu_age" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_age" placeholder="请输入年龄"/>
        </el-form-item>

        <el-form-item label="性别" prop="stu_sex" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_sex" placeholder="请输入性别"/>
        </el-form-item>

        <el-form-item label="邮箱" prop="stu_email" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_email" placeholder="请输入邮箱"/>
        </el-form-item>


        <el-form-item label="手机号" prop="stu_mobile" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_mobile" placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item label="身份证" prop="stu_idcard" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_idcard" placeholder="请输入身份证"/>
        </el-form-item>

        <el-form-item label="户籍" prop="stu_oriplace" v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_oriplace" placeholder="请输入户籍"/>
        </el-form-item>

        <el-form-item label="住宿楼" prop="stu_dormitory"
                      v-if="form.action !== 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-input v-model="form.stu_dormitory" placeholder="请输入住宿楼"/>
        </el-form-item>


        <el-form-item label="修改图片" prop="stu_pic" v-if="form.action === 'upload-image'&& form.action !== 'edit-pwd'&&form.action !== 'email-pwd'">
          <el-upload drag action="http://127.0.0.1:8002/stu/uploadimage" multiple list-type="picture"
                     class="image-uploader"
                     :data="uploadData"
                     :show-file-list="false"
                     :on-success="getAvatarSuccess"
                     :before-upload="beforeAvatarUpload"

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
            v-permission="['system:stuinfo:forget']"
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



      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!--    学生修改密码弹框-->

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import {getstuInfo, listUser, updateImage, updatestudent, stueditpwd} from '@/api/present/stuapi'
import {delUser, sendEmail} from '@/api/system/user'
import {MessageBox} from 'element-ui'
import store from '../../../store'
import axios from "axios";
import {updatePwd} from "@/api/system/user";

export default {
  name: 'stu',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  filters: {
    mergeRoles(roles) {
      const role_names = []
      roles.forEach(item => {
        role_names.push(item.role_name)
      })
      return role_names.join(' | ')
    }
  },
  data() {

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
        mystu_id: 0
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
    //上传文件之后回调
    getAvatarSuccess(res, file, filelist) {
      // res是响应数据 file是文件信息
      this.avatar = res.stu_pic
      console.log(res)
      this.msgSuccess(res.message)
      this.open = false
      this.getList()


    },
    //上传之前调用的函数
    beforeAvatarUpload(file) {
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


    /** 查询用户列表 */
    getList() {
      if (this.$store.getters.roles[0] === '学生') {
        console.log('如果是学生打印vuex的id-------------')
        console.log(this.$store.getters.user_id)


        // this.queryParams.stu_name = this.$store.getters.name
        this.queryParams.stu_id = this.$store.getters.user_id

        getstuInfo(this.queryParams).then(
          response => {
            console.log('打印获取到学生个人信息以后的data---------------------')
            console.log(response)
            console.log('打印获取到学生个人信息以后的教师个人信息---------------------')
            console.log(response.data[0].teainfos)
            this.uploadData.mystu_id = response.data[0].stu_id
            this.userList = response.data
            this.teaList = response.data[0].teainfos
            this.total = response.data.length
            this.loading = false
          }
        )
      } else {
        this.queryParams.stu_name = undefined
        this.queryParams.stu_id = undefined
        listUser(this.queryParams).then(
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
      if (this.queryParams.stu_name === '') {
        this.queryParams.stu_name = undefined
      }
      if (this.queryParams.stu_id === 0) {
        this.queryParams.stu_id = undefined
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
        stu_id: undefined,
        stu_name: undefined,
        password: undefined,
        repassword: undefined

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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      // this.getListRole()
      this.open = true
      this.title = '添加用户'
    },


    //查看我的教师
    handlelooktea() {
      this.noseetea = !this.noseetea

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset()
      // this.getListRole()
      console.log('打印修改学生信息的row-----------------------')
      console.log(row)
      this.form = {
        stu_id: row.stu_id,
        stu_name: row.stu_name,
        // stu_pic: row.stu_pic,
        stu_age: row.stu_age,
        stu_sex: row.stu_sex,
        stu_email: row.stu_email,
        stu_mobile: row.stu_mobile,
        stu_idcard: row.stu_idcard,
        stu_oriplace: row.stu_oriplace,
        stu_dormitory: row.stu_dormitory,
      }
      this.open = true
      this.title = '修改学生'
    },

    /** 修改密码按钮操作 */
    handleUpdatePwd(row) {
      // console.log('打印修改学生密码row的该行数据data----------------------')
      // console.log(row)
      // this.reset()
      this.form = {
        stu_id: row.stu_id,
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
        stu_id: this.$store.getters.user_id,
        password: undefined,
        repassword: undefined,
        email_pwd:undefined,
        action: 'email-pwd'
      }
      this.open = true
      this.title = '通过邮箱修改密码'
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

    /** 修改图片按钮操作 */
    handleUpdateImage(row) {
      // this.reset()
      this.form = {
        // stu_id: row.stu_id,
        // stu_pic: row.stu_pic,
        action: 'upload-image'
      }
      this.open = true
      this.title = '修改学生图片'
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    getFile(file, fileList) {

      updateImage(this.form.stu_id, file.raw).then(response => {
        this.msgSuccess(response.message)
        this.open = false
        this.getList()
      })

    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.action !== 'edit-pwd' && this.form.action !== 'upload-image'&& this.form.action !== 'email-pwd') {
            updatestudent(this.form).then(response => {
              if (this.form.stu_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          }
          if (this.form.action === 'edit-pwd') {
            stueditpwd(this.form).then(response => {
              if (this.form.stu_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
            return false
          }

       if (this.form.action === 'email-pwd') {
            stueditpwd(this.form).then(response => {
              if (this.form.stu_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
            return false
          }


          // else {
          //   addUser(this.form).then(response => {
          //     this.msgSuccess(response.message)
          //     this.open = false
          //     this.getList()
          //   })
          // }
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
    },
    handleForgetPwd(row) {
      this.$confirm('此操作将会往你的邮箱"' + this.$store.getters.user_email + '"发送一条邮件,是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let upemail = {

          email: this.$store.getters.user_email,
          stu_id:this.$store.getters.user_id,

        }
        console.log(upemail)
        sendEmail(upemail).then(response => {
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
    }
    /** 忘记密码操作 */
    // handleForgetPwd(row) {
    //
    //
    //   console.log('打印忘记密码的该行数据data----------------------')
    //   console.log(row)
    //   console.log(this.form)
    //   console.log('打印vuex中存储的邮箱')
    //   // send_stu_email = this.$store.getters.user_email
    //   // console.log(send_stu_email)
    //   this.$confirm('此操作将会往你的邮箱"' + this.$store.getters.user_email + '"发送一条邮件,是否继续?', '警告', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async () => {
    //     let updata = {email: this.$store.getters.user_email}
    //     console.log(updata)
    //     let {data: res} = await  this.$axios.post('http://localhost:8002/user/sendmail',updata)
    //     this.msgSuccess('删除成功')
    //   }).catch(() => {
    //     this.msgSuccess('取消删除')
    //   });
    // }


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
