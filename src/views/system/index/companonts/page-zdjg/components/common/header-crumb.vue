<template>
    <div>
        <div class="header-crumb">
            <span>{{firstItem}}>{{secondItem}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'header-crumb',
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
    }
  }
</script>

<style scoped lang="scss">
    .header-crumb {
        width: 100%;
        height: 64px;

        background: rgba(0, 115, 255, 0.2);
        border-radius: 4px;

        font-size: 18px;
        color: #00F6FF;

        span {
            margin-left: 23px;
            line-height: 64px;
        }
    }
</style>
