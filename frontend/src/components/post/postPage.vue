<template>
  <div class="outer">
    <div calss = "inner">
      <div class="form_box">

        <h1> Post your order</h1>

        <input v-model="board.title" placeholder="Title"><br/>
        <input v-model="board.content" placeholder="Content"><br/>
        <input v-model="board.fee" placeholder="Fee"><br/>
        <input v-model="board.addr" placeholder="Address"><br/>

        <button @click="post">Submit</button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'postPage',
      data: function () {

      return {
        board: {
          title:'',
          content:'',
          fee:'',
          addr:'',
          dueDate:''
        }
      }
    },
    methods: {
      post: function (event) {
        this.$http.post('http://localhost:3001/post/postOrder', {
          board: this.board
        })
          .then(
            (response) => {
              console.log('----------------------response--------------')
              console.log(response)
              console.log(response.status)
              if (response.status == 200) {
                console.log('200')
                console.log(response)
                if (!response.data.complete) {
                  //alert 띄우기
                  alert('wrong');
                }
              } else if (response.status == 201) {
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

