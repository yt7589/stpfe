<template>
  <div class="page-data-photo">
    <!--<div class="page-title"></div>-->
    <el-container class="page-body_wrapper">
      <el-header height="0.2rem" v-if="isAdmin">
        <el-form labelWidth="auto" :inline="true" class="custom-form custom-form-mini">
          <el-form-item label="用户名">
            <el-input class="custom-input" v-model="table.filter.username"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input class="custom-input" v-model="table.filter.date"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">导出</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table :data="table.data" class="custom-table" height="100%">
          <el-table-column align="center" prop="imageUrl" label="原图">
            <template slot-scope="scope">
              <el-image :src="scope.row.imageUrl" class="vehicle-image" fit="contain"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="vehicleNum" label="车辆数" minWidth="60"></el-table-column>
          <el-table-column align="center" prop="uploadTime" label="上传时间" minWidth="60"></el-table-column>
          <el-table-column fixed="right" label="操作" minWidth="50">
            <template slot-scope="scope">
              <el-button size="small" type="text">查看详情</el-button>
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
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    data () {
      return {
        loading: false,
        table: {
          data: [],
          filter: {
            username: '',
            phone: '',
            company: ''
          },
          pagination: {
            currentPage: 1,
            total: 0,
            pageSize: 20
          }
        },
        isAdmin: false
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(page = 1){
        this.loading = true
        api.GetRecognitionList({
          amount: this.table.pagination.pageSize,
          direction: 1,
          startTime: 0,
          endTime: 2999,
          startIdx: (page - 1) * this.table.pagination.pageSize,
        }).then(res => {
          this.table.data = res.data.items

          this.table.pagination.total = res.data.totalNum
        }).finally(() => {
          this.loading = false
        })
      },
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      }
    }
  }
</script>


<style lang="scss">
  .page-data-photo {
    width: 100%;
    height: 100%;
    position: relative;

    background: url('../../image/background-container.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .page-body_wrapper {
      position: absolute;
      top: 40px;
      left: 60px;
      right: 60px;
      bottom: 40px;
    }


    .vehicle-image {
      height: 80px;
    }
  }
</style>
