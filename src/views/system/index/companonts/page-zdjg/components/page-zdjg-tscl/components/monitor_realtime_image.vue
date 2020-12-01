<template>
    <div style="width: 100%;height: 100%">
        <div class="title">
            <div class="icon"></div>
            <div class="content">本日重点监控车辆实时图片</div>
        </div>
        <div class="images">
            <el-image class="image" :src="src"></el-image>
            <el-image  class="image" :src="src"></el-image>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'monitor_realtime_image',
    data(){
      return {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606650551241&di=8378d72dc6414bfa9a243c2e75db511a&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fauto%2Fpics%2Fhv1%2F246%2F190%2F1582%2F102918246.jpg'
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
