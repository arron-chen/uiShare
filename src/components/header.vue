<template>
  <header class="header">
    <div class="headerCont commonWidth">
             <span>
            UI前端分享
        </span>
    </div>

  </header>
</template>
<script>
  export default {
    name:'ui-header'
  }
</script>
<style scoped>
  .header{
    width:100%;
    height:70px;
    line-height:70px;
    background: linear-gradient(to left bottom,#2d8cf0,#2db7f5);
  }
  .headerCont{
    width:1000px;
    margin:0 auto;
  }
  .headerCont span{
    font-size:18px;
    color:#efefef;
  }
</style>
