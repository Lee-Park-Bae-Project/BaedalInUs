<template>
    <div class="outer">
      <div class="inner">

        <p id="header">chat list</p>
        <!--<p>{{chatRooms.length}}</p>-->
        <div id="chatRoomLists">

          <!--<img id=imgI src="../assets/profile_img.svg">-->

          <p v-if="chatRooms.length===0">참여중인 대화가 없습니다.</p>
          <table v-else="chatRooms.length===0">
            <div v-for="room in chatRooms" @click="selectChatRoom(room)">
              <tr>
                <td rowspan="2" id="img"><i id=imgI class="fas fa-user-alt"></i></td>
                <td rowspan="2" class="sender" v-if="room.user1ID===user.id">{{room.user2ID}}</td>
                <td rowspan="2" class="sender" v-else="room.user1ID===user.id">{{room.user1ID}}</td>
                <td id="lastMsg">{{room.message}}</td>
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
  export default {
    name: "ChatRoomList",
    data() {
      return {
        user: {
          id: localStorage.getItem('userID'),
          oid: localStorage.getItem('userOID')
        },
        chatRooms: [
          {
            sender: '',
            message: '',
            updated: '',
            user1ID: '',
            user2ID: '',
          }
        ], // 채팅방 리스트들
      }
    },
    methods: {
      // 채팅방 리스트 가져오기
      getChatRooms: function (event) {
        this.$http.post('/chat/getChatRooms', {
          user: this.user
        })
          .then(
            (res) => {
              console.log('----------------------response--------------')
              console.log(res);
              console.log('----------------------response--------------')
              if (res.status === 200) {
                this.chatRooms = res.data.ret;
                console.log(this.chatRooms);
              } else if (res.status === 204) {
                console.log(`no chat rooms`);
              }
            },
            (error) => {
              alert(error.response.data.error)
            }
          )
          .catch(error => {
            alert(error)
          })
      },
      selectChatRoom:function(room){
        this.$router.push(`/chatroom/:${room.roomID}`); // 유저목록 페이지로 보내줌

      },

    },
    created() {
      console.log(`created`);
      this.getChatRooms();  // 채팅방 목록 불러오기
    },
  }
</script>

<style scoped>
  .outer {
    font-family: "Franklin Gothic Demi";
    width:80%;
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
