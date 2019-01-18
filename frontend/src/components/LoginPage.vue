<template>
    <div id="login">
      <div>Login</div>
      <input v-model="user.id" placeholder="ID"><br/>
      <input v-model="user.pw" type="password" placeholder="password"><br/>
      <button v-on:click="login">login</button>
      <a v-bind:href="url.singUpURL">Sign up</a>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data: function () {
    return {
      user: {
        id: '',
        pw: ''
      },
      url: {
        singUpURL: '/SignUpPage'
      }
    }
  },
  methods: {
    login: function (event) {
      this.$http.post('/login', {
        user: this.user
      })
        .then(
          (response) => {
            console.log('----------------------response--------------');
            console.log(response);
            console.log(response.status);
            if(response.status == 200){
              console.log(`200`);
              console.log(response);
              if(response.data.complete){
                alert(`login success`);
              } else{
                alert('wrong password');
              }
            } else if(response.status==201){
              console.log(`201`);
              alert('no matching id');
            }
          },
          (error) => {
            alert(error.response.data.error)
          }
        )
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
