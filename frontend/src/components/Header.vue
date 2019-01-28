<template>
  <div class="container">
    <div id="logo">
      <h2 @click="mainPage">LOGO</h2>
    </div>
      <div id="menu">
        <ul><li>내 정보</li>
          <li @click="login">로그인</li>
          <li>주문하기</li>
          <li>배달하기</li>
          <li @click="chat">채팅</li>
        </ul>
      </div>
      <hr>
    </div>
</template>

<script>
    export default {
        name: "Header",
     methods: {
          login: function () {
            this.$router.push('/login') // Login 페이지로 보내줌

          },
          mainPage: function () {
            this.$router.push('/')
          },
       chat:function(){
            this.$router.push('/chatroomlist');
       }
     }
    }
</script>

<style scoped>
.container {
  margin-top: -50px;
  width: 100%;
  height: 20%;
}
#logo {
  width: 20%;
  height: 100%;
  float: left;
  background-color: orange;
  cursor: pointer;
}
#logo :hover {
  color: #faff31
}
#menu {
  width: 80%;
  height: 100%;
  float: right;
}
ul {
  list-style:none;
  background-color: #000000;
  list-style-type: none;
  margin-left :60%;
  padding: 0;
  overflow: hidden;

}
  li{
    display:inline;
   background-color: black;
    color: white;
    padding: 8px;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
  }

li:hover {
  background-color: white;
  color: black;
  cursor: pointer}


.align-left {
  float:left;
}
.align-right {
  float:right;
}
</style>

