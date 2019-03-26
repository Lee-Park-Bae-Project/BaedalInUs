<template>
    <div class="outer">
      <div class="inner">

        <div id="chatRoomLists">
          <!--<img id=imgI src="../assets/profile_img.svg">-->
          <p v-if="chatRooms.length===0">참여중인 대화가 없습니다.</p> <!-- no chat rooms-->
          <table v-else>
            <div v-for="room in chatRooms" @click="selectChatRoom(room)">
              <tr>
                <td rowspan="2" id="img"><i id=imgI class="fas fa-user-alt"></i></td>
                <td rowspan="2" class="sender" v-if="room.user1ID===user.userID">{{room.user2ID}}</td>
                <td rowspan="2" class="sender" v-else="room.user1ID===user.userID">{{room.user1ID}}</td>
                <td id="lastMsg">{{room.message}}</td>
                <td rowspan="2" id="uncheckedMsg">
                  <span v-if="room.uncheckedMsg!==0" class="badge badge-danger">{{room.uncheckedMsg}}</span>
                </td>
              </tr>
              <tr>
                <td id="lastModified">{{room.updated.substring(0,10)}}</td>
              </tr>
            </div>
          </table>
        </div>
      </div>
    </div>
</template>


<script>
  import {EventBus} from "../../event-bus";

  export default {
    name: "ChatRoomList",
    data() {
      return {
        user: {
          userID: this.$store.getters.getUserID
        },
        chatRooms: [

            // sender: '',
            // message: '',
            // updated: '',
            // user1ID: '',
            // user2ID: '',

        ], // 채팅방 리스트들
      }
    },
    methods: {
      // 채팅방 리스트 가져오기
      // jwt 인증 실패 하면 403 리턴받을거임

      getChatRooms: function (event) {
        // TODO /api 경로 들어갈떄 config 설정 해놔야함
        let config = {
          headers:{
            'x-access-token':this.$cookie.get('access_token')
          }
        };
        this.$http.post('http://localhost:3000/api/chat/getChatRooms', {user: this.user}, config)
          .then(
            (res) => {
              // this.busUpdateSumOfUncheckedMsg(res.data.sumOfUncheckedMsg); 일단 보류 (2/25)
              console.log(res);
              if (res.status === 200) {
                console.log(res.data);
                this.chatRooms = res.data.chatRooms;
                console.log(this.chatRooms);
              }
            },
            (error) => {
              alert('다시 로그인 해주세요');
            }
          )
          .catch(error => {
            alert(error)
          })
      },
      selectChatRoom:function(room){
        this.$router.push(`/chatroom/${room.roomID}`); // 유저목록 페이지로 보내줌
      },
      busUpdateSumOfUncheckedMsg:function(newVal){
        // app.vue에서 받음
        EventBus.$emit('updateSumOfUncheckedMsg', newVal);
      },
      updateChatRoomList:function(){
        this.getChatRooms();
      }
    },
    created() {
      console.log(`created`);
      this.user.userID = this.$store.getters.getUserID;
      this.getChatRooms();  // 채팅방 목록 불러오기
    },
    mounted(){
      EventBus.$on('updateChatRoomList', this.updateChatRoomList);
    },
    watch:{
      chatRooms:function(){
        console.log('chatrooms 바뀜');
      }
    }
  }
</script>

<style scoped>
  .outer {
    font-family: "Franklin Gothic Demi";
    width:100%;
    text-align: center;
  }

  .inner {
    display: inline-block;
  }

  .sender{
    font-size: 40px;
    vertical-align:middle; /*세로 가운데 정렬*/
    margin-right:30px;
  }

  #img{
    width:100px;
    vertical-align:middle;

  }

  #imgI{
    width: 40px;
    height: auto;
  }

  #chatRoomLists{
    text-align: left;
  }
  #chatRoomLists table div:hover, table div:focus{
    /*color:#fff;*/
    border:1px solid #B6F2F0;
    background-color:#B6F2F0;
  }

  #uncheckedMsg{
    vertical-align:middle; /*세로 가운데 정렬*/
  }

  #lastMsg{
    width:300px;
    text-align:center;
  }
  #lastModified{
    text-align:center;
  }

  #header{
    text-align:left;
  }


</style>
