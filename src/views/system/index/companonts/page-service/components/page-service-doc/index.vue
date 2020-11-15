<template>
  <div class="page-service-doc">
    <div class="page-body_wrapper">
      使用说明
    </div>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    data () {
      return {}
    },
  }
</script>


<style lang="scss">
  .page-service-doc {
    width: 100%;
    height: 100%;
    position: relative;

    background: url('../../image/background-container.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .page-body_wrapper {
      position: absolute;
      top: 40px;
      left: 60px;
      right: 60px;
      bottom: 40px;
      color: white;
    }
  }
</style>
