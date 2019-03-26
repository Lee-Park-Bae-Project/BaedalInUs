<template>
  <body>

  <div class="container">

    <form class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <input v-model="user.id" placeholder="your ID" v-on:keyup.enter="login()" type="email" class="form-control"
             required autofocus>
      <input v-model="user.pw" placeholder="your password" v-on:keyup.enter="login()" type="password"
             class="form-control" required>
      <div style="margin:10px">
        <label>Baedalinus가 처음이신가요?</label>
        <a href="#" @click="signUp">회원가입</a>
      </div>
      <button @click="login" class="btn btn-lg btn-primary btn-block border-0"
              style="background: #fd7e14; font-weight: bold"
              type="submit">Sign in
      </button>
      <button id="kakaoLogin" @click="kakaoLogin" class="btn btn-lg btn-block"></button>
    </form>

  </div> <!-- /container -->
  </body>
</template>

<script>
  import { EventBus} from "../../event-bus";
  import qs from 'querystring';


  export default {
    name: 'LoginPage',
    data: function () {
      return {
        user: {
          id: '',
          pw: ''
        },
        userToken: {
          access_token:'',
          token_type:'',
          refresh_token:'',
          expires_in:'',
          scope:'',
          refresh_token_expires_in:'',
        },
        userKakaoUID:'',
        userInfo:{
          id:'',
          properties:{
            nickname:'',
            profile_image:'',
            thumbnail_image:'',
          },
          kakao_account:{
            has_email:'',
            is_email_valid:'',
            is_email_verified:'',
            email:'',
            has_age_range:'',
            has_birthday:'',
            has_gender:''
          }

        }
      }
    },
    methods: {
      login: function (event) {
        this.$http.post('http://localhost:3000/auth/login', {
          user: this.user
        })
          .then(
            (response)=>{
              if(response.status === 200){

                this.$store.dispatch('localLogin',this.user.id);
                this.$cookie.set('access_token', response.data);
                console.log(response);
                this.$router.push('/') // 메인 페이지로 보내줌
              } else{
                alert(response.data.message);
              }
            },

            // (response) => {
            //   if (response.status === 200) {
            //     console.log(response);
            //     if (response.data.complete) {
            //       // 로컬 스토리지에 아이디 저장하기
            //       // localStorage.setItem('userID', this.user.id);
            //       // localStorage.setItem('userOID', response.data.oid);
            //       this.getSumOfUncheckedMsg(this.user.id);  // 읽지 않은 메시지 가져옴
            //       EventBus.$emit('joinToMyID', this.user.id);
            //       this.$router.push('/userList') // 유저목록 페이지로 보내줌
            //     } else {
            //       alert('wrong password')
            //     }
            //   } else if (response.status === 201) {
            //     console.log(`201`);
            //     alert('no matching id')
            //   }
            // },
            (error) => {
              alert(error.response.data.error)
            }
          )
          .catch(error => {
            alert(error)
          })
      },
      signUp:function(){
        this.$router.push('/signup'); //  sign up 페이지로 보내줌
      },
      getSumOfUncheckedMsg:function(id){
        this.$http.post('http://localhost:3000/api/chat/getSumOfUnCheckMsg',{id:id})
          .then(
            (res)=>{
              if(res.status===200){
                this.busUpdateSumOfUncheckedMsg(res.data.sumOfUncheckedMsg);
              } else{
                alert('err');
              }
            }
          )
          .catch(
            (err)=>{
              alert(err);
            }
          )
      },
      // 로그인 했을떄 읽지않은 메시지 수 넘겨줌 (header 에 표시함)
      busUpdateSumOfUncheckedMsg:function(newVal){
        // header.vue에서 받음
        // TODO 지금은 받는애가 없음
        EventBus.$emit('updateSumOfUncheckedMsg', newVal);
      },
      kakaoLogin:function(){
        this.$store.dispatch('kakaoLogin');
      },

    },
    mounted (){
      // console.log(this.$store.getters.getRESTAPIKEY);
    },
  }
</script>

<style scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #F8F8F9;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading {
    margin-bottom: 10px;
  }


  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  #kakaoLogin {
    background: url("../../assets/kakao_account_login_btn_medium_wide.png");
    height: 49px;
    border: 0;
  }

  #kakaoLogin:hover {
    background: url("../../assets/kakao_account_login_btn_medium_wide_ov.png");
    height: 49px;
    border: 0;
  }
</style>
