<template>
  <div id="app">
    <ui-header></ui-header>
    <router-view/>
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
  @import './assets/css/normalize.css';
</style>
