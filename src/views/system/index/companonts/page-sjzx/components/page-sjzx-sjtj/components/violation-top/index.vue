<template>
  <div class="violation-top">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-clock.png')"></el-image>
      违法车点位排名TOP7
    </div>

    <div class="card-box">
      <div v-for="(item,index) in chart.data" :key="index" class="chart-line">
        <span class="chart-name">{{item.name}}</span>
        <span>
            <el-image v-for="i in item.count" :key="i+'@'+index" class="chart-image" :src="require('../../image/image-car-blue.png')"
                      fit="contain"></el-image>
            <el-image v-for="j in (12-item.count)" :key="j+'#'+index" class="chart-image"
                      :src="require('../../image/image-car-invalid.png')"
                      fit="contain"></el-image>
        </span>
        <span class="chart-value">{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    components: {},
    data(){
      return {
        chart: {
          data: []
        }
      }
    },
    watch: {
      data(){
        this.updateChartData()
      }
    },
    mounted(){
      this.updateChartData()
    },
    methods: {
      updateChartData(){
        if (this.data) {
          let array = this.data.concat([])
          array.sort((t1, t2) => t2.count - t1.count)

          let data = []
          let max = 100
          array.forEach(item => {
            data.push({
              name: item.siteName,
              count: 0,
              value: parseInt(item.count),
            })
            if (item.count > max) {
              max = item.count
            }
          })
          data.forEach(item => {
            item.count = parseInt((item.value * 12) / max)
          })

          this.chart.data = data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .violation-top {
    .title {
      font-size: 18px;
      color: #FFFFFF;

      .el-image {
        width: 20px;
        height: 20px;

        margin: 20px 8px 20px 20px;
        vertical-align: middle;
      }
    }

    .card-box {
      width: calc(100% - 68px);
      margin-left: 34px;
      margin-top: 10px;
      height: calc(100% - 70px);

      .chart-line {
        display: flex;
        justify-content: space-between;
        height: 13%;
        align-items: center;

        .chart-name {
          font-size: 12px;
          color: #FFFFFF;
          line-height: 17px;
        }

        .chart-image {
          width: 20px;
          height: 14px;
          margin-left: 8px;
          vertical-align: middle;
        }

        .chart-value {
          font-size: 12px;
          color: #FFFFFF;
          line-height: 17px;
        }
      }
    }
  }
</style>
