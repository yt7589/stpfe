<template>
    <div class="page-sbgl-kjgl" flex="dir:top">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-2">
                <el-container class="table-container">
                    <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                        <el-table class="custom-table wzgl-table" :data="table.data" height="100%">
                            <el-table-column align="center" prop="city" label="地区名称" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="num" label="上一级" minWidth="60"></el-table-column>
                            <el-table-column align="center" prop="" label="操作" minWidth="40">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini">修改</el-button>
                                    <el-button type="text" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
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
  import HeaderCrumb from '@components/custom/header-crumb'
  export default {
    name: 'sbgl-kjgl',
    props:{
      firstItem:{
        type:String,
        required:false,
        default:''
      },
      secondItem:{
        type:String,
        required:false,
        default:''
      }
    },
    components:{
      HeaderCrumb,
    },
    data(){
      return {
        loading: false,
        table: {
          data: [],
          filter: {
            num: '',
            type: ''
          },
          pagination: {
            currentPage: 1,
            total: 1000,
            pageSize: 20
          }
        }
      }
    },
    methods: {
      handleSizeChange(size){
        this.table.pagination.pageSize = size
        this.fetchData()
      },
      handleCurrentChange(page){
        this.table.pagination.page = page
        this.fetchData(page)
      }
    }
  }
</script>

<style lang="scss">
    .page-sbgl-kjgl {
        .body {
            margin-top: 8px;
            width: 100%;
            height: calc(100% - 72px);
            display: flex;


            .column-2 {
                width: 100%;
                height: 100%;
                /*margin-left: 8px;*/
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

                    .el-footer {
                        height: 50px !important;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
