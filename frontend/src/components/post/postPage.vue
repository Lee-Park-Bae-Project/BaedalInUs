<template>
  <div class="outer">
    <div class = "inner">
      <div class="form_box">

        <h1> Post your order</h1>

        <input v-model="board.title" placeholder="Title"><br/>
        <input v-model="board.content" placeholder="Content"><br/>
        <input v-model="board.fee" placeholder="Fee"><br/>
        <input v-model="board.addr" placeholder="Address"><br/>
        <input v-model="board.dueDate" placeholder="DueDate"><br/>
        <!--<form action="/upload" enctype="multipart/form-data" method="post">
          <div class="custom-file mb-3">
          <input type="file" name="file" id="file" class="custom-file-input">
                 <label for="file" class="custom-file-label">Select Image</label>
          </div>
        </form>-->
        <button @click="post">Submit</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'postPage',
      data: function () {

      return {
        board: {
          title:'',
          content:'',
          fee:'',
          addr:'',
          dueDate:''
        }
      }
    },
    methods: {
      post: function (event) {
        this.$http.post('http://localhost:3000/post/postOrder', {
          board: this.board
        })
          .then(
            (response) => {
              console.log('----------------------response--------------');
              console.log(response);
              console.log(response.status);
              if (response.status == 200) {
                console.log('200');
                console.log(response);
                if (!response.data.complete) {
                  //alert 띄우기
                  alert('wrong');
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
    margin: 10px ;
  }
  input {
    width: 300px;
    margin:10px;
  }
  button {
    float:right;
    margin:10px;
    width:100px;
  }
</style>

