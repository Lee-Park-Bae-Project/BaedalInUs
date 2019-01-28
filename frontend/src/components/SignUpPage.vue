<template>
  <div id="SignUp">

    <div> Sign Up </div>
    <!--<table id="signUpForm">-->
      <!--<tr>-->
        <!--<td>-->
          <!--<span>name:</span>-->
        <!--</td>-->
        <!--<td>-->
          <!--<input v-model="user.name" placeholder="name">-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>-->
          <!--<span>ID:</span>-->
        <!--</td>-->
        <!--<td>-->
          <!--<input v-model="user.id" placeholder="ID">-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>-->
          <!--<span>password:</span>-->
        <!--</td>-->
        <!--<td>-->
          <!--<input v-model="user.pw" type="password"  placeholder="password">-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td colspan="2">-->
          <!--<button v-on:click="signUp">SignUp</button>-->
        <!--</td>-->
      <!--</tr>-->
    <!--</table>-->

    Name : <input v-model="user.name" placeholder="name"> <br />
    ID : <input v-model="user.id" placeholder="ID"> <br />
    Password : <input v-model="user.pw" type="password"  placeholder="password">
    <button v-on:click="signUp" >SignUp</button>
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
        name: ''
      }
    }
  },
  methods: {
    signUp: function (event) {
      console.log(`button clicked`);
      this.$http.post('/signup', { // axios 사용
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
  #SignUp{
    margin-top: 100px;
  }
  #signUpForm{
    text-align: center;
    display: inline-block;
  }
</style>
