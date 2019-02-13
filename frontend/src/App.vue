<template>
  <div id="app">
    <header-component></header-component>
    <br/>
    <router-view
      v-bind:propsNewMsg="newMsg">
    </router-view>
    <br/>
    <bottom-component></bottom-component>
    <br/>
  </div>
</template>

<script>
  import chatVue from "./components/chat/ChatRoom.vue";
  import HeaderComponent from './components/Header.vue';
  import BottomComponent from './components/BottomVue.vue';
  import io from 'socket.io-client';

  import {EventBus} from "./event-bus";

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      chatVue,
      BottomComponent,
    },
    data() {
      return {
        socket: io('localhost:3000'),
        user: {
          id: localStorage.getItem('userID')
        },
        newMsg: '',
      }
    },
    created() {
      EventBus.$on('sendNewMsg', this.sendNewMsgToServer);
      EventBus.$on('joinRoom', this.joinRoom);
      EventBus.$on('leaveRoom', this.leaveRoom); // chatRoom destroyed 에서 호출
    },
    mounted() {
      this.socket.on('connect', () => {
        console.log(`connected`);
        console.log(`connected : ${this.socket.id}`);
        localStorage.setItem('socketID', this.socket.id);
        this.socket.emit('newSocket', this.user.id, this.socket.id);  // 서버에게 아이디, 소켓아이디 전달

        this.socket.emit('join', this.user.id, () => {
          // 서버가 방 Join에 실패했는데 내가 참여한 방 이름을 함부로 바꾸면 안되니까 서버에게 이 명령을 위임함
          // this.socket.emit('leave', this.joinedRoom); // 현재 방을 나간다. 뭐지이건??
        });

        this.socket.on('newMsg', (data) => {
          console.log('-----------newMsg--------------');
          console.log(data);
          console.log('-----------newMsg--------------');
          // 새로운 메시지 보냈다는걸 알림
          // EventBus.$emit('newMsg', (data)); // ChatRoom 에서 받음
          this.newMsg = data;

        })
      });
    },
    methods: {
      sendNewMsg: (receiverID) => {
        this.socket.emit('newMsgAlert', {receiverID: receiverID});
      },
      joinRoom: function (roomID) {
        console.log('join room : ' + roomID);
        this.socket.emit('join', roomID, () => {

        })
      },
      sendNewMsgToServer: function (newMsg, sender, created, roomID) {
        console.log(`in sendNewMsgToServer in app.vue`);
        // console.log(`newMsg : ${newMsg}`);
        // console.log(`sender : ${sender}`);
        // console.log(`created : ${created}`);
        // console.log(`roomID: : ${roomID}`);
        this.socket.emit('sendNewMsg', {newMsg: newMsg, sender: sender, created: created, roomID: roomID});
      },
      leaveRoom: function (roomID) {
        console.log('leave room : ' + roomID);
        this.socket.emit('leave', roomID);  // 현재 방을 나간다.

      },
    },

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  body {
    background-color: #E2904B;
    overflow: auto;
  }

</style>
