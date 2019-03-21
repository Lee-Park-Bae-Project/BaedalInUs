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
  import store from './vuex/store'

  import {EventBus} from "./event-bus";

  let socket=io('localhost:3000', { transports: ['websocket'] });
// TODO: 주문 목록 보고 메시지 보내는 기능 추가
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
      this.getCurrentPos(); // 현재 위치 받아오기

      EventBus.$on('sendNewMsg', this.emitNewMsgToServer);
      EventBus.$on('joinRoom', this.joinRoom);
      EventBus.$on('leaveRoom', this.leaveRoom); // chatRoom destroyed 에서 호출
      EventBus.$on('joinToMyID', this.joinToMyID); // login 성공 후 호출
    },
    mounted() {
      socket.on('connect', () => {
        console.log(`connected : ${socket.id}`);
        // 새로운 소켓 할당받을때마다 내 아이디랑 소켓아이디 보내
        localStorage.setItem('socketID', socket.id);
        if(localStorage.getItem('userID') !== undefined){
          this.joinToMyID(localStorage.getItem('userID'));
        }
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
          console.log(data);

          // EventBus.$emit('updateSumOfUncheckedMsg', (1));
          EventBus.$emit('updateChatRoomList'); // 채팅방 리스트를 다시 받아오라는 이벤트 (chatRoomList에서 받음)
        });
        socket.on('message', (data)=>{
          // console.log('message : ' + data.msg);
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
      getCurrentPos:function() {
        console.log('sdf');
        // Geolocation API에 액세스할 수 있는지를 확인
        if (navigator.geolocation) {
          //위치 정보를 얻기
          navigator.geolocation.getCurrentPosition (function(pos) {
            console.log('위도 : ' + pos.coords.latitude); // 위도
            console.log('경도 : ' + pos.coords.longitude); // 경도

            store.commit("setLatitude", {latitude:pos.coords.latitude});
            store.commit("setLongitude", {longitude:pos.coords.longitude});

            var geocoder = new daum.maps.services.Geocoder();

            var coord = new daum.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var callback = function(result, status) {
              if (status === daum.maps.services.Status.OK) {
                console.log(result[0].address.address_name);

                store.commit("setAddr", {addr:result[0].address.address_name});

              }
            };

            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

          });
        } else {
          alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
        }
      }
    },

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #E2904B;

  }

  html{
    background-color: #E2904B;
  }
  body {
    /*background-color: #E2904B;*/
    overflow: auto;
  }

</style>
