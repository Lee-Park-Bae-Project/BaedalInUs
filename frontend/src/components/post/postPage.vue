<template>
  <body>
  <div class="container">

    <form class="form-post">
      <h1 class="form-post-heading">Post your order</h1>
      <input v-model="board.title" placeholder="제목" id="title" class="form-control" required autofocus>
      <input v-model="board.content" placeholder="주문 내용" type="text"
             class="form-control" required>
      <input v-model="board.fee" placeholder="수수료" type="text" class="form-control"
             style="border-radius: 0; margin-top: -1px" required>
      <input id="addrValue" @click="searchAddress" v-model="board.addr" placeholder="주소" readonly type="text"
             class="form-control" required>
      <input id="detailedAddr" v-model="board.detailedAddr" placeholder="상세 주소" class="form-control">
      <button @click="post" class="submit btn btn-lg btn-success btn-block">Submit</button>
    </form>

  </div> <!-- /container -->
  </body>
  <!--<div class="outer">-->
  <!--<div class="inner">-->
  <!--<div class="form_box">-->
  <!--<h1> Post your order</h1>-->
  <!--<input v-model="board.title" placeholder="제목"><br/>-->
  <!--<input v-model="board.content" placeholder="주문 내용"><br/>-->
  <!--<input v-model="board.fee" placeholder="수수료"><br/>-->
  <!--&lt;!&ndash;<input id="addrValue" @click="searchAddress" v-model="board.addr" placeholder="주소" readonly><br/>&ndash;&gt;-->
  <!--&lt;!&ndash; <input id="addrValue" v-model="board.addr" placeholder="주소"><br/>&ndash;&gt;-->

  <!--&lt;!&ndash;<input id="detailedAddr" v-model="board.detailedAddr" placeholder="상세 주소"><br/>&ndash;&gt;-->

  <!--<button @click="post">Submit</button>-->
  <!--</div>-->

  <!--</div>-->
  <!--</div>-->
</template>

<script>
  export default {
    created() {
      let ckeditor = document.createElement('script');
      ckeditor.setAttribute('src', "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false");
      document.head.appendChild(ckeditor);
    },
    mounted() {
      console.log('hello');
      this.board.userID = this.$store.getters.getUserID;
    },
    name: 'postPage',
    data: function () {

      return {
        board: {
          title: '',
          content: '',
          fee: '',
          addr: '',
          detailedAddr: '',
          dueDate: '',
          lat: '',
          lng: '',
          userID: '',

        },
      }
    },
    methods: {
      post: function (event) {
        let that = this;

        if (this.board.detailedAddr.length === 0) {
          alert('상세 주소를 입력해주세요.');
        }

        this.$http.post('http://localhost:3000/post/postOrder', {
          board: this.board
        })
          .then(
            (response) => {
              if (response.status === 200) {
                console.log(response);
                if (response.data.complete) {

                  alert('주문이 완료되었습니다.');
                  this.$router.push('/pagination');
                } else {
                  //alert 띄우기
                  alert('잠시 후 다시 시도해주세요');
                }
              } else if (response.status === 201) {
                console.log(response.data.message);
                alert(response);

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
        let that = this;
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
              that.board.addr = address;
              that.setLatLng(address);

              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              document.getElementById("addrValue").value = address;
              // 커서를 상세주소 필드로 이동한다.
              document.getElementById("detailedAddr").focus();


            }
          }).open();
        });
      },
      setLatLng: function (addr) {
        let that = this;
        var geocoder = new daum.maps.services.Geocoder();

        var callback = function (result, status) {
          if (status === daum.maps.services.Status.OK) {
            console.log(result);
            that.board.lat = result[0].y;
            that.board.lng = result[0].x;
          }
        };

        geocoder.addressSearch(addr, callback);
      }
    }
  }
</script>
<style scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #F8F8F9;
  }

  .form-post {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-post .form-post-heading {
    margin-bottom: 10px;
  }


  .form-post .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-post .form-control:focus {
    z-index: 2;
  }

  #title {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  #detailedAddr {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-post input[type="text"]{
    border-radius: 0;
  }

  /*.outer {*/
  /*font-family: "Franklin Gothic Demi";*/
  /*width: 100%;*/
  /*text-align: center;*/
  /*}*/

  /*.inner {*/
  /*display: inline-block;*/
  /*}*/

  /*.form_box {*/
  /*margin-top: 150px;*/
  /*text-align: left;*/
  /*}*/

  /*h1 {*/
  /*margin: 10px;*/
  /*}*/

  /*input {*/
  /*width: 300px;*/
  /*margin: 10px;*/
  /*}*/

  /*button {*/
  /*float: right;*/
  /*margin: 10px;*/
  /*width: 100px;*/
  /*}*/
</style>
