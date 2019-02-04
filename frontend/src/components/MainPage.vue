<template>
    <div class="outer">
      <div class="inner">
        <SearchBar></SearchBar>
      </div>
    </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue'
  export default {
    name: 'MainPage',
    methods: {
      logout: function (event) {
        console.log(`logout button clicked`);
        this.$router.push('/login') // Login 페이지로 보내줌
      }
    },
    components: {
      SearchBar
    }
  }
</script>

<style scoped>


  .outer {
    font-family: "Franklin Gothic Demi";
    width: 100%;
    height: 100%;
    text-align: center;
    align-content: center;

  }

  .inner {
    display: inline-block;

  }
</style>
