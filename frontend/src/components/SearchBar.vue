<template>
  <div class="container">
    <div id="myCurAddr">


      {{this.$store.getters.getAddr}}

      <span v-if="this.$store.getters.getAddr.length!==0" @click="searchAddress" class="getlocation">
        <span id="isItCorrect" class="label label-primary">이 주소가 맞나요?</span>
        <i class="fas fa-map-marker-alt"></i>
      </span>

    </div>
    <div id="search" style="background: #fd7e14">
      <label for="distance">거리</label>
      <select id="distance" v-model="data.dist" style="background: #ffffff; width:150px; padding-left:10px">
        <option value='{"fromdist":"10", "todist":"50000"}'>10km 이상</option>
        <option value='{"fromdist":"5", "todist":"10"}'>5km 초과 ~ 10km 이하</option>
        <option value='{"fromdist":"3", "todist":"5"}'>3km 초과 ~ 5km 이하</option>
        <option value='{"fromdist":"1", "todist":"3"}'>1km 초과 ~ 3km 이하</option>
        <option value='{"fromdist":"0", "todist":"50000"}' selected="selected">상관없음</option>
      </select>

      <label for="fee">수수료</label>
      <select id="fee" v-model="data.fee" style="background: #ffffff; width:220px; padding-left:10px">
        <option value='{"fromfee":"40000", "tofee":"50000"}'>40,000 원 초과 ~ 50,000 원 이하</option>
        <option value='{"fromfee":"30000", "tofee":"40000"}'>30,000 원 초과 ~ 40,000 원 이하</option>
        <option value='{"fromfee":"10000", "tofee":"30000"}'>10,000 원 초과 ~ 30,000 원 이하</option>
        <option value='{"fromfee":"5000", "tofee":"10000"}'>5,000 원 초과 ~ 10,000 원 이하</option>
        <option value='{"fromfee":0", "tofee":"50000"}' selected="selected">상관없음</option>
      </select>

      <input v-model="data.stuffName" placeholder=" 상품명" style="background: #ffffff; padding-left:10px">
      <button @click="search()" class="btn btn-dark">검색</button>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    data: function () {
      return {
        data: {
          dist: '',
          fee: '',
          stuffName: '',
        }
      }
    },
    created() {
      let ckeditor = document.createElement('script');
      ckeditor.setAttribute('src', "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false");
      document.head.appendChild(ckeditor);
    },
    methods: {
      search() {
        if (this.data.dist.length === 0 || this.data.fee.length === 0) {
          alert('거리 혹은 수수료를 설정하세여');
          return;
        }

        if (this.data.stuffName.length < 2) {
          alert('2 글자 이상 입력해주세여');
          return;
        }

        let fromDist = JSON.parse(this.data.dist).fromdist;
        let toDist = JSON.parse(this.data.dist).todist;

        let fromFee = JSON.parse(this.data.fee).fromfee;
        let toFee = JSON.parse(this.data.fee).tofee;

        console.log(fromDist);
        console.log(toDist);

        console.log(fromFee);
        console.log(toFee);

        this.$router.push('/searchResult?fromDist=' + fromDist + '&toDist=' + toDist + '&fromFee=' + fromFee + '&toFee=' + toFee + '&stuffName=' + this.data.stuffName);

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

              that.$store.commit('setAddr', {addr:address});

            }
          }).open();
        });
      }
    }
  }
</script>

<style scoped>

  .container {
    padding-top: 200px;

  }

  #search {
    padding: 0px 10px 0px 10px;
    background-color: white;
    border-radius: 10px;
  }

  input, select {
    margin: 15px;
    border-radius: 5px;
  }

  #myCurAddr {
    margin-bottom: 30px;
    font-size: 20px;
  }

  #isItCorrect {
    font-size: 5px;
  }

  .getlocation:hover{
    cursor:pointer;
  }

  label{
    color :#ffffff;
    font-weight: bold;
  }
</style>
