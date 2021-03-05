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
                v-model="queryTimes" format="yyyy-MM-dd" 
                class="custom-date-editor"
                style="width:35%"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

              <el-select class="custom-input custom-input-mini"
                         style="width:14%" placeholder="类型"
                         v-model="selVehicleLocType">
                <el-option v-for="item in vehicleLocTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>

              <el-select class="custom-input custom-input-mini"
                         style="width:24%" placeholder="车辆类型" v-model="selVehicleType">
                <el-option v-for="item in vehicleTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>

              <el-select class="custom-input custom-input-mini"
                         style="width:24%" placeholder="违章类型" v-model="selIlsType">
                <el-option v-for="item in ilsTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div style="display: flex;justify-content: space-between;margin-top:0.041rem;">
              <el-input placeholder="请输入车牌号" v-model="hphm"
                        class="custom-input custom-input-mini" style="width:15%"></el-input>
              <el-input placeholder="请输入地点" v-model="siteName"
                        class="custom-input custom-input-mini" style="width:15%">>
              </el-input>

              <div style="width:68%;display: inline-block;text-align: right">
                <el-button class="button-search" @click="queryVehiclesHandler">
                  搜索
                  <el-image :src="require('../../image/image-search.png')"></el-image>
                </el-button>
                <el-button class="button-export" @click="handleExport">
                  导出
                  <el-image :src="require('../../image/image-export.png')"></el-image>
                </el-button>
              </div>
            </div>
          </el-form>

          <el-container class="table-container">
            <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
              <el-table class="custom-table wzgl-table" :data="vehicles" height="100%">
                <el-table-column align="center" prop="dcTime" label="时间" minWidth="90"></el-table-column>
                <el-table-column align="center" prop="dcAddr" label="地点" minWidth="90"></el-table-column>
                <el-table-column align="center" prop="hphm" label="车牌号" minWidth="50"></el-table-column>
                <el-table-column align="center" prop="category" label="类别" minWidth="40"></el-table-column>
                <el-table-column align="center" prop="isIl" label="违章" minWidth="40"></el-table-column>
                <el-table-column align="center" prop="ilType" label="违章类型" minWidth="50"></el-table-column>
                <el-table-column align="center" prop="" label="详情" minWidth="60">
                  <template slot-scope="scope">
                    <span :id="scope.row.dcId" @click="selectVehicle(scope.row.dcId)">...</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-pagination
                background
                class="custom-pagination zq-pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="pageSize"
                layout="total,prev, pager, next,sizes,jumper"
                :total="total">
              </el-pagination>
            </el-footer>
          </el-container>
        </div>
      </div>
      <div class="column-right">
        <div class="card-container" style="display: flex;justify-content: space-between;">
          <div class="card card-blue">
            <div class="card-value">
              <span>{{loadIlsTotal['total_recognition']}}</span>
            </div>
            <div class="card-title">
              <el-image :src="require('../../image/image-recognize.png')"></el-image>
              累计识别量
            </div>
          </div>
          <div class="card card-green">
            <div class="card-value">
              <span>{{loadIlsTotal['total_violation']}}</span>
            </div>
            <div class="card-title">
              <el-image :src="require('../../image/image-violation.png')"></el-image>
              累计违章量
            </div>
          </div>
          <div class="card card-yellow">
            <div class="card-value">
              <span>{{loadIlsTotal['total_violation_city']}}</span>
            </div>
            <div class="card-title">
              <el-image :src="require('../../image/image-local-car.png')"></el-image>
              累计本市违章量
            </div>
          </div>
          <div class="card card-red">
            <div class="card-value">
              <span>{{loadIlsTotal['total_violation_town']}}</span>
            </div>
            <div class="card-title">
              <el-image :src="require('../../image/image-outland-car.png')"></el-image>
              累计外埠违章量
            </div>
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

  import API from '@/api'

  export default {
    props: ['visible'],
    components: {ChartRecognize, ChartViolation},
    data(){
      return {
        loading: false,
        vehicleLocTypes: [
          {
            value: '',
            label: '全部'
          },
          {
            value: 0,
            label: '本地'
          },
          {
            value: 1,
            label: '外埠'
          }
        ],
        selVehicleLocType: '',
        vehicleTypes: [],
        selVehicleType: 0,
        ilsTypes: [],
        selIlsType: 0,
        // 定义查询条件
        hphm: '', // 车牌号
        siteName: '', // 地点仅提点位
        queryTimes: null,
        startDate: '',
        endDate: '',
        startIndex: 0,
        amount: 20,
        driection: 'next',
        currentPage: 1,
        pageSize: 20,
        total: 0,
        vehicles: [],
        loadIlsTotal:'',//累计识别违章量
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
      this.getVehicleTypes()
      this.getIlsTypes()
      this.queryVehicles()
      this.loadIlsQty()
    },
    methods: {
      handleExport(){
        window.location = process.env.VUE_APP_EXPORT_API + 'dc/hp/exportAllData?startTime=' + (this.queryTimes==null? '':this.formatDate(this.queryTimes[0]) )
                    + '&endTime=' + (this.queryTimes==null? '': this.formatDate(this.queryTimes[1]))
                    + '&category=' + this.selVehicleLocType + '&vType=' + this.selVehicleType + '&ilType=' + this.selIlsType + '&hphm=' + this.hphm
                    + '&vAddr=' + this.siteName;
      },
      /**
       * 获取车辆类别下拉框中内容
       */
      getVehicleTypes() {
        API.getVehicleTypes().then(res => {
          let recs = res.data
          let vtLen= recs.length;
          this.vehicleTypes = [{
            value: 0,
            label: '全部'
          }]
          for (let i=0; i<vtLen; i++) {
            this.vehicleTypes.push({
              value: recs[i].typeId,
              label: recs[i].typeName
            })
          }
        })
        this.defaultVehicleType = 0
      },
      /**
       * 获取违章类型下拉框中内容
       */
      getIlsTypes() {
        API.getIlsTypes().then(res => {
          let recs = res.data
          let vtLen= recs.length;
          this.ilsTypes = [{
            value: 0,
            label: '全部'
          }]
          for (let i=0; i<vtLen; i++) {
            this.ilsTypes.push({
              value: recs[i].typeId,
              label: recs[i].typeName
            })
          }
        })
        this.defaultIlsTypes = 0
      },
      /**
       * 左侧列表查询接口
       */
      queryVehiclesHandler(event) {
        this.currentPage = 1
        this.startIndex = 0
        this.queryVehicles()
      },
      queryVehicles() {
        let params = {
          startIndex: this.startIndex,
          amount: this.amount,
          direction: this.direction
        }
        if (this.queryTimes != null) {
          params.startTime = formatDate(this.queryTimes[0])
          params.endTime = formatDate(this.queryTimes[1])
        }
        if (this.selVehicleLocType !== '') {
            params.category = this.selVehicleLocType
        }
        if (this.selVehicleType != 0) {
          params.vType = this.selVehicleType
        }
        if (this.selIlsType != 0) {
          params.ilType = this.selIlsType
        }
        if (this.hphm != null && this.hphm != '') {
          params.hphm = this.hphm
        }
        if (this.siteName != null && this.siteName != '') {
          params.vAddr = this.siteName
        }
        API.getDcAdVehicles(params).then(res => {
          let data = res.data
          this.total = data.total
          if (this.direction == 'next') {
            this.startIndex += data.realNum
          } else {
            this.startIndex -= data.realNum
          }
          this.vehicles = data.recs
        })
      },
      /**
       * 车辆表格中每行编辑图标点击事件
       */
      selectVehicle(dcId) {
        console.log('点击：' + dcId + '!')
      },
      handleSizeChange(size){
        this.pageSize = size
        this.queryVehicles()
      },
      handleCurrentChange(page){
        this.currentPage = page
        this.startIndex = (page - 1) * this.pageSize
        this.queryVehicles()
      },
      /**
       * 右侧图表数据显示
       */
      loadIlsQty(){
        API.loadIlsQty().then(res => {
          this.loadIlsTotal =res.data
        })
      },
    }
  }
  /**
   * 日期格式化工具函数
   */
  function formatDate(dateObj) {
    let dateStr = '' + dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    if (month<10) {
      dateStr += '-0' + month
    } else {
      dateStr += '-' + month
    }
    let dateVal = dateObj.getDate()
    if (dateVal<10) {
      dateStr += '-0' + dateVal
    } else {
      dateStr += '-' + dateVal
    }
    return dateStr
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

        .button-export{
          width: 96px;
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
            .el-image {
              width: 24px;
              height: 24px;
              // margin: 20px;
              padding-right: 10px;
              vertical-align: middle;
            }
          }

          .card-value {
            height: 84px;
            color: white;
            font-size: 28px;
            white-space: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
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
