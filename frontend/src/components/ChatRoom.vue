<template>
  <div id="top_container">

    <b-card id="text_area">
      <b-nav pills slot="header">
        <nav-item id="chat_header">chat room</nav-item>
        <b-dropdown-divider></b-dropdown-divider>
      </b-nav>
      <b-card-body id="nav-scroller" ref="content" style="position:relative; height:300px; overflow-y:scroll;">
        <div v-for="chat in chatObjects">
          <div v-if="chat.owner===1" id="my_chat"><p style="text-align: right">{{chat.msg}}</p></div>
          <div v-else="chat.owner==='1'" id="your_chat"><p style="text-align:left">{{chat.msg}}</p></div>
        </div>
      </b-card-body>
    </b-card>
    <!--<b-form-textarea id="textarea1" v-model="text" placeholder="Enter something" :rows="4" :max-rows="10">-->
    <!--</b-form-textarea>-->

    <div id="send_bar">
      <b-container>
        <b-row class="my-1">
          <b-col sm="10">
            <b-form-input id="input-small" type="text" placeholder="Enter message"></b-form-input>
          </b-col>
          <button>send</button>
        </b-row>
      </b-container>

    </div>


  </div>
</template>

<script>
  export default {
    name: "ChatRoom",
    data() {
      return {
        text: '',
        chatObjects:[]
      }
    },
    mounted(){
      this.chatObjects.push({owner:1, msg:'hi im juno', time:1111});
      this.chatObjects.push({owner:1, msg:'fuckyou', time:1111});
      this.chatObjects.push({owner:2, msg:'123', time:2222});
      this.chatObjects.push({owner:1, msg:'hihihihi', time:33333});
      this.chatObjects.push({owner:2, msg:'123123123', time:123123});
    }
  }
</script>

<style scoped>
  #top_container {
    align-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 50px;
  }

  #send_bar {

  }

  #nav-scroller {
    text-align: left;
  }

  #text_area {
    max-width: 800px;

  }

  #chat_header {
    text-align: center;
  }

  #my_chat {
    text-align: justify;
    text-align-last: right;
    -moz-text-align-last: right;
    /*text-align:right;*/
    /*display:block;*/
  }

  #your_chat {
    text-align: left;
    /*display:block*/
  }

</style>
