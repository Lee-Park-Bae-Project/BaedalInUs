<template>
  <div class="container">
    <div id="search">
    <label for="distance">거리</label>
    <select id="distance" v-model="data.dist">
      <option>10km 이상</option>
      <option>5km ~ 10km</option>
      <option>3km ~ 5km</option>
      <option>1km ~ 3km</option>
      <option selected="selected">상관없음</option>
    </select>

    <label for="fee">수수료</label>
    <select id="fee" v-model="data.fee">
      <option>40,000 ~ 50,000원</option>
      <option>30,000 ~ 40,000원</option>
      <option>10,000 ~ 30,000원</option>
      <option>5,000 ~ 10,000원</option>
      <option selected = "selected">상관없음</option>
    </select>

    <input v-model="data.stuffName" placeholder=" 상품명">
    <button @click="search()">검색</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    data:function(){
      return {
        data: {
          dist:'',
          fee:'',
          stuffName: '',
        }
      }
    },
    methods:{
      search(){
        if(this.data.dist.length === 0 || this.data.fee.length === 0){
          alert('거리 혹은 수수료를 설정하세여');
          return;
        }

        if(this.data.stuffName.length < 2){
          alert('2 글자 이상 입력해주세여');
          return;
        }

        let distOption = document.getElementById('distance');
        let distNum = distOption.selectedIndex;

        let feeOption = document.getElementById('fee');
        let feeNum = feeOption.selectedIndex;

        let fromDist = 0;
        let toDist = 0;

        let fromFee=0;
        let toFee=0;

        if(distNum === 0){
          fromDist = 10;
          toDist = -1;
        } else if(distNum === 1){
          fromDist = 5;
          toDist = 10;
        } else if(distNum === 2){
          fromDist = 3;
          toDist = 5;
        } else if(distNum  === 3){
          fromDist = 1;
          toDist = 3;
        }

        if(feeNum === 0){
          fromFee = 40000;
          toFee = 50000;
        } else if(feeNum === 1){
          fromFee = 30000;
          toFee = 40000;
        } else if(feeNum === 2){
          fromFee = 10000;
          toFee = 30000;
        } else if(feeNum === 3){
          fromFee = 5000;
          toFee = 10000;
        } else if(feeNum === 4){
          fromFee = -1;
          toFee = -1;
        }


        this.$router.push('/searchResult?fromDist=' + fromDist + '&toDist=' + toDist + '&fromFee=' + fromFee + '&toFee=' + toFee + '&stuffName=' + this.data.stuffName);
      }
    }

  }
</script>

<style scoped>

.container {
  padding-top: 200px;
}
#search {
  padding: 0px 10px 0px 10px ;
  background-color: white;
  border-radius: 10px;
}
  input, select {
    margin: 15px;
    border-radius: 5px;
  }
</style>
