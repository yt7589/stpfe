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
