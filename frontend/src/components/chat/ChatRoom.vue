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
        <input id="newMsg" v-model="newMsg" v-on:keyup.enter="sendNewMsg(Date.now())"> <!--엔터로 클릭이벤트-->
        <button id="btnSend" @click="sendNewMsg(Date.now())">전송</button>
      </div>
    </div>
  </div>

</template>

<script>
  import {EventBus} from "../../event-bus";

  export default {
  name: "ChatRoom",
    props:['propsNewMsg'],
    data() {
      return {
        roomID: this.$route.params.roomID,
        text: '',
        receiverID: '',
        chats: {},
        user: {
          id: localStorage.getItem('userID'),
          oid: localStorage.getItem('userOID'),
        },
        socketID: localStorage.getItem('socketID'),
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
        this.$http.post(`http://localhost:3000/chat/getRoom/${this.roomID}`, {userID: this.user.id})
          .then(
            (res) => {
              if (res.status === 200) {
                this.chats = res.data;
                console.log('chats.user1ID : ' + this.chats.user1ID);
                console.log('chats.user2ID : ' + this.chats.user2ID);
                console.log(this.chats);
                this.receiverID = this.user.id === this.chats.user1ID ? this.chats.user2ID : this.chats.user1ID;
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
      sendNewMsg: function (created) {
        console.log(`in sendNewMsg`);
        console.log(`newMsg : ${this.newMsg}`);
        console.log(`sender : ${this.user.id}`);
        console.log(`created : ${created}`);

        this.busEmitSendMsg(this.newMsg, this.user.id, created, this.roomID);
        this.sendNewMsgToServer(this.newMsg, this.user.id, created);
      },
      busEmitSendMsg:function(newMsg, sender, created, roomID){
        // console.log(`in busEmitSendMsg`);
        // console.log(`newMsg : ${newMsg}`);
        // console.log(`sender : ${sender }`);
        // console.log(`created : ${created}`);
        // console.log(`roomID : ${roomID}`);
        EventBus.$emit('sendNewMsg', newMsg, sender, created, roomID);
      },
      sendNewMsgToServer:function(newMsg, sender, created){
        this.$http.post('http://localhost:3000/chat/sendNewMsg', {
          sender: sender,
          newMsg: newMsg,
          roomID: this.chats.roomID,
          socketID: this.socketID,
          receiverID: (this.user.id === this.chats.user1ID) ? this.chats.user2ID : this.chats.user1ID,
          created:created,
        })
          .then(
            (res) => {
              console.log(res);
              if (res.status === 200) {
                // 메시지 저장 성공 -> result chats.messages에 추가
                // console.log(`----------------새로들어갈 메시지---------------`);
                // this.chats.messages.push(res.data.newMsg);
                // this.chats.updated = res.data.created; // 업데이트된 시각 == 마지막 메시지의 생성 시간 (고쳐야할듯)
                // console.log(`-----------------new msg added--------------`);
                this.scrollToLastMessage();

              } else if (res.status === 201) {
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
        this.newMsg = '';

        // this.$emit('newMsg', this.receiverID); // 새로운 메시지가 있다는 알림
      },
      scrollToLastMessage: function () {
        // 마지막 메시지까지 스크롤
        let objDiv = document.getElementById('scrollDiv');
        objDiv.scrollTop = objDiv.scrollHeight;
      },
      receiveNewMsg:(data)=>{
        console.log(`------------new msg on event bus--------------`);
        console.log(data);
        console.log(this.chats);
        console.log(`------------new msg on event bus--------------`);

        this.chats.messages.push(data); // 새로운 메시지 추가

      },
    },
    created() {
      this.getChatRoom(this.roomID);
      EventBus.$emit('joinRoom', this.roomID);

    },
    mounted() {
      console.log('mounted');
      this.scrollToLastMessage();
      // EventBus.$once('newMsg', this.receiveNewMsg); // socket.js 에서 보냄


    },
    destroyed(){
      console.log('before destroy');
      EventBus.$emit('leaveRoom', (this.roomID)); // 이방을 떠남 (app.vue에서 받음)

    },
    watch: {
      chats: function (data) {
        console.log('chats is modified');
      },
      propsNewMsg:function(){
        console.log('propsNewMsg is modified');
        this.chats.messages.push(this.propsNewMsg);
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

  #chatHeader {
    font-size: 40px;
  }

  #scrollDiv {
    overflow: scroll;
    height: 300px;
  }
</style>
