<template>
  <div class="page-wzgl-wzjg-ils-detail" v-if="visible">
    <div class="header-crumb">
      <span @click="hide" style="cursor: pointer;">违章管理>违章监管>详细</span>
    </div>
    <div class="body">
      <div class="column-1">
        <el-image class="ils-image" :src="data.imageUrl" fit="contain"></el-image>
        <div class="ils-content">
          <div><span class="title">时间: </span>{{data.ilsTime}}</div>
          <div><span class="title">地点: </span>{{data.ilsAddr}}</div>
          <div><span class="title">车辆类型: </span>{{data.category}}</div>
          <div><span class="title">车牌号码: </span>{{data.hphm}}</div>
        </div>
        <el-button v-if="!isMoto" class="search-button" @click="searchVeh(data)">搜索相似车辆
          <el-image :src="require('../../image/image-search.png')"></el-image>
        </el-button>
      </div>
      <div class="column-2">
        <div class="line">
          <div class="title">车辆类别</div>
          <div style="display: flex">
            <div style="width: 50%">
              大类: <span class="value">{{data.vlType}}</span>
            </div>
            <div v-if="!isMoto" style="width: 50%">
              小类: <span class="value">{{data.vsType}}</span>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="title">驾驶行为</div>
          <div class="line-content">
            <div v-if="!isMoto" class="line-item">
              <div>方位: <span class="value">{{data.direction}}</span></div>
              <div>主驾驶看手机: <span class="value">{{data.md_isWPhone > 0 ? '是' : '否'}}</span></div>
              <div>主驾驶打电话: <span class="value">{{data.md_isPhone > 0 ? '是' : '否'}}</span></div>
              <div>副驾驶不系安全带: <span class="value">{{data.ct_isSafetyBelt > 0 ? '是' : '否'}}</span></div>
              <div>主驾驶放下遮阳板: <span class="value">{{data.md_isSunVisor > 0 ? '是' : '否'}}</span></div>
              <div>副驾驶放下遮阳板: <span class="value">{{data.ct_isSunVisor > 0 ? '是' : '否'}}</span></div>
            </div>
            <div class="line-item">
              <div v-if="!isMoto">主驾驶抽烟: <span class="value">{{data.md_isSmoke > 0 ? '是' : '否'}}</span></div>
              <div v-if="!isMoto">主驾驶不系安全带: <span class="value">{{data.md_isSafetyBelt > 0 ? '是' : '否'}}</span></div>
              <div v-if="isMoto">摩托车不戴头盔: <span class="value">{{data.mc_isHelmet > 0 ? '是' : '否'}}</span></div>
            </div>
          </div>
        </div>
        <div class="line" v-if="!isMoto">
          <div class="title">车身颜色: {{data.hphm_color}}</div>
        </div>
        <div class="line" v-if="!isMoto">
          <div class="title">车辆品牌</div>
          <div class="line-content">
            <div class="line-item">
              <div>车标: <span class="value">{{data.logo}}</span></div>
              <div>车型: <span class="value">{{data.vModel}}</span></div>
              <div>年款: <span class="value">{{data.yModel}}</span></div>
              <div>可信度: <span class="value">{{data.rlblt}}</span></div>
            </div>
          </div>
        </div>
        <div class="line" v-if="!isMoto">
          <div class="title">车辆号牌</div>
          <div class="line-content">
            <div class="line-item">
              <div>车牌状态: <span class="value">{{data.hphm_state}}</span></div>
              <div>车牌号码: <span class="value">{{data.hphm}}</span></div>
              <div>车牌颜色: <span class="value">{{data.hphm_color}}</span></div>
              <div>车牌种类: <span class="value">{{data.hphm_type}}</span></div>
              <div>号牌可信度: <span class="value">{{data.hphm_rlblt}}</span></div>
            </div>
            <div class="line-item">
              <div>字符样式: <span class="value">{{data.word_Style}}</span></div>
              <div>临时号牌: <span class="value"></span></div>
              <div>每位号牌可信度: <span class="value">{{data.ehphm_rlblt}}</span></div>
            </div>
          </div>
        </div>
        <div class="line" style="border-bottom:unset;" v-if="!isMoto">
          <div class="title">个性化特征</div>
          <div class="line-content">
            <div class="line-item">
              <div>车窗粘贴物: <span class="value">{{data.ccztw}}</span></div>
              <div>摆件: <span class="value">{{data.bj}}</span></div>
              <div>挂件: <span class="value">{{data.gj}}</span></div>
              <div>天窗: <span class="value">{{data.tc}}</span></div>
              <div>倒车镜缺失: <span class="value">{{data.dcjqs}}</span></div>
              <div>行李架: <span class="value">{{data.xlj}}</span></div>
            </div>
            <div class="line-item">
              <div>车身破损: <span class="value">{{data.csps}}</span></div>
              <div>车身彩绘: <span class="value">{{data.csch}}</span></div>
              <div>车身张贴: <span class="value">{{data.cszt}}</span></div>
              <div>车身刮痕: <span class="value">{{data.csgh}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/api'
  import util from '@/libs/util'

  export default {
    props: ['data', 'visible'],
    data(){
      return{
        isMoto:false
      }
    },
    mounted(){
    },
    watch:{
      data(val){
        this.isMoto = val.vlType=='摩托车'? true: false;
      }
    },
    beforeDestroy(){
      // this.$emit()
    },
    methods: {
      searchVeh(data){
        let params = {
          imgUrl: data.imageUrl,
          cltzxl: data.cltzxl,
        }
        util.bus.$emit('goSearchVeh',params);
      },
      hide(){
        this.$emit("update:visible", false)
      }
    }
  }
</script>

<style lang="scss">
  .page-wzgl-wzjg-ils-detail {
    width: 100%;
    height: 100%;

    > .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;

      font-size: 14px;
      color: #fff;
      line-height: 28px;

      .column-1 {
        background: #0073FF33;
        width: 30%;
        padding: 16px;
        text-align: center;

        .title {
          font-size: 18px;
          color: #00F6FF;
        }

        .ils-image {

          width: calc(100% - 16px);
          height: 400px;
          .el-image{
            width: 100%;
            height: 400px;
          }
          border: 8px solid #fff;
          border-radius: 4px;
        }

        .ils-content {
          margin-top: 10px;
          text-align: left;
        }

        .search-button {
          width: 256px;
          border: unset;
          margin-top: 20px;

          color: #FFFFFF;
          line-height: 18px;
          background: #045FE0;
          border-radius: 4px;

          .el-image {
            width: 16px;
            float: right;
          }
        }
      }

      .column-2 {
        background: #0073FF33;
        width: 70%;
        padding-left: 24px;
        padding-right: 24px;
        font-size: 14px;
        margin-left: 24px;

        .line {
          padding-top: 10px;
          padding-bottom: 10px;
          border-bottom: solid 1px rgba(255, 255, 255, 0.5);
          .line-content{
            display: flex;
            flex-direction: column;
            width: 100%;
            .line-item{
              display: flex;
              flex-direction: row;
              width: 100%;
              > * {
                min-width: 200px;
              }
            }
          }
        }

        .title {
          font-size: 18px;
          color: #00F6FF;
        }

        .value {
          font-size: 14px;
          color: #00F6FF;
        }
      }

    }
  }
</style>
