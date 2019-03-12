<template>
  <div class="outer">
    <div class="inner">
      <div class="form_box">

        <h1> Post your order</h1>

        <input v-model="board.title" placeholder="제목"><br/>
        <input v-model="board.content" placeholder="주문 내용"><br/>
        <input v-model="board.fee" placeholder="수수료"><br/>
        <input id="addrValue" @click="searchAddress" v-model="board.addr" placeholder="주소" readonly><br/>
       <!-- <input id="addrValue" v-model="board.addr" placeholder="주소"><br/>-->

        <input id="detailedAddr" placeholder="상세 주소"><br/>

        <button @click="post">Submit</button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      let ckeditor = document.createElement('script');
      ckeditor.setAttribute('src', "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false");
      document.head.appendChild(ckeditor);

    },
    name: 'postPage',
    data: function () {

      return {
        board: {
          title: '',
          content: '',
          fee: '',
          addr: '',
          dueDate: ''
        },
      }
    },
    methods: {
      post: function (event) {
        console.log(this.board);
        this.$http.post('http://localhost:3000/post/postOrder', {
          board: this.board
        })
          .then(
            (response) => {
              console.log('----------------------response--------------')
              console.log(response);
              console.log(response.status);
              if (response.status === 200) {
                console.log('200');
                console.log(response);
                if (!response.data.complete) {
                  //alert 띄우기
                  alert('wrong');
                }
              } else if (response.status === 201) {
                console.log(`201`);
                alert('no matching id');
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
      searchAddress() {
        daum.postcode.load(function () {
          new daum.Postcode({
            oncomplete: function (data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

              // 각 주소의 노출 규칙에 따라 주소를 조합한다.
              // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
              let address = ''; // 주소 변수

              //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
              if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                address = data.roadAddress;
              } else { // 사용자가 지번 주소를 선택했을 경우(J)
                address = data.jibunAddress;
              }

              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              document.getElementById("addrValue").value = address;

              // 커서를 상세주소 필드로 이동한다.
              document.getElementById("detailedAddr").focus();
            }
          }).open();
        });
      }
    }
  }
</script>
<style scoped>

  .outer {
    font-family: "Franklin Gothic Demi";
    width: 100%;
    text-align: center;
  }

  .inner {
    display: inline-block;
  }

  .form_box {
    margin-top: 150px;
    text-align: left;
  }

  h1 {
    margin: 10px;
  }

  input {
    width: 300px;
    margin: 10px;
  }

  button {
    float: right;
    margin: 10px;
    width: 100px;
  }
</style>

