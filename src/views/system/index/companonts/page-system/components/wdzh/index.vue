<template>
    <div class="page-system-wdzh">
        <header-crumb :first-item="firstItem" :second-item="secondItem"></header-crumb>
        <div flex-box="1" class="body">

        </div>
    </div>
</template>

<script>
  import HeaderCrumb from '@components/custom/header-crumb'
  export default {
    name: 'system-wdzh',
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
  }
</script>

<style lang="scss">
    .page-system-wdzh {
        .body{
            margin-top: 8px;
            width: 100%;
            display: flex;

        }
    }
</style>
