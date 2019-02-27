<template>
  <div>
    <a href="https://kauth.kakao.com/oauth/authorize?client_id=6e5e709121be509e1ecc65d8e64a492f&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code">kakao</a>
  </div>

</template>


<script>
  export default{
    data(){
      return {
        app_key:'6e5e709121be509e1ecc65d8e64a492f',
        redirect_uri:'http://localhost:3000/api'
      }
    },
  }
</script>

<style>
</style>
