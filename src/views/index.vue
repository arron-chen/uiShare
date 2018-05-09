<template>
  <div class="index">
    <div class="content comomWidth">
      <ul class="list">
        <router-link to="share1" tag="li"><a>分享一</a></router-link>
        <router-link to="share2" tag="li"><a>分享二</a></router-link>
      </ul>
    </div>

  </div>

</template>
<script>
  export default {}
</script>
<style scoped>
  .comomWidth{
    width:1000px;
    margin:0 auto;
  }
.index{
  width:100%;
  height:100%;
}
.list{
  padding:30px 0 0 0;
}
.list li{
  width:120px;
  height:100px;
  float:left;
}

</style>
