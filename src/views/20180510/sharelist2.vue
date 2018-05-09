<template>
    <ul class="list">
      <router-link to="share21" tag="li"> scale 与 transfrom-origin，精准控制动画方向</router-link>
      <router-link to="share22" tag="li"> 画布-写字</router-link>
    </ul>
</template>
<script>
export default{
data(){
  return {}
  }
}
</script>
<style scoped>
  .list{
    width:100%;
    list-style: cjk-ideographic;
    margin-top:30px;
  }
  .list li{
    width:100%;
    height:30px;
    cursor: pointer;
    line-height:30px;
  }
</style>
