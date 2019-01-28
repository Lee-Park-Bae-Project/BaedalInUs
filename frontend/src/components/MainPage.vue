<template>

  <div class="container">
    <div class="outer">
      <div class="inner">
        <SearchBar></SearchBar>
      </div>
    </div>

  </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar'
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
  html body {
    width: 100%;
    height: 100%;

  }

  .container {
    width: 70%;
    height: 70%;
    margin: 40px auto;
  }

  .outer {
    display: table;
    width: 100%;
    height: 100%;
  }

  .inner {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

</style>
