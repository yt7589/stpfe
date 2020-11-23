<template>
    <div class="page-zdjg-qyjg" >
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">
            <div class="column-1" >
                <div style="padding: 16px; position: relative">
                    <el-input placeholder="地区名称" class="search-input"></el-input>
                    <button class="search-button"><span>搜索</span></button>
                    <button class="create-button"><span>添加</span></button>
                </div>
                <div>
                    <el-main v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
                        <el-table class="custom-table" :data="tableData">
                            <el-table-column align="center" prop="area_name" label="地区名称" minWidth="150"></el-table-column>
                            <el-table-column align="center" prop="" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini">修改</el-button>
                                    <el-button type="text" size="mini">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <div  class="button-page-group">
                        <button class="button-page" size="mini" icon="el-icon-arrow-up">上一页</button>
                        <button class="button-page" size="mini"  icon="el-icon-arrow-down">下一页</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderCrumb from '../common/header-crumb'
  export default {
    name: 'index',
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
      HeaderCrumb
    },
    data(){
      return {
        loading:false,
        tableData:[
          {
            area_name:"海淀区上地8街12号"
          }
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
    .body {
        margin-top: 8px;
        width: 100%;
        display: flex;
        .column-1 {
            width: 400px;
            height: 100%;
            display: inline-block;
            min-height: 100px;
            background: rgba(0, 115, 255, 0.2);
            border-radius: 4px;

            position: relative;
        }
    }

</style>
