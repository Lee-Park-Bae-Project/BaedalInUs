<template>
  <div class="outer">
    <div class="inner">


      <p id="header">Order List</p>
      <div v-for="board in pageArray" :key="board.no">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"> </v-img>
        <v-card-title primary-title>

          <div>
            <div class="headline">Top</div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>

        </v-card-title>
        <v-card-text>
          title:{{board.title}}
          address:{{board.addr}}
          order:{{board.content}}
          dueDate:{{board.dueDate}}
          fee:{{board.fee}}
        </v-card-text>

      </div>



    </div>
  </div>
</template>

<script>
  import axios from 'axios'

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

