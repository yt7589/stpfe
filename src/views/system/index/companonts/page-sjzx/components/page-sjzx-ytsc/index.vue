<template>
  <div class="page-sjzx-ytsc" flex="dir:top">
    <div class="header-crumb">
      <span>数据中心>以图搜车Yt</span>
    </div>
    <div class="body">
      <div class="column-1">
        <el-form class="search-form" ref="form" :model="table.filter" :rules="table.rules">
          <el-form-item label="日期范围" prop="date">
            <el-date-picker
              v-model="table.filter.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间范围" prop="time">
            <el-time-picker
              is-range
              v-model="table.filter.time"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-time-picker>
          </el-form-item>

          <el-form-item label="添加图片" style="margin:5% 0;" prop="photo">
            <el-upload
              class="image-upload"
              action=""
              accept="image/*"
              :on-preview="handleImagePreview"
              :show-file-list="false"
              :http-request="handleImageSelect">
              <el-image v-if="table.filter.image.url" :src="table.filter.image.url" style="width:100%;height:100%;"
                        fit="contain"></el-image>
              <i v-else="" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="canSearch">
            <el-button class="button-search" @click="fetchData">
              搜索
              <el-image :src="require('../../image/image-search.png')"></el-image>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="column-2">
        <el-container style="width: 100%;height: 100%;">
          <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
            <image-card v-for="(item,index) in table.data" :key="index" :image="item" class="image-card"></image-card>
          </el-main>
          <el-footer>
            <el-pagination
              background
              class="custom-pagination zq-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="table.pagination.currentPage"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="table.pagination.pageSize"
              layout="total,prev, pager, next,sizes,jumper"
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
  import ImageCard from './image-card.vue'
import { error } from 'highcharts'
import { getCoordinateSystemDimensions } from 'echarts/lib/echarts'
  export default {
    props: ['visible','searchVeh'],
    components: {ImageCard},
    data(){
      return {
        loading: false,
        canSearch: false,
        cltzxl: '', // 车辆特征方向
        psfx: '', // 拍摄方向
        cllxfl: '', // 车辆类型分类
        cllxzfl: '', // 车辆类型子分类
        table: {
          data: [],
          filter: {
            username: '',
            phone: '',
            company: '',
            image: {
              url: null,
              file: null
            },
          },
          rules: {},
          pagination: {
            currentPage: 1,
            total: 0,
            pageSize: 4
          }
        },
      }
    },
    mounted(){
      if(this.searchVeh != null && this.searchVeh.imgUrl != null){
        this.table.filter.image.url = this.searchVeh.imgUrl;
        this.cltzxl = this.searchVeh.cltzxl;
        this.canSearch = true;
      }
    },
    beforeDestroy(){
      // 触发清除参数方法
      if(this.searchVeh){
        this.$emit('leaveSJZX')
      }
    },
    methods: {
      handleImagePreview(file){
        console.log("handleImagePreview", file)
      },
      handleImageSelect(file){
        this.table.filter.image.url = this.getObjectURL(file.file)
        this.table.filter.image.file = file.file
        console.log('handleImageSelect 1 url:' + this.table.filter.image.url + '!')
        console.log('handleImageSelect 1 file:' + JSON.stringify(this.table.filter.image.file) + '!')


        const that = this;
        API.recognizeYtscImage(file.file).then(res => {
          let jo = JSON.parse(res.data['jsonResult'])
          if(jo.VEH == undefined){
            that.canSearch = false
            alert('请选择具有车辆的图片')
            return
          }
          let vehs = jo['VEH']
          if (vehs.length < 1) {
            that.canSearch = false
            alert('请选择具有车辆的图片')
            return 
          } else if (vehs.length > 1) {
            alert('请选择只有一辆车的图片')
            return 
          }
          that.canSearch = true
          that.cltzxl = vehs[0]['CLTZXL']
          that.psfx = vehs[0]['WZTZ']['PSFX']
          that.cllxfl = vehs[0]['CXTZ']['CLLXFL']
          that.cllxzfl = vehs[0]['CXTZ']['CLLXZFL']
        })
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      },
      fetchData(){
        console.log('this.table.filter.date=' + this.table.filter.date + '!')
        console.log('this.table.filter.time=' + this.table.filter.time + '!')
        if(this.table.filter.image.url == null){
          this.$alert('请选择图片', '提示', {
            confirmButtonText: '确定'            
          });
          return;
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            let pageOption = {
              page: this.table.pagination.currentPage,
              pageSize: this.table.pagination.pageSize,
              cltzxl: this.cltzxl,
              psfx: this.psfx,
              cllxfl: this.cllxfl,
              cllxzfl: this.cllxzfl
            }
            if (this.table.filter.date) {
              pageOption.startDate = this.formatDate('YYYY-mm-dd', this.table.filter.date[0])
              pageOption.endDate = this.formatDate('YYYY-mm-dd', this.table.filter.date[1])
            }
            if (this.table.filter.time) {
              pageOption.startTime = this.formatDate('HH:MM', this.table.filter.time[0])
              pageOption.endTime = this.formatDate('HH:MM', this.table.filter.time[1])
            }
            API.sjzxQueryVehicle(pageOption).then(res => {
              this.table.data = res.data.recs
              this.table.pagination.total = res.data.total
            })
          }
        })
      },
      formatDate(fmt, date) {
          let ret;
          const opt = {
              "Y+": date.getFullYear().toString(),        // 年
              "m+": (date.getMonth() + 1).toString(),     // 月
              "d+": date.getDate().toString(),            // 日
              "H+": date.getHours().toString(),           // 时
              "M+": date.getMinutes().toString(),         // 分
              "S+": date.getSeconds().toString()          // 秒
              // 有其他格式化字符需求可以继续添加，必须转化成字符串
          };
          for (let k in opt) {
              ret = new RegExp("(" + k + ")").exec(fmt);
              if (ret) {
                  fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
              };
          };
          return fmt;
      }
    }
  }
