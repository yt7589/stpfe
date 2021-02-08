<template>
  <div>
    <div class="page-wzgl-wzjg" v-if="!ilsDetail.visible && !ilsHistory.visible">
      <div class="header-crumb">
        <span>违章管理>违章监管</span>
      </div>
      <div class="body">
        <div class="column-1">
          <el-form class="search-form">
            <el-form-item label="">
              <el-date-picker
                v-model="table.filter.date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="类别" v-model="table.filter.type">
                <el-option v-for="item in table.option.areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="车辆类型" v-model="table.filter.carType">
                <el-option v-for="item in table.option.typeOptions" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select placeholder="违章类型" v-model="table.filter.wzlx">
                <el-option v-for="item in table.option.ilsTypeOptions" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="车牌号" v-model="table.filter.cph">

              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="地点" v-model="table.filter.location">

              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="button-search" @click="fetchData">
                搜索
                <el-image :src="require('../../image/image-search.png')"></el-image>
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="button-export">
                导出
                <el-image :src="require('../../image/image-export.png')"></el-image>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="column-2">
          <el-container class="table-container">
            <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
              <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
                <el-table-column align="center" prop="ilTime" label="时间" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="ilAddr" label="地点" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="hmhp" label="车牌号" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="category" label="类别" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="types" label="车辆类型" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="ilTypes" label="违章类型" minWidth="60"></el-table-column>
                <el-table-column align="center" prop="" label="详情" minWidth="60">
                  <template slot-scope="scope">
                    <el-image :src="scope.row.imageUrl">
                      <div slot="error"></div>
                    </el-image>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="" label="操作" minWidth="60">
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click="handleDetailView(scope.row)">查看详情</el-button>
                    <el-button size="small" type="text" @click="handleHistoryView(scope.row)">车辆历史</el-button>
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
    <ils-detail :visible.sync="ilsDetail.visible" :data="ilsDetail.data" class="page-wzgl-wzjg-ils-detail"></ils-detail>
    <ils-history v-if="ilsHistory.visible" :visible.sync="ilsHistory.visible" :data="ilsHistory.data" @view="handleDetailView" class="page-wzgl-wzjg-ils-history"></ils-history>
  </div>
</template>

<script>
  import API from '@/api'
  import IlsDetail from './ils-detail.vue'
  import IlsHistory from './ils-history.vue'
  import util from '@/libs/util'
  export default {
    components: {IlsDetail, IlsHistory},
    props:['wzDetail'],
    data(){
      return {
        loading: false,
        table: {
          data: [],
          filter: {
            username: '',
            phone: '',
            company: ''
          },
          option: {
            typeOptions: [],
            areaOptions: [{
              label: "全部",
              value: null
            }, {
              label: "本地",
              value: 0
            }, {
              label: "外埠",
              value: 1
            }]
          },
          pagination: {
            currentPage: 1,
            total: 0,
            pageSize: 20
          }
        },
        ilsDetail: {
          visible: false,
          data: {}
        },
        ilsHistory: {
          visible: false,
          data: {}
        }
      }
    },
    mounted(){
      this.fetchData()
      this.initParam()
      if(this.wzDetail != null){
        this.handleDetailView(this.wzDetail);
      }
    },
    methods: {
      initParam(){
        API.queryVehicleTypes().then(res => {
          this.table.option.typeOptions = [{typeId: null, typeName: "全部"}].concat(res.data)
        })
        API.queryIlsTypes().then(res => {
          this.table.option.ilsTypeOptions = [{typeId: null, typeName: "全部"}].concat(res.data)
        })
      },
      fetchData(){
        API.queryIllegalVehicle({
          page: this.table.pagination.currentPage,
          pageSize: this.table.pagination.pageSize,
        }).then(res => {
          this.table.data = res.data.recs
          this.table.pagination.total = res.data.total
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
      handleDetailView(row){
        let that = this;
        API.queryIlsDat({tvisJsonId: row.tvisJsonId,vehIdx: row.vehIdx}).then(res => {
          that.ilsDetail.data = res.data
          that.ilsDetail.visible = true
          that.ilsHistory.visible = false
        })
      },
      handleHistoryView(row){
        this.ilsHistory.data = row
        this.ilsHistory.visible = true
      }
    }
  }
</script>

<style lang="scss">
  .page-wzgl-wzjg {
    width: 100%;
    height: 100%;
    .body {
      width: 100%;
      height: calc(100% - 72px);
      margin-top: 8px;
      display: flex;

      .column-1 {
        width: 16%;
        height: 100%;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .search-form {
          position: absolute;
          top: 24px;
          left: 24px;
          right: 24px;

          .el-form-item {
            margin-bottom: 8px;
          }

          .el-input__inner {
            padding: 15px;
            background: rgba(4, 95, 224, 0.5);
            border-radius: 4px;
            border: 1px solid #045FE0;
            color: white;
          }

          .el-date-editor {
            width: 100%;
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

          .el-select {
            width: 100%;
          }

          .button-search {
            width: 100%;

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

          .button-export {
            width: 100%;

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
        }
      }

      .column-2 {
        width: calc(84% - 8px);
        height: 100%;
        margin-left: 8px;
        display: inline-block;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        position: relative;
        .table-container {
          position: absolute;
          top: 4px;
          right: 4px;
          bottom: 4px;
          left: 4px;

          .el-image {
            width: 100px;
            height: 60px;
          }

          .el-footer {
            height: 50px !important;
            text-align: right;
          }
        }
      }
    }
  }
</style>
