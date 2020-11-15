<template>
  <el-container class="page-user">
    <el-header height="0.2rem">
      <el-form labelWidth="auto" :inline="true" class="custom-form custom-form-mini">
        <el-form-item label="用户名">
          <el-input class="custom-input" v-model="table.filter.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input class="custom-input" v-model="table.filter.phone"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input class="custom-input" v-model="table.filter.company"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">添加账号</el-button>
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="table.data" class="custom-table" height="100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="ID" minWidth="10"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="method" label="登录方式"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="company" label="公司名称"></el-table-column>
        <el-table-column prop="auth" label="用户权限" show-overflow-tooltip></el-table-column>
        <el-table-column prop="login_time" label="最近登录时间"></el-table-column>
        <el-table-column fixed="right" label="操作" minWidth="30">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="text"></el-button>
            <el-button size="small" icon="el-icon-delete" type="text"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer height="0.2rem" style="text-align: right;">
      <el-pagination
        class="custom-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="table.pagination.currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="table.pagination.pageSize"
        layout="prev, pager,sizes, next,total"
        :total="table.pagination.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        table: {
          data: [],
          filter: {
            username: '',
            phone: '',
            company: ''
          },
          pagination: {
            currentPage: 1,
            total: 1000,
            pageSize: 20
          }
        }
      }
    },
    mounted(){
      let item = {
        id: 1,
        username: 'admin',
        method: '手机',
        phone: '137xxxxxxxx',
        city: '北京',
        company: '北京XXXX有限公司',
        auth: '用户管理,车身颜色,图片管理,XX管理,XX管理,XX管理,XX管理',
        login_time: "2020-09-11 02:10:33",
      }
      for (let i = 0; i < 20; i++) {
        this.table.data.push(item)
      }
    },
    methods: {
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>


<style lang="scss">
  .page-user {
    height: 100%;
  }
</style>
