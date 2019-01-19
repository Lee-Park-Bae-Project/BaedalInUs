<template>
  <div id="main">
    <div>Login</div>
    <button v-on:click="login">logout</button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  method:{
    logout: function(event){
      console.log(`logout button clicked`);
      this.$router.push('/login') // Login 페이지로 보내줌
    }
  }
}
</script>

<style scoped>

</style>
