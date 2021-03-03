<template>
  <div class="page-wzgl-wzjg-ils-history" v-if="visible">
    <div class="header-crumb">
      <span @click="hide" style="cursor: pointer;">违章管理>违章监管>车辆历史</span>
    </div>
    <div class="body">
      <div class="column-1">
        <el-image class="ils-image" :src="data.imageUrl"></el-image>
        <div class="box-hmhp">{{data.hmhp}}</div>
        <div style="display: flex;justify-content: space-between;">
          <div class="box-ils-count">
            <div>总违章次数</div>
            <div class="value">123</div>
          </div>
          <div class="box-ils-year">
            <div>本年度违章次数</div>
            <div class="value">123</div>
          </div>
        </div>
      </div>
      <div class="column-2"></div>
      <div class="column-3">
        <div class="title">
          <el-image :src="require('../../image/image-chart-2.png')"></el-image>
          历史违章记录
        </div>
        <el-container class="table-container">
          <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
            <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
              <el-table-column align="center" prop="ilTime" label="时间" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="ilAddr" label="地点" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="ilType" label="违章类型" minWidth="60"></el-table-column>
              <el-table-column align="center" prop="lng" label="详情" minWidth="60">
                <template slot-scope="scope">
                  <el-image :src="scope.row.imageUrl">
                    <div slot="error"></div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="" label="操作" minWidth="60">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="viewDetail(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
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
  import API from '@/api'

  export default {
    props: ['data', 'visible'],
    mounted(){
      this.fetchData()
    },
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
      }
    },
    methods: {
      fetchData(page = 1){
        API.queryIlsVehicleHistory({
          hphm: this.data.hmhp,
          page: this.table.pagination.currentPage,
          pageSize: this.table.pagination.pageSize,
        }).then(res => {
          this.table.pagination.total = res.data.total
          this.table.data = res.data.recs
        })
      },
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      },
      hide(){
        this.$emit("update:visible", false)
      },
      viewDetail(row){
        this.$emit("view", row)
      }
    }
  }
</script>

<style lang="scss">
  .page-wzgl-wzjg-ils-history {
    width: 100%;
    height: 100%;

    > .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      font-size: 14px;
      color: #fff;
      line-height: 28px;

      .column-1 {
        width: 20%;
        background: #0073FF33;
        padding: 16px;

        .ils-image {
          width: calc(100% - 16px);
          border: 8px solid #fff;
          border-radius: 4px;
        }

        .box-hmhp {
          margin-top: 10px;
          margin-bottom: 10px;
          line-height: 94px;
          text-align: center;
          background: #045FE0;
          border-radius: 4px;
          font-size: 30px;
          font-weight: 400;
          color: #FFFFFF;
        }

        .box-ils-count {
          width: 49%;
          height: 94px;
          background: #E69B03;
          border-radius: 4px;
          text-align: center;

          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .value {
            font-size: 30px;
          }
        }

        .box-ils-year {
          width: 49%;
          height: 94px;
          background: #D1494EFF;
          border-radius: 4px;
          text-align: center;

          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .value {
            font-size: 30px;
          }
        }

      }

      .column-2 {
        background: #0073FF33;
        width: 28%;
        height: 100%;
      }

      .column-3 {
        width: 49%;
        height: 100%;
        background: #0073FF33;

        .title {
          padding: 16px;
          padding-bottom: 0px;
          line-height: 24px;
          font-size: 18px;
          .el-image {
            width: 24px;
            height: 26px;
            vertical-align: bottom;
          }
        }

        .table-container {
          height: calc(100% - 58px);
          .el-image {
            width: 100px;
            height: 60px;
          }
        }
      }

    }
  }
</style>
