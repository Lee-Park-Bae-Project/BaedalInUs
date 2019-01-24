<template>
  <div>
    <button v-on:click="goChatRooms">채팅방</button>
  </div>
</template>

<script>
    export default {
        name: "TopVue",
      methods:{
          goChatRooms(){
            this.$router.push('/ChatRooms') // 채팅방 페이지로 보내줌
          }

      }
    }
</script>

<style scoped>

</style>
