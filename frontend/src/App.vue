<template>
  <div id="app">
    <top-vue></top-vue>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <!--<bottom-vue></bottom-vue>-->
  </div>
</template>

<script>
import TopVue from "./components/TopVue";
import BottomVue from "./components/BottomVue";
export default {
  name: 'App',
  components: {TopVue, BottomVue}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:inline-block;
}
</style>