</script>

<style lang="scss">
  .page-sjzx-ytsc {
    .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;
      justify-content: space-between;

      .column-1 {
        width: 23%;
        height: 100%;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .search-form {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;

          .el-form-item {
            margin-bottom: 8px;
          }

          .el-form-item__label {
            font-size: 14px;
            color: #FFFFFF;
          }

          .el-input__inner {
            padding: 15px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
          }

          .el-date-editor {
            width: calc(100% - 110px);
            padding: 9px 12px;
            .el-input__icon {
              padding-bottom: 11px;
            }
            .el-range-input {
              font-size: 14px;
              color: #FFFFFF;
              background: transparent;
            }
            .el-range-separator {
              line-height: 14px;
              color: #FFFFFF;
            }
          }

          .type-select {
            width: calc(100% - 110px);
          }

          .image-upload {
            width: calc(100% - 24px);
            margin-left: 12px;
            height: 240px;
            margin-top: 44px;

            background: rgba(4, 95, 224, 0.3);
            border-radius: 4px;

            .el-upload {
              width: 100%;
              height: 100%;

              .el-image {
                width: 100%;
                height: 100%;
              }
            }

            .avatar-uploader-icon {
              font-size: 40px;
              color: white;

              text-align: center;
              margin-top: 100px;
            }
          }

          .button-search {
            width: calc(100% - 108px);
            margin-left: 66px;
            margin-top: 4px;
            display: inline-block;

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
      }

      .column-2 {
        width: calc(77% - 16px);
        height: 100%;

        background: rgba(4, 95, 224, 0.2);
        border-radius: 4px;

        .image-card {
          width: 162px;
          height: 160px;
          display: inline-block;

          margin: 14px 14px;
        }
      }
    }
  }
</style>
