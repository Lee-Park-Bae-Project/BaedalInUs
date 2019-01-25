<template>
  <div>
    <div id="top_nav">
      <b-nav tabs id="nav">
        <b-nav-item active>로그인</b-nav-item>
        <b-nav-item>내정보</b-nav-item>
        <b-nav-item>주문하기</b-nav-item>
        <b-nav-item>배달하기</b-nav-item>
        <b-nav-item v-on:click="goChatRooms">채팅</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopVue",
    methods: {
      goChatRooms() {
        this.$router.push('/ChatRooms') // 채팅방 페이지로 보내줌
      }

    }
  }
</script>

<style scoped>
#top_nav{
  display: inline-block;
  margin-bottom: 30px;
  width:1000px;
  align-content: center;
  position: absolute; left: 50%;
  transform: translateX(-50%);
}
</style>
