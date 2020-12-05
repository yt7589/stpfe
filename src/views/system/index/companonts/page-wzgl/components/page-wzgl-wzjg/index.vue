<template>
  <div class="page-wzgl-wzjg" flex="dir:top">
    <div class="header-crumb">
      <span>违章管理>违章监管</span>
    </div>
    <div flex-box="1" class="body">
      <div class="column-1">
        <el-form class="search-form">
          <el-form-item>
            <el-select placeholder="类别" v-model="table.filter.type">

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="车辆类型" v-model="table.filter.carType">

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="违章类型" v-model="table.filter.wzlx">

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="车牌号" v-model="table.filter.cph">

            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="地点" v-model="table.filter.location">

            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="button-search">
              搜索
              <el-image :src="require('../../image/image-search.png')"></el-image>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="button-export">
              导出
              <el-image :src="require('../../image/image-export.png')"></el-image>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="column-2">
        <el-container class="table-container">
          <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
            <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
              <el-table-column align="center" prop="" label="时间" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="地点" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="车牌号" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="类别" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="车辆类型" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="违章类型" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="详情" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="" label="操作" minWidth="60"></el-table-column>
            </el-table>
          </el-main>
          <el-footer>
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
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
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
            total: 1000,
            pageSize: 20
          }
        }
      }
    },
    mounted(){
    },
    methods: {
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
  .page-wzgl-wzjg {

    .body {
      margin-top: 8px;
      width: 100%;
      display: flex;

      .column-1 {
        width: 16%;
        height: 100%;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .search-form {
          position: absolute;
          top: 24px;
          left: 24px;
          right: 24px;

          .el-form-item {
            margin-bottom: 8px;
          }

          .el-input__inner {
            padding: 15px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
          }

          .button-search {
            width: 100%;

            background: #045FE0;
            border-radius: 4px;
            border: unset;

            font-size: 14px;
            color: #FFFFFF;

            &:active {
              opacity: 0.8;
            }

            .el-image {
              width: 16px;
              float: right;
            }
          }

          .button-export {
            width: 100%;

            background: #00C087;
            border-radius: 4px;
            border: unset;

            font-size: 14px;
            color: #FFFFFF;

            &:active {
              opacity: 0.8;
            }

            .el-image {
              width: 16px;
              float: right;
            }
          }
        }
      }

      .column-2 {
        width: calc(84% - 8px);
        height: 100%;
        margin-left: 8px;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .table-container {
          position: absolute;
          top: 4px;
          right: 4px;
          bottom: 4px;
          left: 4px;

          .el-footer {
            height: 50px !important;
            text-align: right;
          }
        }
      }
    }
  }
</style>
