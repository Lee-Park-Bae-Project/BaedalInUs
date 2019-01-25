<template>
  <div id="top_container">
    <p>this is Bottom Vue</p>
    <p>©2019 LeeParkBae</p>
  </div>
</template>

<script>
  export default {
    name: "BottomVue",
  }
</script>

<style scoped>
  #top_container{
    align-content: center;
    position: absolute; left: 50%;
    transform: translateX(-50%);
    margin:30px;
  }

</style>
