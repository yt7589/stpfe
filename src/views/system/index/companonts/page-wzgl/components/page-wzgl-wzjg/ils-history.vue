<template>
  <div class="page-wzgl-wzjg-ils-history" v-if="visible">
    <div class="header-crumb">
      <span @click="hide" style="cursor: pointer;">违章管理>违章监管>车辆历史</span>
    </div>
    <div class="body">
      <div class="column-1">
        <el-image class="ils-image" :src="info.imgUrl" fit="contain"></el-image>
        <div class="box-hmhp">{{data.hmhp}}</div>
        <div style="display: flex;justify-content: space-between;">
          <div class="box-ils-count">
            <div>总违章次数</div>
            <div class="value">{{info.ilsCount}}</div>
          </div>
          <div class="box-ils-year">
            <div>本年度违章次数</div>
            <div class="value">{{info.avCount}}</div>
          </div>
        </div>
      </div>
      <div class="column-2">
        <div class="pie-chart">
          <div class="title">
            <el-image :src="require('../../image/wzlb.png')"></el-image>            
            违章类别前五
          </div>
          <div id="pie-chart" class="chart"></div>
        </div>
        <div class="bar-chart">
          <div class="title">
            <el-image :src="require('../../image/lswz.png')"></el-image>
            历史违章走势图
          </div>
          <div id="bar-chart" class="chart"></div>
        </div>
      </div>
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
              <!-- <el-table-column align="center" prop="lng" label="详情" minWidth="60">
                <template slot-scope="scope">
                  <el-image :src="scope.row.imageUrl">
                    <div slot="error"></div>
                  </el-image>
                </template>
              </el-table-column> -->
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
  import echarts from 'echarts'

  export default {
    props: ['data', 'visible'],
    mounted(){
      this.fetchData()
      this.initChart()
    },
    data () {
      return {
        pieChart: null,
        barChart: null,
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
        info:{}
      }
    },
    methods: {
      initChart(){
        this.pieChart = echarts.init(document.getElementById('pie-chart'))
        this.barChart = echarts.init(document.getElementById('bar-chart'))
      },
      setBarOptions(xData,yData,yMaxData){
        var barWidth = 50;
        var colors = [{
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: '#F93003'
                }, {
                    offset: 0.5,
                    color: '#F93003'
                }, {
                    offset: 0.5,
                    color: '#FF6B51'
                }, {
                    offset: 1,
                    color: '#FF6B51'
                }]
            },
            {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: '#ECAC08'
                }, {
                    offset: 0.5,
                    color: '#ECAC08'
                }, {
                    offset: 0.5,
                    color: '#FBC74B'
                }, {
                    offset: 1,
                    color: '#FBC74B'
                }]
            },
            {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: '#A3BA2F'
                }, {
                    offset: 0.5,
                    color: '#A3BA2F'
                }, {
                    offset: 0.5,
                    color: '#C1D75E'
                }, {
                    offset: 1,
                    color: '#C1D75E'
                }]
            },
            {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: '#4C6061'
                }, {
                    offset: 0.5,
                    color: '#4C6061'
                }, {
                    offset: 0.5,
                    color: '#708E8F'
                }, {
                    offset: 1,
                    color: '#708E8F'
                }]
            },
            {
                type: 'linear',
                x: 0,
                x2: 1,
                y: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: '#D9D9D9'
                }, {
                    offset: 0.5,
                    color: '#D9D9D9'
                }, {
                    offset: 0.5,
                    color: '#F2F2F2'
                }, {
                    offset: 1,
                    color: '#F2F2F2'
                }]
            }
        ];
        this.barChart.setOption({
          grid: {
            top: '10%',
            bottom: '100'
          },
          //X轴
          xAxis: {
              type: 'category',
              data: xData,
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval:0,
                color: '#ffffff',
                textStyle: {
                  fontSize: 12
                },
              },
              offset: 10,
              axisLine: {
                  show: true,
                  lineStyle: {
                      color: '#D8D8D8',
                      width: 10
                  }
              },
          },
          yAxis: {
              show: false
          },
          series: [
              // 阴影
            {
              type: 'bar',
              barGap: '-100%',
              barWidth: barWidth,
              itemStyle: {
                  normal: {
                          color: function(params) {
                              return colors[4];
                          },
                      }
              },
              z: -12,
              data: yMaxData
              },
              // 柱体顶部
              {
                  z: 3,
                  type: 'pictorialBar',
                  symbolPosition: 'end',
                  data: yMaxData,
                  symbol: 'diamond',
                  symbolOffset: [0, '-50%'],
                  symbolSize: [barWidth, barWidth * 0.5],
                  itemStyle: {
                      normal: {
                          borderWidth: 0,
                          color: function(params) {
                              return colors[4].colorStops[0].color;
                          },
                      }
                  },
              },
              // 实体柱
              {
                  type: 'bar',
                  barWidth: barWidth,
                  itemStyle: {
                      normal: {
                          color: function(params) {
                              return colors[params.dataIndex % 4];
                          }
                      }
                  },
                  // 顶部文字
                  label: {
                      show: true,
                      position: [25,-30],
                      color: '#045FE0',
                      fontSize: 12,
                      fontStyle: 'bold',
                      formatter: '{c}次',
                      align: 'center',
                  },
                  data: yData
              },
              // 柱体底部
              {
                  z: 2,
                  type: 'pictorialBar',
                  data: yData,
                  symbol: 'diamond',
                  symbolOffset: [0, '50%'],
                  symbolSize: [barWidth, barWidth * 0.5],
                  itemStyle: {
                      normal: {
                          color: function(params) {
                              return colors[params.dataIndex % 4];
                          },
                      }
                  },
                  
              },
              // 柱体顶部
              {
                  z: 3,
                  type: 'pictorialBar',
                  symbolPosition: 'end',
                  data: yData,
                  symbol: 'diamond',
                  symbolOffset: [0, '-50%'],
                  symbolSize: [barWidth, barWidth * 0.5],
                  itemStyle: {
                      normal: {
                          borderWidth: 0,
                          color: function(params) {
                              return colors[params.dataIndex % 4].colorStops[0].color;
                          },

                      }
                  }
              }
          ]
        })
      },
      setPieOptions(names,datas){
        this.pieChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          series: [
            {
              name:'',
              type:'pie',
              center: ['50%', '45%'],
              radius: ['0', '60%'],
              roseType: 'radius',
              data:datas,
              labelLine:{
                length: 15,
                length2:5
              }
            }
          ],
          color:['#83B22F', '#F18C1E', '#5FB6C9', '#D8D8D8', '#DA4889']
        })
      },
      fetchData(page = 1){
        API.queryIlsVehicleHistory({
          hphm: this.data.hmhp,
          page: this.table.pagination.currentPage,
          pageSize: this.table.pagination.pageSize,
        }).then(res => {
          this.table.pagination.total = res.data.total
          this.table.data = res.data.recs
        })
        API.queryIlsVsInfo({
          hphm: this.data.hmhp,
          tvisJsonId: this.data.tvisJsonId,
          vehsIdx: this.data.vehIdx,
        }).then(res => {
          this.info = res.data

          var pieChartNames = [];
          if(this.info.ilsVstype.length>0){
            this.info.ilsVstype.forEach(item => {
              pieChartNames.push(item.name)
            });
          }
          this.setPieOptions(pieChartNames,this.info.ilsVstype);
          var yData = [];
          var xData = [];
          if(this.info.ilsVsTrend.length > 0){
            this.info.ilsVsTrend.forEach(item => {
              yData.push(item.count);
              xData.push(item.year);
            })
          }
          var max = Math.max(...yData);
          var yMaxData = [];
          yData.forEach(item =>{
            yMaxData.push(max)
          })
          this.setBarOptions(xData,yData,yMaxData);

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
          height: 278px;
          border: 8px solid #fff;
          border-radius: 4px;
          .el-image{
            width: 257px;;
            height: 278px;
          }
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
        width: 28%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .pie-chart{
          background: #0073FF33;
          height: 50%;
          .title{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 16px;
            margin-left: 24px;
            font-size: 18px;
            .el-image{
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
          .chart {
            width: 100%;
            height: 100%;
          }
        }
        .bar-chart{
          background: #0073FF33;
          height:49%;
          .title{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 16px;
            margin-left: 24px;
            font-size: 18px;
            .el-image{
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
          .chart {
            width: 100%;
            height: 100%;
          }
        }
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
