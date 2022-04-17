<template>
  <div class="app-container">
<!--    <el-form ref="queryForm" :model="queryParams" :inline="true">-->
<!--      <el-form-item label="用户帐号" prop="role_name">-->
<!--        <el-input-->
<!--          v-model="queryParams.user_name"-->
<!--          placeholder="请输入用户帐号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="状态" prop="status">-->
<!--        <el-select-->
<!--          v-model="queryParams.status"-->
<!--          placeholder="用户状态"-->
<!--          clearable-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--        >-->
<!--          <el-option key="-1" label="全部" :value="undefined"/>-->
<!--          <el-option key="1" label="启用" :value="1"/>-->
<!--          <el-option key="0" label="停用" :value="0"/>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button v-permission="['system:user:query']" type="primary" icon="el-icon-search" size="mini"-->
<!--                   @click="handleQuery">搜索-->
<!--        </el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          v-permission="['system:user:add']"-->
      <!--          type="primary"-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--        >新增-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      -->
      <el-col :span="1.5">
        <el-button
          v-permission="['system:user:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAddsta"
        >新增教师
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          v-permission="['system:user:add']"
          type="primary"
          icon="el-icon-table-lamp"
          size="mini"
          @click="handleXls"
        >批量导入教师
        </el-button>
      </el-col>


      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          v-permission="['system:user:del']"-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--        >删除-->
      <!--        </el-button>-->
      <!--      </el-col>-->
    </el-row>

    <!--    表格显示部分-->
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="用户帐号" prop="user_name" width="120"/>
      <el-table-column label="用户邮箱" prop="user_email" width="120"/>
      <el-table-column label="用户姓名" prop="user_nick_name" width="120"/>
      <el-table-column label="角色" prop="role_name" :show-overflow-tooltip="true" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.roles|mergeRoles }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status ? 'success' : 'info'"
            disable-transitions
          >{{ scope.row.status ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permission="['system:user:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            :disabled="scope.row.roles[0].role_name=='管理员'"

            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-permission="['system:user:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            :disabled="scope.row.roles[0].role_name=='管理员'"


            @click="handleUpdatePwd(scope.row)"
          >修改密码
          </el-button>
          <el-button
            v-permission="['system:user:del']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            :disabled="scope.row.roles[0].role_name=='管理员'"


            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">


      <!--      添加教师弹框-->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">


        <el-form-item v-if="form.action === 'addteainfo'" label="教师帐号" prop="user_name">
          <el-input v-model="form.user_name" placeholder="请输入教师帐号"/>
        </el-form-item>

        <el-form-item v-if="form.action === 'addteainfo'" label="教师邮箱" prop="user_email">
          <el-input v-model="form.user_email" placeholder="输入邮箱可以找回密码"/>
        </el-form-item>


        <el-form-item v-if="form.action === 'addteainfo'" label="教师昵称" prop="user_nick_name">
          <el-input v-model="form.user_nick_name" placeholder="请输入教师真实姓名"/>
        </el-form-item>


        <!--        <el-form-item v-if="form.action === 'addteainfo'"label="教师密码" prop="password">-->
        <!--          <el-input v-model="form.password" type="password" placeholder="请输入用户密码"/>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item v-if="form.action === 'addteainfo'" label="确认密码" prop="repassword">-->
        <!--          <el-input v-model="form.repassword" type="password" placeholder="请再次输入用户密码"/>-->
        <!--        </el-form-item>-->


        <el-form-item v-if="form.action === 'addteainfo'" label="年龄" prop="tea_age">
          <el-input v-model="form.tea_age" type="text" placeholder="请输入教师年龄"/>
        </el-form-item>


        <el-form-item v-if="form.action === 'addteainfo'" label="性别" prop="tea_sex">
          <el-input v-model="form.tea_sex" type="text" placeholder="请输入教师性别"/>
        </el-form-item>

        <el-form-item v-if="form.action === 'addteainfo'" label="手机号" prop="tea_mobile">
          <el-input v-model="form.tea_mobile" type="text" placeholder="请输入教师手机号"/>
        </el-form-item>


        <el-form-item v-if="form.action === 'addteainfo'" label="身份证" prop="tea_idcard">
          <el-input v-model="form.tea_idcard" type="text" placeholder="请输入教师身份证"/>
        </el-form-item>


        <el-form-item v-if="form.action === 'addteainfo'" label="户籍" prop="tea_oriplace">
          <el-input v-model="form.tea_oriplace" type="text" placeholder="请输入教师户籍"/>
        </el-form-item>


        <el-form-item v-if="form.action === 'addteainfo'" label="住宿楼" prop="tea_dormitory">
          <el-input v-model="form.tea_dormitory" type="text" placeholder="请输入教师住宿楼"/>
        </el-form-item>


        <!--        批量添加教师信息-->
        <el-form-item label="上传xls" prop="tea_xls"
                      v-if="form.action === 'upload-xls'&&form.action!=='addteainfo'&&form.action!=='edit-tea'">
          <el-upload drag action="http://127.0.0.1:8002/tea/addteainfobyxls"
                     ref="upload"
                     class="image-uploader"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload"
                     :on-success="getAvatarSuccess">

            <i class="el-icon-upload"/>
            <div class="el-upload_text"><em>上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="请先下载模板" prop="tea_xls"
                      v-if="form.action === 'upload-xls'&&form.action!=='addteainfo'&&form.action!=='edit-tea'">

          <el-button
            type="primary"
            icon="el-icon-download"
            size="mini"
            @click="handleTempXls"
          >点击下载模板
          </el-button>


        </el-form-item>


        <!--        修改用户密码-->
        <el-form-item v-if="form.action !== 'addteainfo'&&form.action === 'edit-pwd'" label="原密码" prop="old_password">
          <el-input v-model="form.old_password" type="password" placeholder="请输入原用户密码"/>
        </el-form-item>


        <el-form-item v-if="form.action !== 'addteainfo'&&form.action === 'edit-pwd'" label="用户密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入用户密码"/>
        </el-form-item>
        <el-form-item v-if="form.action !== 'addteainfo'&&form.action === 'edit-pwd'" label="确认密码" prop="repassword">
          <el-input v-model="form.repassword" type="password" placeholder="请再次输入用户密码"/>
        </el-form-item>


        <!--        修改用户个人信息-->


        <el-form-item v-if="form.action !== 'edit-pwd'&&form.action !== 'addteainfo'&&form.action !== 'upload-xls' "
                      label="角色" prop="role_ids">
          <el-select v-model="form.role_ids" multiple placeholder="请选择角色" v-if="isadmin">
            <el-option
              v-for="item in roles"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.action !== 'edit-pwd'&&form.action !== 'upload-xls' &&form.action !== 'addteainfo' "
                      label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :key="1" :label="1" v-if="isadmin">开启</el-radio>
            <el-radio :key="0" :label="0" v-if="isadmin">停用</el-radio>
          </el-radio-group>
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
import {listUser, delUser, addUser, updateUser, updatePwd,ListPost} from '@/api/system/user'
import {addteaByUser} from '@/api/present/teaapi'
import {listRole} from '@/api/system/role'
import Pagination from '@/components/Pagination'

import {MessageBox} from 'element-ui'
import store from '../../../store'

export default {
  name: 'User',
  components: {Pagination},

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

      isadmin: true,
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
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 角色
      roles: [],
      // 查询参数
      queryParams: {
        user_name: '',
        status: 1,
        page: 1,
        limit: 5,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      // 表单校验
      rules: {
        user_name: [
          {required: true, message: '帐号不能为空', trigger: 'blur'},
        ],

        user_nick_name: [
          {required: true, message: '真实姓名不能为空', trigger: 'blur'},

        ],
        tea_age: [
          {required: true, message: '年龄不能为空', trigger: 'blur'},
          {pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/, message: '帐号只能字母数字组成', trigger: 'blur'}

        ],

        tea_sex: [
          {required: true, message: '性别不能为空', trigger: 'blur'},

        ],
    tea_oriplace: [
          {required: true, message: '户籍不能为空', trigger: 'blur'},

        ],
         tea_dormitory: [
          {required: true, message: '宿舍不能为空', trigger: 'blur'},

        ],



        tea_mobile: [
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          },
          {required: true, message: '手机号格式不正确', trigger: 'blur'},
        ],
        tea_idcard: [
          {
            pattern: /^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/,
            message: '身份证格式不正确',
            trigger: 'blur'
          },
          {required: true, message: '身份证格式不正确', trigger: 'blur'},
        ],


        user_email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {
            pattern:  /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
            message: '邮箱格式不正确！',
            trigger: 'blur'
          }
        ],


        role_ids: [
          {type: 'array', required: true, message: '请选择角色', trigger: 'change'}
        ],


        old_password: [{validator: validateOldPwd, trigger: 'change'}],
        password: [{validator: validatePwd, trigger: 'change'}],
        repassword: [{validator: validateRePwd, trigger: 'change'}]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      // if (this.queryParams.user_name === '') {
      //   this.queryParams.user_name = undefined
      // }
      ListPost({page:this.queryParams.page,limit:this.queryParams.limit}).then(
        response => {
          console.log(response)
          console.log(response.data)
          let newarr = response.data.user_roles.map(item => {
            if (item.roles[0].role_name === '管理员') {


              console.log('我是管理员')
            }


          })
          console.log(response.data[0])
          this.userList = response.data.user_roles
          this.total = response.data.total
          this.loading = false
        }
      )
    },
    getListRole() {
      listRole().then(response => {
        console.log('获取用户角色的时候调用')
        console.log(response)
        this.roles = response.data.roles
      })
    },

    //提交submit  upload按钮
    Onsubmit() {
      this.$refs.upload.submit();
    },
    submitUpload() {
      this.$refs.upload.submit();
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
        user_id: undefined,
        user_name: undefined,
        user_email: undefined,
        status: 1,
        role_ids: [],
        password: undefined,
        repassword: undefined
      }
      this.resetForm('form')
    },
    //上传xls之前回调函数
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
    },


    //批量导入教师需要下载的模板
    handleTempXls() {
      window.open('http://localhost:8002/public/xlstempfile/tea_template.xls'
      )


    },

    //上传文件之后回调
    getAvatarSuccess(res, file, filelist) {
      // res是响应数据 file是文件信息
      console.log(res)
      this.msgSuccess(res.message)
      this.open = false
      this.getList()


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
      this.getListRole()
      this.open = true
      this.title = '添加用户'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log('修改按钮的row')

      console.log(row)

      this.reset()
      this.getListRole()
      this.form = {
        user_id: row.user_id,
        // user_name: row.user_name,
        // user_email: row.user_email,
        // user_nick_name: row.user_nick_name,
        status: row.status
      }
      const role_ids = row.roles.map(item => {
        return item.role_id
      })
      this.$set(this.form, 'role_ids', role_ids)
      this.open = true
      this.title = '修改用户'
    },
    /** 修改密码按钮操作 */
    handleUpdatePwd(row) {
      console.log('修改密码按钮的row')

      console.log(row)
      this.reset()
      this.form = {
        user_id: row.user_id,
        action: 'edit-pwd'
      }
      this.open = true
      this.title = '修改密码'
    },

    /** 新添加教师操作 */
    handleAddsta() {
      this.reset()
      this.form = {
        user_id: undefined,
        user_name: undefined,
        user_email: undefined,
        user_nick_name: undefined,
        tea_age: undefined,
        tea_sex: undefined,
        tea_mobile: undefined,
        tea_idcard: undefined,
        tea_oriplace: undefined,
        tea_dormitory: undefined,
        password: '123',
        repassword: '123',
        role_name: '教师',
        role_id: 4,
        action: 'addteainfo',
        status: 1,
      }
      this.open = true
      this.title = '添加教师'
    },

    /** 批量导入xls教师按钮操作 */
    handleXls() {
      // this.getListRole()
      this.form = {
        action: 'upload-xls',
        // tea_id: this.$store.getters.user_id,
        // tea_id: undefined,
        // tea_name: undefined,
        // tea_age: undefined,
        // tea_pic: undefined,
        // tea_sex: undefined,
        // tea_mobile: undefined,
        // tea_idcard: undefined,
        // tea_oriplace: undefined,
        // tea_dormitory: undefined,
        // tea_email: undefined,
        // tea_nick_name: undefined,
        // password: '123',

      }
      this.open = true
      this.title = '批量添加教师'
    },
    /** 分页改变 */
    handlePageChange(arg) {
      this.queryParams.page = arg.page
      this.queryParams.limit = arg.limit
      this.getList()
    },

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
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.action === 'edit-pwd' && this.form.action !== 'addteainfo') {
            //修改密码的接口
            updatePwd(this.form.user_id, this.form).then(response => {
              if (this.form.user_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
            return false
          }
          if (this.form.user_id !== undefined && this.form.action !== 'addteainfo' && this.form.action !== 'edit-pwd') {
            //更新用户的接口
            updateUser(this.form.user_id, this.form).then(response => {
              if (this.form.user_id === this.$store.getters.user_id) {
                this.reLogin()
              }
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          }


          if (this.form.action === 'addteainfo' && this.form.action !== 'edit-pwd' && this.form.user_id === undefined) {
            //添加教师用户的接口
            addteaByUser(this.form).then(response => {
              this.msgSuccess(response.message)
              this.open = false
              this.getList()
            })
          }


          // else {
          //   //添加用户的接口
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
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-select--default {
  width: 100%;
}
</style>
