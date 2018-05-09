<template>
  <div id="app">
    <ui-header></ui-header>
    <div class="wrap">
      <div class="wrapCont commonWidth">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
  import uiHeader from './components/header'
export default {
  name: 'App',
  components:{uiHeader}
}
</script>
<style>
  .wrap{
    width:100%;
    height:100%;
  }
  .commonWidth{
    width:1000px;
    margin:0 auto;
  }
</style>
<style>
  @import './assets/css/normalize.css';
</style>
