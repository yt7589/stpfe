<template>
  <div class="violation-top">
    <div class="title">
      <el-image fit="contain" :src="require('../../image/image-clock.png')"></el-image>
      违法车点位排名TOP7
    </div>

    <div class="card-box">
      <div v-for="item in chart.data" class="chart-line">
        <span class="chart-name">{{item.name}}</span>
        <span>
            <el-image v-for="i in item.count" class="chart-image" :src="require('../../image/image-car-blue.png')"
                      fit="contain"></el-image>
            <el-image v-for="i in (12-item.count)" class="chart-image"
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
    components: {},
    data(){
      return {
        chart: {
          data: [
            {
              name: '点位1',
              count: 2,
              value: 320,
            },
            {
              name: '点位1',
              count: 5,
              value: 320,
            }, {
              name: '点位2',
              count: 4,
              value: 320,
            }, {
              name: '点位3',
              count: 3,
              value: 320,
            }, {
              name: '点位4',
              count: 4,
              value: 320,
            }, {
              name: '点位5',
              count: 1,
              value: 320,
            }, {
              name: '点位6',
              count: 2,
              value: 320,
            }, {
              name: '点位7',
              count: 2,
              value: 320,
            }
          ]
        }
      }
    },
    mounted(){
    },
    methods: {}
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
