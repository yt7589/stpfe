<template>
  <div class="page-sjzx-sjbg">
    <div class="top">
        选择时段 
        <el-button :class="buttonKey=='today'?'is-active':'un-active'" value="today" @click="buttonKey='today';fetchData()">今日</el-button>
        <el-button :class="buttonKey=='week'?'is-active':'un-active'" value="week" @click="buttonKey='week';fetchData()">近七日</el-button>
        <el-button :class="buttonKey=='month'?'is-active':'un-active'" value="month" @click="buttonKey='month';fetchData()">近一月</el-button>
        <el-button :class="buttonKey=='quarter'?'is-active':'un-active'" value="quarter" @click="buttonKey='quarter';fetchData()">近三月</el-button>
        <el-button :class="buttonKey=='half'?'is-active':'un-active'" value="half" @click="buttonKey='half';fetchData()">近半年</el-button>
        <el-button :class="buttonKey=='year'?'is-active':'un-active'" value="year" @click="buttonKey='year';fetchData()">近一年</el-button>
        <el-button class="button-save" icon="el-button-save" @click="getPdf(doms,'数据报告')">保存为PDF</el-button>
    </div>
    <div  id="pdfDom"> 
      <div class="title">
        北京市一日交通数据报告
      </div>
      <div class="chart-1" id="chart-1">
        <fsdydqs id="line1" :x-data="rtjXData?rtjXData:[]" :line-data="rtjLineData?rtjLineData:[]" 
        :title="params[0].title" :icon="params[0].icon" :chartItem="params[0].chartItem"></fsdydqs>
      </div>
      <div class="chart-2" id="chart-2">
        <fqgfsd :data="data.raj?data.raj:[]" :title="params[1].title" :icon="params[1].icon"></fqgfsd>
      </div>
      <div class="chart-3" id="chart-3">
        <fsdydqs id="line2" :x-data="rtvXData?rtvXData:[]" :line-data="rtvLineData?rtvLineData:[]" 
        :title="params[2].title" :icon="params[2].icon" :chartItem="params[2].chartItem"></fsdydqs>
      </div>
      <div class="chart-4" id="chart-4">
        <fqgcl :data="data.rav?data.rav:[]" :title="params[3].title" :icon="params[3].icon"></fqgcl>
        <el-image class="image-legend" :src="require('./image/image-legend.png')"></el-image>
      </div>
      <div class="chart-5" id="chart-5">
        <fqgfsd :data="data.rrj?data.rrj:[]" :title="params[4].title" :icon="params[4].icon"></fqgfsd>
      </div>
    </div>
  </div>
</template>

<script>
  import fqgcl from './components/fqgcl/index.vue'
  import fsdydqs from './components/fsdydqs/index.vue'
  import fqgfsd from './components/fqgfsd/index.vue'
  import API from '@/api'
  import util from '@/libs/util'
  export default {
    components: {
      fqgcl,fqgfsd,fsdydqs
    },
    data(){
      return {
        data: {
            
        },
        doms:['#chart-1','#chart-2','#chart-3','#chart-4','#chart-5'],
        params:[
          {
            title: '分时段拥堵趋势',
            icon: 'icon-1.png',
            chartItem: {
              xAxisName: '时间',
              yAxisName: '拥堵指数',
              lineColor: '#00F6FF',
              areaColor1: '#00FBFF',
              areaColor2: '#001537'
            }
          },
          {
            title: '分区高峰时段拥堵排名',
            icon: 'icon-2.png'
          },
          {
            title: '分时段过车量',
            icon: 'icon-3.png',
            chartItem: {
              xAxisName: '时间',
              yAxisName: '辆/百万',
              lineColor: '#FF5200',
              areaColor1: '#E69B03',
              areaColor2: '#001537'
            }
          },
          {
            title: '分区过车量排名',
            icon: 'icon-4.png'
          },
          {
            title: '高峰时段拥堵路段排名',
            icon: 'icon-5.png'
          },
        ],
        buttonKey: 'today',
        // 分时段拥堵趋势--x轴数据
        rtjXData:[],
        // 分时段拥堵趋势--y轴数据
        rtjLineData:[],
        // 分时段过车量--x轴数据
        rtvXData:[],
        // 分时段过车量--y轴数据
        rtvLineData:[]
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      getPdf(doms,title){
        console.log('--------')
        util.pdf.domsToPdf(doms,'数据报告');
      },
      fetchData(){
        API.sjzxQueryDataReport({buttonKey:this.buttonKey}).then(res => {
          this.data = res.data
          // 解析分时段拥堵趋势数据
          let rtjData = this.data.rtj;
          this.rtjXData = [];
          this.rtjLineData = [];
          rtjData.forEach(item => {
            this.rtjXData.push(item.name);
            this.rtjLineData.push(item.count);
          });
          let rtvData = this.data.rtv;
          this.rtvXData = [];
          this.rtvLineData = [];
          rtvData.forEach(item => {
            this.rtvXData.push(item.name);
            this.rtvLineData.push(item.count);
          });
        })
      }
    }
  }
</script>

<style >
  .el-button-save {
    background: url(./image/icon-save.png);
    background-size: cover;
    margin-right: 10px;
  }
  .el-button-save:before{
      content: "睛";
      font-size: 16px;
      visibility: hidden;
  }
</style>
<style lang="scss">
  .page-sjzx-sjbg {
    overflow-y: scroll;
    .top{
        display: inline-block;
        font-size: 14px;
        color: #FFFFFF;
        .is-active{
            background: #045FE0;
            border: unset;
            font-size: 14px;
            color: #FFFFFF;
        }
        .un-active{
            border-color: #045FE0;
            font-size: 14px;
            color: #FFFFFF;
            background-color: #000;
        }
        .button-save {
            margin-left: 66px;
            margin-top: 4px;

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
    }
    .title{
      font-size: 24px;
      color: #FFFFFF;
      font-weight: 500;
      margin-top: 24px;
      margin-bottom: 16px;
    }
    
    .chart-1{
      width: 100%;
      height: 356px;
    }
    .chart-2 {
      margin-top: 24px;
      width: 100%;
      height: 617px;
    }
    .chart-3 {
      margin-top: 24px;
      width: 100%;
      height: 356px;
    }
    .chart-4 {
      margin-top: 24px;
      width: 100%;
      height: 617px;
      .image-legend {
        width: 72px;
        left: 50px;
        top: -200px;
        z-index: 111;
      }
    }
    .chart-5 {
      margin-top: 24px;
      width: 100%;
      height: 617px;
    }
  }

  > .layout-background {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 99;
      pointer-events: none;

      > .piece-5 {
        position: absolute;
        bottom: 0px;
        right: 0px;
        top: 217px;
        width: 1270px;

        background: url(../../../../image/background-piece_5.png) no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;

      }
  }
</style>
