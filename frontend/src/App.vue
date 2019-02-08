<template>
  <div id="app">
    <header-component v-bind:sumOfUncheckedMsg="sumOfUncheckedMsg"></header-component><br/>
    <router-view v-on:newMsg="sendNewMsg" v-on:joinRoom="joinRoom" v-on:updateSumOfUncheckedMsg="updateSumOfUncheckedMsg"></router-view><br/>
    <bottom-component></bottom-component><br/>
  </div>
</template>

<script>
  import chatVue from "./components/chat/ChatRoom.vue";
  import HeaderComponent from './components/Header.vue';
  import BottomComponent from './components/BottomVue.vue';
  import io from 'socket.io-client';


  export default {
    name: 'App',
    components: {
      HeaderComponent,
      chatVue,
      BottomComponent,
    },
    data(){
      return{
        socket: io('localhost:3000'),
        user:{
          id:localStorage.getItem('userID')
        },
        sumOfUncheckedMsg:0, // 읽지 않은 메시지 총합
      }
    },
    mounted() {
      this.socket.on('connect', ()=>{
        console.log(`connected`);

        console.log(`connected : ${this.socket.id}`);
        localStorage.setItem('socketID', this.socket.id);
        this.socket.emit('newSocket', this.user.id, this.socket.id);  // 서버에게 아이디, 소켓아이디 전달

        this.socket.emit('join', this.user.id, ()=>{
          // 서버가 방 Join에 실패했는데 내가 참여한 방 이름을 함부로 바꾸면 안되니까 서버에게 이 명령을 위임함
          // this.socket.emit('leave', this.joinedRoom); // 현재 방을 나간다. 뭐지이건??
        });

        this.socket.on('newMsg', ()=>{
          // alert('new message');
        })

      });
    },
    methods:{
      sendNewMsg: function(receiverID){
        this.socket.emit('newMsgAlert', {receiverID:receiverID});
      },
      joinRoom: function(roomID){
        console.log('join room : ' + roomID);
        this.socket.emit('join', roomID, ()=>{

        })
      },
      updateSumOfUncheckedMsg: function(newVal){
        this.sumOfUncheckedMsg = newVal; // 안읽은 메시지 총합 업데이
      }
    }
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
