<template>
  <body>
  <div id="container" style="background:#F8F8F9">
    <div id="header">Main</div>
    <div id="menu" style="float:left; padding-left:20px">
      <div v-for="board in pageArray" style="background: #ffffff">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="300px" style="width:300px"></v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">Top</div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>
        </v-card-title>
        <v-card-text>
          address: {{board.addr}} {{board.detailedAddr}}
          <br>
          order: {{board.content}}
          <br>
          dueDate: {{board.dueDate}}
          <br>
          fee: {{board.fee}}
          <br>
          <span @click="sendMsgPpt(board)">
              <i class="fas fa-sms"></i>
            </span>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green"
                 @click="singleBoard(board.id)">View
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <div id="content" style="padding:50px"><h1>여기에 상세정보 들어갈거임</h1></div>
  </div>
  </body>
</template>

<script>
  import axios from "axios";

  export default {
    name: "PaginateList",
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        pageArray: []
      };
    },
    methods: {
      getData: function (event) {
        console.log("______________________---------------");
        axios
          .post(
            "http://localhost:3000/showPost/orderPage/" + this.currentPage,
            {}
          )
          .then(response => {
            console.log("----------response----------");
            console.log(response);
            console.log(response.status);
            if (response.status == 200) {
              console.log("200");
              console.log(response);
              this.pageArray = response.data;
            } else if (response.status == 205) {
              console.log("205");
              alert("can not response");
            }
          })
          .catch(error => {
            alert(error);
          });
      },
      sendMsgPpt: function (board) {
        console.log(board);
        let msg = prompt(board.userOID.nickname + '님 에게 메시지 보내기');
        let sender = this.$store.getters.getUserID;
        let receiver = board.userOID.id;
        let created = Date.now();
        this.$store.dispatch('sendMsg', {msg: msg, sender: sender, receiver: receiver, created: created});
      },

    },

    created() {
      console.log("router : " + this.$route);
      this.getData();
    },
    watch: {
      currentPage: function (val, oldVal) {
        console.log("new : %s, old: %s", val, oldVal);
        this.getData();
      }
    }
  };
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
    margin: 10px;
  }

  input {
    width: 300px;
    margin: 10px;
  }

  button {
    float: right;
    margin: 10px;
    width: 100px;
  }

  .pageList {
    width: 300px;
    margin: 10px auto;
  }

</style>

