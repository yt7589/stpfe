<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆实时图片</div>
        </div>
        <div class="images">
            <el-image v-for="(item,index) in images" :key="index" class="image" :src="item"></el-image>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'monitor_realtime_image',
    props:{
      images:{
        type: Array,
        default:()=>{
          return [];
        }
      }
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
    .title {
        font-family: PingFangSC-Medium, PingFang SC;
        color: #06A6FF;
        height: 20px;
        .icon {
            width: 20px;
            height: 100%;
            margin-right: 10px;
            background: url('../../../image/tscl-1-3.png') no-repeat;
            background-size: cover;
        }
        margin-top: 24px;
        margin-left: 23px;
        display: flex;
        .content {
            font-size: 18px;
            line-height: 18px;
        }
    }
    .images {
        display: flex;
        justify-content: space-evenly;
        height: 100%;
        margin-top: 24px;
        .image{
            width: 40%;
            height: 60%;
        }
    }
</style>
