<template>

    <div class="outer">
      <div class="inner">
        <div class="form_box">

          <h1>Create new account</h1><br/>
          <strong>Your name</strong><br/>
          <input v-model="user.name" placeholder="Full name"><br/>
          <strong>Your E-mail</strong><br/>
          <input v-model="user.email" placeholder="your-email@example.com"><br/>
          <strong>Your ID</strong><br/>
          <input v-model="user.id" placeholder="ID"> <br/>
          <strong>Your password</strong><br/>
          <input v-model="user.pw" type="password" placeholder="Password"><br/>
          <button class="submit" v-on:click="signUp">SignUp</button>

        </div>
      </div>
    </div>
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
        email:''
      },

    }
  },
  methods: {
    signUp: function (event) {
      console.log(`button clicked`);
      this.$http.post('/auth/signUp', { // axios 사용
        user: this.user
      })
        .then((response) => {
          console.log(`----------------response---------------------`);
          console.log(response);
          console.log(response.status);

          if (response.status === 204) {
            alert('Error, please, try again')
          }
          if (response.status === 201) {
            alert('Success');
            this.$router.push('/login') // Login 페이지로 보내줌
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
  .outer {
    font-family: "Franklin Gothic Demi";
    width: 100%;
    text-align: center;
  }
  .inner {
    display: inline-block;
  }
  input {
    width: 300px;
    margin-top: 5px;
    margin-bottom: 15px;
    height: 25px;
  }
  .form_box {
    margin-top: 80px;
    text-align: left;
  }
  .check_button {
    margin-left: 10px;
  }
  .submit {
    float: right;
    margin-top: 10px;
    margin-right: 5px;
    width: 100px;
  }

</style>
