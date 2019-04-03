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
              address: {{board.addr}} {{board.detailedAddr}}
              order: {{board.content}}
              dueDate: {{board.dueDate}}
              fee: {{board.fee}}
              <span @click="sendMsgPpt(board)">
              <i class="fas fa-sms" ></i>
            </span>
            </v-card-text>
            <v-card-actions>
            <v-btn flat color="green"
                   @click="singleBoard(board.id)">View</v-btn>
            </v-card-actions>
          </div>

        <div>
          <v-pagination
            size = "md" :length="100" :total-visible="10"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            v-model = "currentPage"
            @click=""
            circle
          ></v-pagination>

        </div>
    </div>
          </div>

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
      getData: function(event) {
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
      sendMsgPpt: function(board) {
        console.log(board);
        console.log(board.userOID.id);
        console.log(this.$store.getters.getUserID);
        if(board.userOID.id == this.$store.getters.getUserID){
          alert('자기자기에겐 메시지를 보낼 수 없습니다.');
          return;
        }
        let msg = prompt(board.userOID.nickname + '님 에게 메시지 보내기'); // 메시지 내용
        let sender = this.$store.getters.getUserID; // 보내는 사람
        let receiver = board.userOID.id; // 받는사람
        let created = Date.now(); // 현재시각

        console.log('sender: ' + sender);
        console.log('receiver: ' + receiver);
        if(msg === null){
          // 취소 누른경우
          return;
        }

        this.$store.dispatch('sendMsg', {msg: msg, sender: sender, receiver: receiver, created: created});
      },

    },

    created() {
      console.log("router : " + this.$route);
      this.getData();
    },
    watch: {
      currentPage: function(val, oldVal) {
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

