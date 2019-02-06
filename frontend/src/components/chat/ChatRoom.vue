<template>
  <div class="outer">
    <div class="inner">



      <div id="chatHeader">
        <span v-if="chats !== undefined && this.user.id === chats.user1ID">{{chats.user2ID}}</span>
        <span v-else>{{chats.user1ID}}</span>
      </div>
      <div id="scrollDiv">
        <div v-for="chat in chats.messages">
          <div v-if="user.id === chat.sender">
            <p id="myChat">{{chat.message}}</p>
          </div>
          <div v-else="this.user.id === chat.sender">
            <p id="othersChat">{{chat.message}}</p>
          </div>
        </div>
      </div>
      <div>
        <input id="newMsg" v-model="newMsg" v-on:keyup.enter="sendNewMsg"> <!--엔터로 클릭이벤트-->
        <button id="btnSend" @click="sendNewMsg">전송</button>
      </div>



    </div>
  </div>

</template>

<script>

  export default {
    name: "ChatRoom",
    data() {
      return {
        roomID: this.$route.params.roomID,
        text: '',
        chats: {},
        user: {
          id: localStorage.getItem('userID'),
          oid: localStorage.getItem('userOID'),
        },
        newMsg: '',
        // socket: io('localhost:3000'),
        testchats: {
          created: "2019-01-31T14:22:12.472Z",
          messages: [
            {
              created: "2019-01-31T14:22:12.466Z",
              message: "msg1",
              sender: "test1"
            },
            {
              created: "2019-01-31T14:22:12.466Z",
              message: "msg2",
              sender: "test1"
            },
            {
              created: "2019-01-31T14:22:12.466Z",
              message: "msg3",
              sender: "test2"
            }
          ],
          roomID: "xk4QEnaGeDEJbOenNrOu",
          user1: "5c530481f6d2eb28eb03c5c0",
          user1ID: "test1",
          user2: "5c530486f6d2eb28eb03c5c1",
          user2ID: "test2",
          updated: "2019-01-31T14:22:12.466Z"
        }
      }
    },
    methods: {
      // 채팅방 불러옴
      getChatRoom: function (roomid) {
        this.roomID = this.roomID.substring(1, this.roomID.length);
        this.$http.post(`http://localhost:3000/chat/getRoom/${this.roomID}`,{userID:this.user.id})
          .then(
            (res) => {
              if (res.status === 200) {
                this.chats = res.data;
                console.log(this.chats.user1ID);
                console.log(this.chats.user2ID);
                console.log(this.chats);
                this.scrollToLastMessage();
              } else if (res.status === 202) {
                alert('error');
              }
            }
          ).catch((err) => {
          alert(err.response.data.error)
        })
      },
      // 새로운 메시지 보냄
      sendNewMsg: function () {
        this.$http.post('http://localhost:3000/chat/sendNewMsg', {
          sender: this.user.id,
          newMsg: this.newMsg,
          roomID: this.chats.roomID,
          // socketID:this.socket.id,
          receiverID : (this.user.id === this.chats.user1ID)?this.chats.user2ID:this.chats.user1ID
        })
          .then(
            (res) => {
              console.log(res);
              if(res.status === 200){
                // 메시지 저장 성공 -> result chats.messages에 추가
                console.log(`----------------새로들어갈 메시지---------------`);
                this.chats.messages.push(res.data.newMsg);
                this.chats.updated = res.data.created; // 업데이트된 시각 == 마지막 메시지의 생성 시간
                console.log(`-----------------new msg added--------------`);
                this.scrollToLastMessage();

              } else if(res.status === 201){
                console.log(res.data.error);
                alert(res.data.error);
              }
            }
          )
          .catch(
            (err) => {
              alert(err);
            }
          );
        this.newMsg='';
      },
      scrollToLastMessage:function(){
        // 마지막 메시지까지 스크롤
        let objDiv = document.getElementById('scrollDiv');
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    },
    created() {

      this.getChatRoom(this.roomID);

      // socket.io
      // this.socket.on('connect', ()=>{
      //   console.log(`connected : ${this.socket.id}`);
      //
      //   this.socket.emit('newSocket', this.user.id, this.socket.id);  // 서버에게 아이디, 소켓아이디 전달
      //
      // });

    },
    mounted(){
      console.log('mounted');
      this.scrollToLastMessage();
    },
    watch:{
      chats:function(data){
        console.log('chats is modified');
        // console.log(data);

      }
    },


  }
</script>

<style scoped>

  .outer {
    font-family: "Franklin Gothic Demi";
    /*width: 80%;*/
    text-align: center;
    padding: 20px;
    margin: 15px;
  }

  .inner {
    display: inline-block;
    width: 100%;

  }

  #myChat {
    text-align: right;
  }

  #newMsg {
    width: 90%;
    float: left;
  }

  #btnSend {
    width: 10%;
  }

  #othersChat {
    text-align: left;
  }

  #chatHeader{
    font-size:40px;
  }

  #scrollDiv{
    overflow: scroll;
    height: 300px;
  }
</style>
