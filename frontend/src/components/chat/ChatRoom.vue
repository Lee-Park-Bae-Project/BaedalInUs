<template>
  <div class="outer">
    <div class="inner">


      <div id="chatHeader">
        <!--상대 아이디-->
        <span v-if="chats !== undefined && this.user.id === chats.user1ID">{{chats.user2ID}}</span>
        <span v-else>{{chats.user1ID}}</span>
      </div>
      <div id="scrollDiv">
        <div id=chats v-for="chat in chats.messages">
          <div v-if="isNewDay(chat.created)">
            <hr>
            <span id="newDate">{{getYYMMDD(chat.created)}}</span>
            <hr>
          </div>

          <div id=myChat v-if="user.id === chat.sender">
            <span id="myTime">{{(getTime(chat.created))}}</span>
            <span>{{chat.message}}</span>
          </div>
          <div id=othersChat v-else="this.user.id === chat.sender">
            <span>{{chat.message}}</span>
            <span id="otherTime">{{getTime(chat.created)}}</span>
          </div>
        </div>
      </div>

      <div>
        <input id="newMsg" v-model="newMsg" v-on:keyup.enter="sendNewMsg()"> <!--엔터로 클릭이벤트-->
        <button id="btnSend" @click="sendNewMsg()">전송</button>
      </div>
    </div>
  </div>

</template>

<script>
  import {EventBus} from "../../event-bus";

  let stdDate = '1970-01-01';

  export default {
    name: "ChatRoom",
    props: ['propsNewMsg'],
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
      }
    },
    methods: {
      // 채팅방 불러옴
      getChatRoom: function (roomid) {
        this.$http.post(`http://localhost:3000/api/chat/getRoom/${this.roomID}`, {userID: this.user.id})
          .then(
            (res) => {
              if (res.status === 200) {
                this.chats = res.data;
                console.log('chats.user1ID : ' + this.chats.user1ID);
                console.log('chats.user2ID : ' + this.chats.user2ID);
                console.log(this.chats);
                this.receiverID =  this.user.id === this.chats.user1ID ? this.chats.user2ID : this.chats.user1ID;
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
        if (this.newMsg.length === 0) {
        } else {
          const created = Date.now(); // 바꾸면 안댐
          // console.log(`in sendNewMsg`);
          // console.log(`newMsg : ${this.newMsg}`);
          // console.log(`sender : ${this.user.id}`);
          // console.log(`receiver : ${this.receiverID}`);
          // console.log(`created : ${created}`);

          this.busEmitSendMsg(this.newMsg, this.user.id, created, this.roomID, this.receiverID); // 소켓으로 보내는 요청
          this.sendNewMsgToServer(this.newMsg, this.user.id, created); // 서버에 저장하라고 보내는 요청

        }

      },
      busEmitSendMsg: function (newMsg, sender, created, roomID, receiver) {
        // console.log(`in busEmitSendMsg`);
        // console.log(`newMsg : ${newMsg}`);
        // console.log(`sender : ${sender }`);
        // console.log(`created : ${created}`);
        // console.log(`roomID : ${roomID}`);
        EventBus.$emit('sendNewMsg', newMsg, sender, created, roomID, receiver);
      },
      sendNewMsgToServer: function (newMsg, sender, created) {
        this.$http.post('http://localhost:3000/api/chat/sendNewMsg', {
          sender: sender,
          newMsg: newMsg,
          roomID: this.chats.roomID,
          socketID: this.socketID,
          receiverID: (this.user.id === this.chats.user1ID) ? this.chats.user2ID : this.chats.user1ID,
          created: created,
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
        objDiv.scrollTop = objDiv.scrollHeight + 30;
      },
     getYear(time) {
       let ret = time.substr(0,4);
        return ret;
      },
      getMonth(time){
        let ret = time.substr(5,2);
        return ret;
      },
      getDay(time){
        let ret = time.substr(8,2);
        return ret;
      },
      getIso(time){
        let t1 = new Date().getTimezoneOffset() * 60000;
        let t2 = new Date(time - t1);
        console.log('------------------------------------------------');
        console.log(time);
        console.log(t1);
        console.log(t2);
        console.log('------------------------------------------------');

        return t2.toISOString();
      },
      isNewDay(time){
        let chatday = this.getIso(time).substr(0,10);

        // let today = new Date().toISOString().substr(0,10);
        // console.log('chatday : ' + chatday);
        // console.log('today : ' + today);

        // console.log('chatday : ' +chatday);
        // console.log('stdDate : ' + this.stdDate);
        // console.log(chatday === this.stdDate);

        if(chatday !== this.stdDate){
          this.stdDate = chatday;
          return true;
        } else{
          return false;
        }

      },
      getYYMMDD(time){
        let iso = this.getIso(time);
        let ret = this.getYear(iso) + '년 ' + this.getMonth(iso) + '월 ' + this.getDay(iso) + '일';
        return ret;
      },
      getTime(time){
        // let timezoneOffset = new Date().getTimezoneOffset() * 60000;
        // let timezoneDate = new Date(Date.now() - timezoneOffset);
        // console.log('그냥 ISOString = '+new Date().toISOString());
        // console.log('timezone 반영 ISOString = '+timezoneDate.toISOString());

        let iso = this.getIso(time);
        let hh = iso.substr(11,2);
        let mm = iso.substr(14,2);
        let ret = '';
        if(hh > 12){
          hh = Number(hh); // number로 캐스팅
          hh-=12;
          hh = String(hh); // string 으로 캐스
          ret = '오후 ' + hh+':'+mm;
        } else{
          ret = '오전 ' + hh+':'+mm;
        }

        return ret;
      }
    },
    created() {
      this.getChatRoom(this.roomID);
      EventBus.$emit('joinRoom', this.roomID);

    },
    mounted() {
      console.log('mounted');

    },
    destroyed() {
      console.log('before destroy');
      EventBus.$emit('leaveRoom', (this.roomID)); // 이방을 떠남 (app.vue에서 받음)

    },
    updated(){
      this.scrollToLastMessage();
    },
    watch: {
      chats: function (data) {
        console.log('chats is modified');
        this.stdDate='1970-01-01';
      },
      propsNewMsg: function () {
        console.log('propsNewMsg is modified');
        this.chats.messages.push(this.propsNewMsg); // props로 메시지 전달받음
        this.stdDate='1970-01-01';

      },
      newMsg:function(){
        this.stdDate='1970-01-01';

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
    max-width:800px;
    min-width:480px;
  }

  #newMsg {
    width: 90%;
    float: left;
  }

  #btnSend {
    width: 10%;
  }

  #chatHeader {
    font-size: 40px;
  }

  #scrollDiv {
    overflow: scroll;
    height: 600px;
    padding:10px;
  }

  #chats {
    font-size: 20px;

  }

  #myChat {
    text-align: right;
  }

  #othersChat {
    text-align: left;
  }

  #myTime {
    font-size: 10px;
    text-align: right;
  }

  #otherTime {
    font-size: 10px;
    text-align: left;
  }
  #newDate{
    font-size:15px;
    display: inline-block;
  }
</style>
