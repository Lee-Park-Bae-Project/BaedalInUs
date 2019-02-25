<template>
  <div class="outer">
    <div calss = "inner">
      <p id="header">Order List</p>
     <div v-for="board in pageArray" :key="board.no">
        <b-card title="hello">
        <b-card-text>
          address: {{board.addr}}
          order: {{board.content}}
          dueDate: {{board.dueDate}}
          fee: {{board.fee}}
        </b-card-text>
        </b-card>
      </div>
      <div class = "overflow-auto">
        <div>
          <b-pagination size = "md" :total-rows="100" v-model = "currentPage" @click="" :per-page="10"/>
          {{currentPage}}
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'PaginateList',
    data: function(){
      return {
        currentPage : 2,
        perPage: 10,
        pageArray:[]
      }
    },
      methods: {
        getData: function (event) {
          console.log('______________________---------------');
          axios.post('http://localhost:3000/showPost/orderPage/' + this.currentPage,{
              })
            .then(
              (response) => {
                console.log('----------response----------');
                console.log(response);
                console.log(response.status);
                if (response.status == 200) {
                  console.log('200');
                  console.log(response);
                  this.pageArray = response.data;
                } else if (response.status == 205) {
                  console.log('205');
                  alert('can not response');
                }
              },
            )
            .catch(error => {
              alert(error);
            })
        }, /*,
        }*/
      },
    created() {
      console.log('createdfsdfsdfsdsdf');
      this.getData();
    },watch: {
      currentPage: function(val,oldVal){
        //console.log('new : %s, old: %s',val, oldVal);
        this.getData();
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

