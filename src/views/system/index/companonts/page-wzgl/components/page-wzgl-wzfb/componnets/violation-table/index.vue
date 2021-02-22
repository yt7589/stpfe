<template>
  <div class="violation-table">
    <div class="window-wrapper">
      <div class="header">
        <span>
          <el-image :src="require('../../../../image/image-chart.png')" class="topic-icon"></el-image>
          <span>违章统计列表</span>
        </span>

        <span>总数量：{{table.pagination.total}}条</span>
      </div>
      <el-table :data="table.data" class="custom-table">
        <el-table-column prop="siteName" label="位置" align="center" minWidth="60"></el-table-column>
        <el-table-column prop="count" label="违章数" align="center" minWidth="40"></el-table-column>
      </el-table>
      <div class="button-box">
        <el-button @click="getListPrev()" type="text" icon="el-icon-arrow-up">上一页</el-button>
        <el-button @click="getListNext()" type="text" icon="el-icon-arrow-down">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/api'

  export default {
    props: ['data', 'filter'],
    components: {},
    data(){
      return {
        frm:{
          amount:10,
          startIndex:0,
          direction:0,
        },
        page:1,
        table: {
          data: [],
          pagination: {
            currentPage: 1,
            total: 0,
            pageSize: 10
          },
        },
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      getListPrev(){
        let page = this.page
        if (page > 1){
          this.page = page - 1
          this.frm.startIndex = (this.page - 1) * this.frm.amount
        }else{
          this.frm.startIndex = 0
        }
        this.frm.direction = 0
        this.fetchData()
      },
      getListNext(){
        let page = this.page
        this.page = page + 1
        this.frm.startIndex = (this.page - 1) * this.frm.amount
        this.frm.direction = 1
        this.fetchData()
      },
      close(){
        this.$emit("close")
      },
      fetchData(){
        API.queryIllegal(this.frm).then(res => {
          this.table.data = res.data.recs
          this.table.pagination.total = res.data.total
        })
      }
    }
  }
</script>

<style lang="scss">
  .violation-table {
    width: 100%;
    height: 100%;

    position: relative;
    .window-wrapper {
      position: absolute;
      top: 22px;
      bottom: 14px;
      left: 20px;
      right: 20px;
    }

    .header {
      color: #FFFFF0;
      font-size: 18px;
      display: flex;
      justify-content: space-between;

      .topic-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }

    .custom-table {
      height: unset;
      max-height: calc(100% - 100px);
      margin-top: 10px;
      background: transparent !important;

      .el-table__row {
        cursor: pointer;
      }
    }

    .button-box {
      position: absolute;
      bottom: 0px;
      left: calc(50% - 88px);
      margin-top: 14px;
      text-align: center;

      .el-button {
        background: #0073FF;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #000205;

        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
</style>
