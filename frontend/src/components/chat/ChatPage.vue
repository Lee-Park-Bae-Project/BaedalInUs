<template>

  <div>
    <div>

      <!--존재하는 방목록? 근데 안보임-->
      <hr>
      <p>rooms list</p>
      <ul v-for="room in rooms" >
        <li>{{room}}</li>
      </ul>
      <hr>
    </div>

    <!--입장할 방 아이디값 입력하는 폼-->
    <div>
      <form @submit.prevent="joinRoom">
        <label>roomID : </label>
        <input type="text" v-model="roomID" class="form-control" value="square">
        <button type="submit" class="btn btn-success">Join</button>
      </form>
    </div>

    <!--내가 입장한 방 표시-->
    <div>

      <p>current room : {{joinedRoom}}</p>

    </div>

    <div class="content">
      <div class="card-footer">
        <form @submit.prevent="sendMessage">
          <div class="gorm-group">
            <label>User:</label>
            <input type="text" v-model="user" class="form-control">
          </div>
          <div class="gorm-group pb-3">
            <label>Message:</label>
            <input type="text" v-model="message" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">send</button>
        </form>

        <!--채팅 목록 표시-->
        <table>
          <tr v-for="message in messages">
            <td>{{message}}</td>
          </tr>
        </table>
      </div>
    </div>


  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: "ChatPage",
    data() {
      return {
        user: '',
        message: '',
        messages: [],
        socket: io('localhost:3000'),
        joinedRoom:'square',
        square:'square',
        rooms:[],
        roomID:'',
      }
    },
    methods: {
      sendMessage(e) {
        e.preventDefault();
        this.send();

        this.socket.emit('message', {
          user: this.user,
          message: this.message
        });
        this.message = ''
      },
      makeJoin(roomid){
        // roomid의 방으로 join 함
        this.socket.emit('join', roomid, ()=>{
          // 서버가 방 Join에 실패했는데 내가 참여한 방 이름을 함부로 바꾸면 안되니까 서버에게 이 명령을 위임함
          this.socket.emit('leave', this.joinedRoom); // 현재 방을 나간다.
          this.joinedRoom = roomid;
          console.log(this.rooms);
        });
      },
      joinRoom(){
        if(!this.roomID){
          alert('input the room ID');
          return;
        }else{
          this.makeJoin(this.roomID);
        }
      },
      send(){
        // 메시지 보낼 때
        let msg = this.message; // 입력한 메시지
        console.log(`보낼 메시지 : ${msg}`);
        this.socket.emit('message', {room: this.joinedRoom, msg:msg}, function(ret){
          console.log("message.callback>>" ,ret);

        });
        this.messages = [...this.messages, msg];
      }
    },
    mounted() {
      var myId = "";
      this.joinedRoom = null;

      this.socket.on('connect', () => {
        console.log(`connected`);

        this.makeJoin(this.square);

        this.socket.emit('rooms', (rooms) => {
          console.log(`rooms : ${rooms}`);
          this.rooms = [...this.rooms, rooms];
        });
      });

      //메시지 받았을 때
      this.socket.on('message', (data) => {

        this.messages = [...this.messages, data.msg];
        // this.messages.push(data.message); // 위랑 같음

        console.log(`user : ${data.user} msg : ${data.message}`);
        console.log(`messages : ${this.messages.length}`);

      });

      this.socket.on('disconnect', () => {
        console.log(`disconnected`);
      });

    }
  }
</script>

<style scoped>
  #jb-container {
    width: 940px;
    margin: 0px auto;
    padding: 20px;
  }
  #jb-header {
    padding: 50px;
    margin-bottom: 30px;
    border: 1px solid #bcbcbc;
  }
  #jb-content {
    padding: 50px;
    margin-bottom: 30px;
    float: left;
    border: 1px solid #bcbcbc;

  }
  #jb-footer {
    clear: both;
    padding: 20px;
    border: 1px solid #bcbcbc;
  }
  #top_logo {
    position: relative;
    right: 400px;
    bottom:50px;
    width: 50px;
    height: auto;
  }
</style>
