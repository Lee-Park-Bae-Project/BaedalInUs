<template>
  <div>
    <p>auth page</p>
    <!--<p>{{authorize_code}}</p>-->
    <!--<p>{{userToken.access_token}}</p>-->
    <!--<p>{{userToken.expires_in}}</p>-->
    <!--<p>{{userToken.refresh_token}}</p>-->
    <!--<p>{{userToken.refresh_token_expires_in}}</p>-->
    <!--<p>{{userToken.token_type}}</p>-->

    <!--<input type="text" v-model="userInfo.name" placeholder="이준호">-->
    <!--<input type="text" v-model="userInfo.age" placeholder="25">-->
    <a id="kakao-login-btn"></a>


  </div>
</template>


<script>
  /**
   * access_token은 발급 받은 후 12시간-24시간(정책에 따라 변동 가능)동안 유효합니다.
   * refresh token은 한달간 유효하며, refresh token 만료가 1주일 이내로 남은 시점에서
   * 사용자 토큰 갱신 요청을 하면 갱신된 access token과 갱신된 refresh token이 함께 반환됩니다.
   * https://developers.kakao.com/docs/restapi/user-management
   */
  import qs from 'qs';
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {
    name: "auth",
    data() {
      return {
        authorize_code: this.$route.query.code,
        userToken: {
          access_token: '',
          expires_in: '',
          refresh_token: '',
          refresh_token_expires_in: '',
          scope: '',
          token_type: '',
        },
        userInfo: {
          name: '',
          age: '',
        }
      }
    },
    methods: {
      getUserInfo: function () {
        const url = 'https://kapi.kakao.com/v2/user/me';
        const requestBody = qs.stringify({});

        const config = {
          headers: {
            'Authorization': 'Bearer ' + this.userToken.access_token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        };

        this.$http.post(url, requestBody, config)
          .then(
            (res) => {
              console.log(res);
            }
          )
          .catch(
            (err) => {
              console.log(err);
            }
          )


      },
      testf: function(){
        const config = {
          headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTA3ODE0NTcsImV4cCI6MTU1MTM4NjI1NywiaXNzIjoiaG9vZGFkYWsiLCJzdWIiOiJ1c2VySW5mbyJ9.wkAyyypjkTUsM-LUOwkV43xRsE8pHS9Doht4Y0yLP1Q'
          }
        }
        this.$http.post('http://localhost:3000/api/logout', {}, config)
          .then(
            res=>{
              console.log(res);
            }
          )
        .catch(
          err=>{
            console.log(err);
          }
        )
      },
      testf2: function(){
        const config = {
          headers:{
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTA3ODE0NTcsImV4cCI6MTU1MTM4NjI1NywiaXNzIjoiaG9vZGFkYWsiLCJzdWIiOiJ1c2VySW5mbyJ9.wkAyyypjkTUsM-LUOwkV43xRsE8pHS9Doht4Y0yLP1Q'
          }
        }

        this.$http.get('http://localhost:3000/api/logout', config)
          .then(
            res=>{
              console.log(res);
            }
          )
          .catch(
            err=>{
              console.log(err);
            }
          )

      }
    },
    mounted () {
      this.$store.commit('setAuthorize_code', {authorize_code:this.$route.query.code}); // authorize_code 저장
      // console.log(this.$store.getters.getAuthorize_code);
      // console.log(this.$store.getters.getRedirect_uri);
      // console.log(this.$store.getters.getRESTAPIKEY);

      // this.$store.dispatch('getUserToken'); // 사용자 토큰 받아오기
      // this.$store.dispatch('kakaoLogin');

      // // eslint-disable-next-line
      // Kakao.init('b505e1e8f763054ca5204fc1a8852a05')
      // // eslint-disable-next-line
      // Kakao.Auth.createLoginButton({
      //   container: '#kakao-login-btn',
      //   success: function (authObj) {
      //     // 로그인 성공시, API를 호출합니다.
      //     // eslint-disable-next-line
      //     Kakao.API.request({
      //       url: '/v2/user/me',
      //       success: function (res) {
      //         alert(JSON.stringify(res))
      //       },
      //       fail: function (error) {
      //         alert(JSON.stringify(error))
      //       }
      //     })
      //   },
      //   fail: function (err) {
      //     alert(JSON.stringify(err))
      //   }
      // })
    },
    created(){
      this.testf();
    }
  }


</script>


<style scoped>

</style>
