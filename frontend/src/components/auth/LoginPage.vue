<template>
  <div class="outer">
    <div class="inner">
      <div class="form_box">
        <h1>LOG IN </h1>

        <input v-model="user.id" placeholder="your ID"><br/>
        <input v-model="user.pw" type="password" placeholder="your password"><br/>
        <button @click="login">login</button>
        <button @click="signUp">Sign Up</button>

      </div>
    </div>
  </div>
</template>

<script>
  import { EventBus} from "../../event-bus";

  export default {
    name: 'LoginPage',
    data: function () {
      return {
        user: {
          id: '',
          pw: ''
        }
      }
    },
    methods: {
      login: function (event) {
        this.$http.post('http://localhost:3000/auth/login', {
          user: this.user
        })
          .then(
            (response) => {
              console.log('----------------------response--------------')
              console.log(response);
              console.log(response.status)
              if (response.status === 200) {
                console.log(response)
                if (response.data.complete) {
                  // 로컬 스토리지에 아이디 저장하기
                  localStorage.setItem('userID', this.user.id);
                  localStorage.setItem('userOID', response.data.oid);
                  this.getSumOfUncheckedMsg(this.user.id);  // 읽지 않은 메시지 가져옴
                  this.$router.push('/userList') // 유저목록 페이지로 보내줌
                } else {
                  alert('wrong password')
                }
              } else if (response.status === 201) {
                console.log(`201`);
                alert('no matching id')
              }
            },
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
        this.$http.post('http://localhost:3000/chat/getSumOfUnCheckMsg',{id:id})
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
        EventBus.$emit('updateSumOfUncheckedMsg', newVal);
      }
    }
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

</style>
