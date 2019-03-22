<template>
  <body>
  <div class="container">

    <form class="form-signin">
      <h2 class="form-signin-heading">Create your account</h2>
      <input v-model="user.id" placeholder="ID" type="text" class="form-control" required autofocus>
      <input v-model="user.pw" placeholder="Password" type="password"
             class="form-control" required>
      <input v-model="user.name" placeholder="Full name" type="text" class="form-control"
             style="border-radius: 0; margin-top: -1px" required>
      <input v-model="user.email" placeholder="your-email@example.com" type="email"
             class="form-control" required>
      <input v-model="user.nickname" placeholder="nickname" type="text"
             class="form-control" required>
      <button v-on:click="signUp" class="submit btn btn-lg btn-success btn-block">Sign up</button>
    </form>

  </div> <!-- /container -->
  </body>
</template>

<script>
  export default {
    name: 'SignUpPage',

    data: function () {
      return {
        user: {
          id: '',
          pw: '',
          name: '',
          email: '',
          nickname:'',
        },

      }
    },
    methods: {
      signUp: function (event) {
        console.log(`button clicked`);
        this.$http.post('http://localhost:3000/auth/signUp', { // axios 사용
          user: this.user
        })
          .then((response) => {
            if (response.status === 204) {
              if (response.data.complete === false) {
                alert('아이디가 중복됩니다.');
              }
            }
            if (response.status === 201) {
              if (response.data.complete === true) {
                alert('회원가입이 완료되었습니다.');
                this.$router.push('/login') // Login 페이지로 보내줌
              }
            }
          })
          .catch(function (error) {
            alert('error')
          })
      }
    }
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

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="email"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-signin input[type="password"] {
    border-radius: 0;
  }
</style>
