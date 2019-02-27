<template>
  <div class="outer">
    <div class="inner">
      <div class="form_box">
        <h1>LOG IN</h1>

        <input v-model="user.id" placeholder="your ID" v-on:keyup.enter="login()"><br/>
        <input v-model="user.pw" type="password" placeholder="your password" v-on:keyup.enter="login()"><br/>
        <button @click="login">login</button>
        <button @click="signUp">Sign Up</button>
        <!--<a id="kakao-login-btn"></a>-->
      </div>

      <!--<a href="https://kauth.kakao.com/oauth/authorize?client_id=6e5e709121be509e1ecc65d8e64a492f&redirect_uri=http://localhost:8080/auth&response_type=code">-->
        <!--<button id="kakaoLogin"/>-->
      <!--</a>-->

      <button id="kakaoLogin" @click="kakaoLogin"></button>

    </div>
  </div>
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
  .outer {
    font-family: "Franklin Gothic Demi";
    width: 100%;
    text-align: center;
  }
  .inner {
    display: inline-block;
  }
  .form_box {
    margin-top: 150px;
    text-align: left;
  }
  h1 {
    margin: 10px ;
  }
  input {
    width: 300px;
    margin:10px;
  }
  button {
    float:right;
    margin:10px;
    width:100px;
  }

  #kakaoLogin{
    background: url("../../assets/kakao_account_login_btn_medium_wide.png");
    width:300px;
    height:49px;
  }

</style>
