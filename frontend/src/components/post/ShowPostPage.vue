<template>
  <div class="outer">
    <div calss = "inner">
      <p id="header">Order List</p>
     <div v-for="board in boards">
        <b-card title="hello">
        <b-card-text>
          address: {{board.addr}}
          order: {{board.content}}
          dueDate: {{board.dueDate}}
          fee: {{board.fee}}
        </b-card-text>
        </b-card>
      </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ShowPostPage',
    data: function () {
      return {
        boards:[]
      }
    },
    methods: {
      getData: function (event) {
        this.$http.post('http://localhost:3001/showPost/showAllBoard', {
        })
          .then(
            (response) => {
              console.log('----------------------response--------------')
              console.log(response)
              console.log(response.status)
              if (response.status == 200) {
                console.log('200')
                console.log(response)
                this.boards=response.data;
              } else if (response.status == 205) {
                console.log(`205`);
                alert('no matching id')
              }
            },
          )
          .catch(error => {
            alert(error)
          })
      }
    },
    created(){
      this.getData();
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

