<template>
  <div class="outer">
    <div class="inner">
      <div id="logo">
        <h2 @click="mainPage">Hoodadak</h2>
      </div>
      <div id="menu">
        <ul>
          <li>내 정보</li>
          <li @click="login">로그인</li>
          <li>주문하기</li>
          <li>배달하기</li>
          <li @click="chat">채팅
            <!--<span v-if="this.sumOfUncheckedMsg !==0" class="badge badge-danger">{{this.sumOfUncheckedMsg}}</span>-->
            <span v-if="sumOfUncheckedMsg!==0" class="badge badge-danger">{{this.sumOfUncheckedMsg}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import {EventBus} from "../event-bus";

  export default {
    name: "Header",
    data() {
      return {
        sumOfUncheckedMsg: 0,
      }
    },
    methods: {
      login: function () {
        this.$router.push('/login') // Login 페이지로 보내줌

      },
      mainPage: function () {
        this.$router.push('/')
      },
      chat: function () {
        this.$router.push('/chatroomlist');
      },
      // 안읽은 메시지 수 업데이트 하는 함수
      update: function (val) {
        console.log(val);
        this.sumOfUncheckedMsg += val;
      },

    },
    created(){
      EventBus.$on('updateSumOfUncheckedMsg', this.update);
    },
    watch:{
      sumOfUncheckedMsg:function(){
        console.log('sumOfUncheckedMsg changed');
      }

    }
  }

</script>

<style scoped>
  html body {
    width: 100%;
    height: 100%;

  }

  #logo {
    width: 20%;
    float: left;
    cursor: pointer;
    font-family: "Cooper Black";

  }

  #logo :hover {
    color: #faff31
  }

  #menu {
    width: 80%;
    float: right;
  }

  ul {
    list-style: none;
    background-color: #000000;
    list-style-type: none;
    margin-left: 60%;
    padding: 0;
    overflow: hidden;

  }

  li {
    display: inline;
    background-color: black;
    color: white;
    margin: 10px;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
  }

  li:hover {
    background-color: white;
    color: black;
    cursor: pointer
  }

  .outer {
    font-family: "Franklin Gothic Demi";
    width: 100%;
    height: 100%;
  }

  .inner {
    margin: 1%;
    width: 90%;
    height: 100%;
    display: inline-block;

  }

</style>

