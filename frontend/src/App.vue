<template>
  <div id="app">
    <header-component></header-component>
    <router-view/>
    <bottom-component></bottom-component>

  </div>
</template>

<script>
  import chatVue from "./components/ChatRoom";
  import HeaderComponent from '@/components/Header.vue';
  import BottomComponent from '@/components/BottomVue.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      chatVue,
      BottomComponent
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
