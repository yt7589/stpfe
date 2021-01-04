<template>
  <div class="page-sjz-qbsj">
    <div class="header-crumb">
      <span>数据中心>全部数据</span>
    </div>
    <div class="body">
      <div class="column-left">
        <div class="wrapper">
          <el-form class="search-form">
            <div style="display: flex;justify-content: space-between;">
              <el-date-picker
                v-model="table.filter.time"
                class="custom-date-editor"
                style="width:35%"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

              <el-select class="custom-input custom-input-mini"
                         style="width:14%" placeholder="类型"
                         v-model="defaultVehicleLocType">
                <el-option v-for="item in vehicleLocTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>

              <el-select class="custom-input custom-input-mini"
                         style="width:24%" placeholder="车辆类型" v-model="table.filter.wzlx">

              </el-select>

              <el-select class="custom-input custom-input-mini"
                         style="width:24%" placeholder="违章类型" v-model="table.filter.wzlx">

              </el-select>
            </div>
            <div style="display: flex;justify-content: space-between;margin-top:0.041rem;">
              <el-input placeholder="请输入车牌号" v-model="table.filter.carNumber"
                        class="custom-input custom-input-mini" style="width:15%"></el-input>
              <el-input placeholder="请输入地点" v-model="table.filter.location"
                        class="custom-input custom-input-mini" style="width:15%">>
              </el-input>

              <div style="width:68%;display: inline-block;text-align: right">
                <el-button class="button-search">
                  搜索
                  <el-image :src="require('../../image/image-search.png')"></el-image>
                </el-button>
                <el-button class="button-export">
                  导出
                  <el-image :src="require('../../image/image-export.png')"></el-image>
                </el-button>
              </div>
            </div>
          </el-form>

          <el-container class="table-container">
            <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
              <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
                <el-table-column align="center" prop="" label="时间" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="地点" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="车牌号" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="类别" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="违章" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="违章类型" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="详情" minWidth="60"></el-table-column>
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
      <div class="column-right">
        <div class="card-container" style="display: flex;justify-content: space-between;">
          <div class="card card-blue">
            <div class="card-value">
              <el-image :src="require('../../image/image-recognize.png')"></el-image>
              <span>6688</span>
            </div>
            <div class="card-title">累计识别量</div>
          </div>
          <div class="card card-green">
            <div class="card-value">
              <el-image :src="require('../../image/image-violation.png')"></el-image>
              <span>6688</span>
            </div>
            <div class="card-title">累计违章量</div>
          </div>
          <div class="card card-yellow">
            <div class="card-value">
              <el-image :src="require('../../image/image-local-car.png')"></el-image>
              <span>6688</span>
            </div>
            <div class="card-title">累计本市违章量</div>
          </div>
          <div class="card card-red">
            <div class="card-value">
              <el-image :src="require('../../image/image-outland-car.png')"></el-image>
              <span>6688</span>
            </div>
            <div class="card-title">累计外埠违章量</div>
          </div>
        </div>
        <chart-violation class="chart-violation"></chart-violation>
        <chart-recognize class="chart-recognize"></chart-recognize>
      </div>
    </div>
  </div>
</template>

<script>
  import mapStyle from '@/assets/baiduMapStyle'
  import ChartRecognize  from './chart-recognize.vue'
  import ChartViolation from './chart-violation.vue'

  export default {
    props: ['visible'],
    components: {ChartRecognize, ChartViolation},
    data(){
      return {
        loading: false,
        vehicleLocTypes: [
          {
            value: '0',
            label: '全部'
          },
          {
            value: '1',
            label: '本地'
          },
          {
            value: '2',
            label: '外埠'
          }
        ],
        defaultVehicleLocType: '0',
        table: {
          data: [],
          filter: {},
          pagination: {
            currentPage: 1,
            total: 1000,
            pageSize: 20
          }
        },
      }
    },
    mounted(){
    },
    methods: {
      fetchData(page = 1){
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
  .page-sjz-qbsj {

    .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      .column-left {
        width: calc(55% - 16px);
        height: 100%;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .wrapper {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          bottom: 16px;
        }

        .button-search {
          width: 96px;
          background: #045FE0;
          border-radius: 4px;
          border: unset;
   /**/

          &:active {
            opacity: 0.8;
          }

          .el-image {
            width: 16px;
            float: right;
          }
        }

        .table-container {
          margin-top: 10px;
          height: calc(100% - 97px);

          .el-main {
            padding: unset;
          }

          .el-pagination {
            margin-top: 15px;
          }
        }
      }

      .column-right {
        width: 45%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .card-container {
          .card {
            width: calc(25% - 9px);
            border-radius: 4px;
          }

          .card-blue {
            background: #045FE0;
            .card-title {
              color: #045FE0;
            }
          }

          .card-green {
            background: #00C087;
            .card-title {
              color: #00C087;
            }
          }

          .card-yellow {
            background: #E69B03;
            .card-title {
              color: #E69B03;
            }
          }

          .card-red {
            background: #D1494E;
            .card-title {
              color: #D1494E;
            }
          }

          .card-title {
            background: #FFFFFF;
            padding: 16px 0px 16px 0px;

            text-align: center;
            font-size: 18px;
          }

          .card-value {
            height: 84px;
            color: white;
            font-size: 28px;
            .el-image {
              width: 48px;
              height: 48px;

              margin: 20px;
              padding-right: 10px;
              vertical-align: middle;
            }
          }

        }

        .chart-violation, .chart-recognize {
          height: calc(50% - 82px);
          width: 100%;

          background: rgba(4, 95, 224, 0.3);
          border-radius: 4px;
        }
      }
    }
  }
</style>
