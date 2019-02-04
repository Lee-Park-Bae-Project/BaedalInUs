<template>
  <div id="app">
    <header-component></header-component><br/>
    <router-view/><br/>
    <bottom-component></bottom-component><br/>
  </div>
</template>

<script>
  import chatVue from "./components/chat/ChatRoom.vue";
  import HeaderComponent from './components/Header.vue';
  import BottomComponent from './components/BottomVue.vue';

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

  }
  body {
    background-color: #E2904B;
    overflow: auto;
  }

</style>
