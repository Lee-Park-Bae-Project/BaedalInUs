<template>
  <div id="app">
    <header-component></header-component>
      <router-view/>
  </div>
</template>

<script>
  import chatVue from "./components/ChatRoom";
  import HeaderComponent from '@/components/Header.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      chatVue
    }
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
  }


  body {
    background-color: #E2904B;
  }


</style>
