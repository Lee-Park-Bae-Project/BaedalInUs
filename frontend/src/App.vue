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

  let socket=io('localhost:3000', { transports: ['websocket'] });

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      chatVue,
      BottomComponent,
    },
    data() {
      return {
        // socket: io('localhost:3000', { transports: ['websocket'] }),
        user: {
          id: localStorage.getItem('userID')
        },
        newMsg: '',
      }
    },
    created() {
      EventBus.$on('sendNewMsg', this.emitNewMsgToServer);
      EventBus.$on('joinRoom', this.joinRoom);
      EventBus.$on('leaveRoom', this.leaveRoom); // chatRoom destroyed 에서 호출
      EventBus.$on('joinToMyID', this.joinToMyID); // login 성공 후 호출
    },
    mounted() {
      socket.on('connect', () => {
        console.log(`connected`);
        console.log(`connected : ${socket.id}`);
        localStorage.setItem('socketID', socket.id);
        // this.socket.emit('newSocket', this.user.id, this.socket.id);  // 서버에게 아이디, 소켓아이디 전달

        // this.socket.emit('join', this.user.id, () => {
        //   // 서버가 방 Join에 실패했는데 내가 참여한 방 이름을 함부로 바꾸면 안되니까 서버에게 이 명령을 위임함
        //   // this.socket.emit('leave', this.joinedRoom); // 현재 방을 나간다. 뭐지이건??
        // });

        socket.on('newMsg', (data) => {
          console.log('-----------newMsg--------------');
          console.log(data);
          console.log('-----------newMsg--------------');
          // 새로운 메시지 보냈다는걸 알림
          this.newMsg = data; // props로 하위 chat room 으로 전달

        });
        socket.on('newMsgAlert', (data)=>{
          console.log('newMsgAlert');
          EventBus.$emit('updateSumOfUncheckedMsg', (1));
        });
        socket.on('message', (data)=>{
          console.log('message : ' + data.msg);
        })
      });


    },
    methods: {
      joinRoom: function (roomID) {
        console.log('join room : ' + roomID);
        socket.emit('join', roomID);
      },
      emitNewMsgToServer: function (newMsg, sender, created, roomID, receiver) {
        console.log(`in emitNewMsgToServer in app.vue`);
        // console.log(`newMsg : ${newMsg}`);
        // console.log(`sender : ${sender}`);
        // console.log(`created : ${created}`);
        // console.log(`roomID: : ${roomID}`);
        console.log('receiver : ' + receiver);
        socket.emit('sendNewMsg', {newMsg: newMsg, sender: sender, created: created, roomID: roomID, receiver:receiver});
      },
      leaveRoom: function (roomID) {
        console.log('leave room : ' + roomID);
        socket.emit('leave', roomID);  // 현재 방을 나간다.

      },
      joinToMyID: function(userID){
        console.log('---------------------------------');
        console.log(userID);
        socket.emit('joinToMyID', userID);
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
