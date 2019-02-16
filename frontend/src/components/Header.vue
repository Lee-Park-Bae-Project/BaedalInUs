<template>
  <div>
    <b-navbar toggleable="lg">
      <!--<b-navbar-brand @click="mainPage">Hoodadak</b-navbar-brand>-->
      <div id="logo">
        <h2 @click="mainPage">Hoodadak</h2>
      </div>
      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>내정보</b-nav-item>
          <b-nav-item @click="login">로그인</b-nav-item>
          <b-nav-item href="#">주문하기</b-nav-item>
          <b-nav-item href="#">배달하기</b-nav-item>
          <b-nav-item @click="chat">채팅
            <span v-if="sumOfUncheckedMsg!==0" class="badge badge-danger">{{this.sumOfUncheckedMsg}}</span>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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

  .menu{
    float:right;
  }

  /*#logo {*/
    /*width: 20%;*/
    /*float: left;*/
    /*cursor: pointer;*/
    /*font-family: "Cooper Black";*/
  /*}*/

  #logo :hover {
    color: #faff31
  }

  /*#menu {*/
    /*float: right;*/
    /*background: black;*/
    /*color:white;*/
  /*}*/

  /*ul {*/
    /*list-style: none;*/
    /*!*background-color: #000000;*!*/
    /*list-style-type: none;*/
    /*margin-left: 60%;*/
    /*padding: 0;*/
    /*overflow: hidden;*/

  /*}*/

  /*li {*/
    /*display: inline;*/
    /*!*background-color: black;*!*/
    /*color: white;*/
    /*margin: 10px;*/
    /*text-decoration: none;*/
    /*text-align: center;*/
    /*font-weight: bold;*/
  /*}*/

  /*li:hover {*/
    /*background-color: white;*/
    /*color: black;*/
    /*cursor: pointer*/
  /*}*/

  /*.outer {*/
    /*font-family: "Franklin Gothic Demi";*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

  /*.inner {*/
    /*margin: 1%;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*display: inline-block;*/

  /*}*/

</style>

