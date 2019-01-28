<template>
    <div id="top_container">
      <p>chat list</p>
    </div>
</template>

<script>
    export default {
        name: "ChatRoomList",
      data(){
          return {
            user:{
              id:localStorage.getItem('userID'),
              oid:localStorage.getItem('userOID')
            },
            chatRooms:[], // 채팅방 리스트들
          }
      },
      methods:{
        getChatRooms:function(event){
          this.$http.post('/chat/getChatRooms', {
            user:this.user
          })
            .then(
              (res) => {
                console.log('----------------------response--------------')
                console.log(res);
                if (res.status === 200) {
                  console.log(res);
                  this.chatRooms = res.data;
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
        }
      },
      created(){
        console.log(`created`);
        this.getChatRooms();  // 채팅방 목록 불러오기
      },
    }
</script>

<style scoped>
  #top_container {
    width: 70%;
    height: 70%;
    margin: 40px auto;

  }
</style>
