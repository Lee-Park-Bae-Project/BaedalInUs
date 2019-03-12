<template>
  <div>
    <p>프사</p>
    <img v-bind="profile_image"/>
  </div>
</template>

<script>
  export default {
    name: "myPage",
    data() {
      return {
        profile_image: '', // 프사이미지
      }
    },
    mounted(){
      //this.profile_image = this.$store.getters.userInfo.properties.profile_image;
     // console.log('프사 링크'+this.profile_image);
    }

  }
</script>

<style scoped>


</style>
