<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "ChatRooms",
      data(){
          return {
            chatRooms:[], // 채팅방 리스트들
          }
      },
      methods:{
        getChatRooms:function(){
          this.$http.post('/getChatRooms', {
            user: this.user
          })
            .then(
              (response) => {
                console.log('----------------------response--------------')
                console.log(response)
                console.log(response.status)
                if (response.status == 200) {
                  console.log(`200`)
                  console.log(response)
                  if (response.data.complete) {
                    // 로컬 스토리지에 아이디 저장하기
                    localStorage.setItem('userId', this.user.id);
                    localStorage.setItem('userOid', response.data.oid);
                    this.$router.push('/userList') // 유저목록 페이지로 보내줌
                  } else {
                    alert('wrong password')
                  }
                } else if (response.status == 201) {
                  console.log(`201`);
                  alert('no matching id')
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
      created:{
          // 채팅방 목록 불러오기

      },
    }
</script>

<style scoped>

</style>
