<template>
  <div>
    <b-navbar toggleable="lg">
      <!--<b-navbar-brand @click="mainPage">Hoodadak</b-navbar-brand>-->
      <div id="logo">
        <h2 @click="mainPage" style="padding-top: 5px"><b><i>Baedalinus</i></b></h2>
      </div>

      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <h6 v-if="isLogined === true">안녕하세여 <u><strong>{{getUserNickName}}</strong></u> 님</h6>
          <h6 v-if="isLogined===true" @click="myPage">내정보</h6>
          <h6 v-if="isLogined === true" @click="logout">로그아웃</h6>
          <h6 @click="login" v-else>로그인</h6>
          <h6 @click="post">주문하기</h6>
          <h6 @click="pagination">배달하기</h6>
          <h6 @click="chat">채팅
            <span v-if="sumOfUncheckedMsg!==0" class="badge badge-danger">{{this.sumOfUncheckedMsg}}</span>
          </h6>
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
        //  console.log(this.$store.dispatch('isKakaoLogined'));
        this.$router.push('/')
      },
      post: function () {
        this.$router.push('/post')
      },
      pagination: function () {
        this.$router.push('/pagination');
      },
      chat: function () {
        this.$router.push('/chatroomlist');
      },
      // 안읽은 메시지 수 업데이트 하는 함수
      update: function (val) {
        console.log(val);
        this.sumOfUncheckedMsg += val;
      },
      logout: function () {
        // 카카오 / 로컬 중에 뭘로 로그인 되어있는지 확인
        if (this.$cookie.get('access_token')) {
          this.$store.dispatch('localLogout');
          console.log('로컬 로그아웃');
        } else {
          this.$store.dispatch('kakaoLogout');
          console.log('카카오 로그아웃');

        }
        this.$cookie.delete('nickname'); // 헤더에 표시되는 닉네임 쿠키 삭제
        location.reload(true);
      },
      myPage: function () {
        this.$router.push('/myPage');
      },

    },
    created() {
      EventBus.$on('updateSumOfUncheckedMsg', this.update);
      //  this.$store.dispatch('isKakaoLogined') ;
      console.log('created에서 access token 확인' + this.$cookie.get('access_token'));

      //로그인 되어있는 로컬/카카오 계정 확인
      if (this.$cookie.get('access_token')) {
        this.$store.commit('IsLogined', {isLogined: true});
      } else {
        this.$store.dispatch('isKakaoLogined');
      }
      console.log('로그인 ? :' + this.$store.getters.IsLogined);
      console.log('created임 닉네임 쿠키 : ' + this.$cookie.get('nickname'));
      /*    if(this.$cookie.get('nickname') !== undefined){
            this.$store.commit('IsLogined', {isLogined:true});
          }*/


    },
    updated() {
      //   this.$store.dispatch('isKakaoLogined');
    },
    computed: {
      isLogined() {
        // console.log("asdasdsddsasdasdasdasd : " + this.$store.getters.IsLogined);
        console.log('computed에서 로컬로그인 먼저 확인 ' + this.$cookie.get('access_token'));

        console.log('computed cycle에서 isLogined 실행' + this.$store.getters.IsLogined);
        return this.$store.getters.IsLogined;
      },
      getUserNickName() {
        console.log('compuited임 닉네임 쿠키 : ' + this.$cookie.get('nickname'));
        return this.$cookie.get('nickname');
        //return this.$store.getters.getUserNickName;

      }
    },
    watch: {
      sumOfUncheckedMsg: function () {
        console.log('sumOfUncheckedMsg changed');
      }

    }
  }

</script>

<style scoped>
  html body {
    width: 100%;
    height: 100%;
    background-color: #E2904B;
  }

  div {
    color: #ffffff;
    background-color: #fd7e14;
  }

  #logo :hover {
    cursor: pointer;
  }

  h6 {
    margin: 10px;
    font-weight: bold;
  }

  h6:hover {
    cursor: pointer;
    color: #dee2e6;
  }

  h2:hover {
    color: #dee2e6;
  }

</style>
