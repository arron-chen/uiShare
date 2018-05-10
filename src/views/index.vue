<template>
  <div class="index">
    <div class="content comomWidth">
      <ul class="list">
        <router-link to="sharelist1" tag="li"><a>分享2018.4.20</a></router-link>
        <router-link to="sharelist2" tag="li"><a>分享2018.5.10</a></router-link>
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
.list li:nth-child(1){
  margin:20px 20px 20px 0;
}
.list li{
  width:120px;
  height:100px;
  float:left;
  margin:20px;
  cursor:pointer;
  box-shadow:1px 2px 5px #efefef;
  text-align:center;
}
.list li:hover{
  box-shadow:2px 5px 10px #efefef;
}

</style>
