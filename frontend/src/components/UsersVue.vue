<template>
  <div>
    <p>this is userList</p>
      <button v-on:click='getUsers'></button>

      <ul>
        <li v-for="user in users">
          <span>{{user.id}}</span>
          <div>
            <b-dropdown id="ddown1" text="메뉴" class="m-md-2">
              <b-dropdown-item @click="UserMenu(user.id,user._id)">메시지보내기</b-dropdown-item>
              <b-dropdown-item>차단</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
            </b-dropdown>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
  // import io from 'socket.io-client';


  export default {
    name: "UsersVue",
    data() {
      return {
        users: [],
        // socket: io('localhost:3000'),
        room:{
          senderOID:'',
          senderID:'',
          receiverOID:'',
          receiverID:'',
          message:'',
          created:''
        },
      }
    },
    methods: {
      getUsers: function (event) {
        this.$http.post('http://localhost:3000/users', {
          user: this.user
        })
          .then(
            (response) => {
              console.log(response);
              console.log(response.data.length);
              this.users = response.data;

            },
            (error) => {
              alert(error.response.data.error)
            }
          )
          .catch(error => {
            alert(error)
          })
      },
      sendMessage(senderOID, senderID, receiverOID, receiverID, message){
        this.$http.post('http://localhost:3000/chat/makeRoom', {
          room:{
            senderOID:senderOID,
            senderID:senderID,
            receiverOID:receiverOID,
            receiverID:receiverID,
            message:message,
            created:new Date()
          }
        })
          .then(
            (res)=>{
              console.log(`---------------result--------------`);
              console.log(res);
              if(res.status === 201){
                alert(`메시지를 보냈습니다.`);
              } else if(res.status === 202){
                alert(`잠시 후 다시 시도해 주십시오`);
              }
            }
          )
          .catch(err=>{
            alert(err);
          })
      },
      UserMenu(id, oid) {
        // 메시지 보내는 창 띄우기
        console.log(`oid: ${oid} id : ${id}`);
        const senderOID = localStorage.getItem('userOID');
        const senderID = localStorage.getItem('userID');

        const receiverOID = oid;
        const receiverID = id;

        console.log(`senderOID : ${senderOID} senderID : ${senderID}`);
        console.log(`receiverOID : ${receiverOID} receiverID : ${receiverID}`);

        let message = prompt('메시지를 입력하세여');  // 처음 보낼 메시지 입력


        this.sendMessage(senderOID, senderID, receiverOID, receiverID, message);
      }
    },
    // mounted() {
    //   this.socket.on('connect', ()=>{
    //     console.log(`connected`);
    //   });
    // }
  }
</script>

<style scoped>
</style>
