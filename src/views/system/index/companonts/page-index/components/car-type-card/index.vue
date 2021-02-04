<template>
  <custom-card title="全市车辆类型分布" class="car-type-card">
    <div class="card-body-wrapper" slot="body">
      <el-row class="card-wrapper">
        <el-col :span="6" class="column-title">
          <div class="local-car">
            <div class="image-box">
              <div class="vline"></div>
              <div class="point" :style="car.localStyle"><span>{{car.local}}%</span></div>
            </div>
            本地
          </div>
          <div class="outland-car">
            <div class="image-box">
              <div class="vline"></div>
              <div class="point" :style="car.outlandStyle"><span>{{car.outland}}%</span></div>
            </div>
            外埠
          </div>
        </el-col>
        <el-col :span="18" class="column-chart">
          <div id="carTypeCard" class="chart"  />
          <!-- <highcharts class="chart" :options="chart.option"></highcharts> -->
        </el-col>
      </el-row>
    </div>
  </custom-card>
</template>

<script>
  import CustomCard from '../custom-card'
  import echarts from 'echarts'
  export default {
    props: ['typeData', 'data'],
    components: {CustomCard},
    data(){
      return {
        car: {
          local: 0,
          localStyle: {},
          outland: 0,
          outlandStyle: {}
        }
      }
    },
    watch: {
      data(){
        this.updateChartData()
      },
      typeData(){
        this.updateCarTypeData()
      }
    },
    mounted(){
      // 左侧
      this.updateCarTypeData()
      this.initChart()
      this.updateChartData()
      window.onresize = ()=>{
        console.log('大小变化挂')
        // this.chart.dispose()
        // this.chart = null
        // this.initChart();
        this.chart.resize();
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart(){
        this.chart = echarts.init(document.getElementById('carTypeCard'))
      },
      setOptions(names,datas){
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          legend: {
            orient: 'vertical',
            right: 0,
            top: 'middle',
            textStyle:{
              color: '#FFF',
              fontSize: 12  
            },
            data: names,
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 5,
            icon: 'rect'
          },
          series: [
            {
              name:'',
              type:'pie',
              center: ['40%', '50%'],
              radius: ['0', '70%'],
              roseType: 'radius',
              data:datas,
              labelLine:{
                length: 5,
                length2:5
              }
            }
          ],
          color:['#00F6FF', '#E69B03', '#4C49EC', '#00C087', '#06A6FF', '#045FE0', '#FFFFFF']
        })
      },
      updateChartData(){
        if (this.data) {
          let datas = []
          let names = []
          this.data.forEach(item => {
            let value = parseFloat(item.count)
            datas.push({
              name: item.name,
              value: value
            })
            names.push(item.name)
          })
          this.setOptions(names,datas)
        }
      },
      // 左侧
      updateCarTypeData(){
        if (this.typeData) {
          // 0 - 80 %
          this.car.local = parseInt(this.typeData.internalPercent)
          this.car.localStyle = {
            top: this.car.local * 80 / 100.0 + '%'
          }

          this.car.outland = parseInt(this.typeData.externalPercent)
          this.car.outlandStyle = {
            top: this.car.outland * 80 / 100.0 + '%'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-type-card {
    width: 100%;
    height: 100%;
    position: relative;
    .card-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }

    .column-title {
      height: 100%;

      display: flex;
      font-size: 12px;
      .local-car {
        color: #06A6FFFF;
        .vline {
          background: #06A6FF;
          border: solid 2px #048DDA;
        }
        .point {
          background: url(../../image/image-point-blue.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;

          span {
            margin-bottom: 3px;
            font-size: 12px;
            color: #06A6FFFF;
            transform: scale(0.8);
            margin-right: 3px;
          }
        }
      }

      .outland-car {
        color: #00C087FF;
        .vline {
          background: #06B699;
          border: solid 2px #01AE71;
        }
        .point {
          background: url(../../image/image-point-green.png) no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          span {
            margin-bottom: 3px;
            font-size: 12px;
            color: #00C087FF;
            transform: scale(0.8);
            margin-right: 3px;
          }
        }
      }

      .local-car, .outland-car {
        display: inline-block;
        width: 50%;
        height: 100%;
        text-align: center;
        .image-box {
          height: calc(100% - 20px);
          margin-bottom: 5px;
          position: relative;
          .vline {
            position: absolute;
            width: 20px;
            height: 100%;
            border-radius: 10px;
            left: calc(50% - 10px);
          }
          .point {
            position: absolute;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            left: calc(50% - 20px);
          }
        }
      }
    }

    .column-chart {
      height: 100%;
      .chart {
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
