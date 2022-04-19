<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permission="['system:log:del']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="logList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column label="签到时间" prop="create_time" width="150"  align="center" />
      <el-table-column label="签到方式" prop="attend_type" width="150" align="center" />
      <el-table-column label="签到地点" prop="actualLoctaion" width="300" align="center" />
      <el-table-column label="学生姓名" prop="stu_nick_name" width="150" align="center" />
    </el-table>
    <pagination
      :total="total"
      :page="queryParams.page"
      :limit="queryParams.limit"
      @pagination="handlePageChange"
    />
  </div>
</template>

<script>
import { stuGetAttendRecords} from '@/api/present/stuapi'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'Log',
  components: { Pagination },
  data() {
    return {
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 日期
      dateRange: [moment().subtract(30,'days').format('YYYY-MM-DD'),moment().add(30, 'days').format('YYYY-MM-DD')],
      // 查询参数
      queryParams: {
        page: 1,
        limit: 5,
        stu_id:this.$store.getters.user_id,
        date: [],

      },
      // 总数
      total: 0,
      // 日志列表
      logList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.queryParams.date = this.dateRange
      stuGetAttendRecords(this.queryParams).then(response => {
        this.logList = response.data.realArrdata
        this.total = response.data.total
        this.loading = false
      })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.user_log_id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 分页改变 */
    handlePageChange(arg) {
      this.queryParams.page = arg.page
      this.queryParams.limit = arg.limit
      this.getList()
    },
  }
}
</script>

