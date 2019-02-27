<template>
  <div class="container">
    <div id="search">
    <label for="distance">거리</label>
    <select id="distance" v-model="data.selected">
      <option>1km 내</option>
      <option>3km 내</option>
      <option>5km 내</option>
      <option>10km 내</option>
      <option>상관없음</option>
    </select>

    <label for="fee">수수료</label>
    <select id="fee" v-model="data.selected">
      <option>50,000원 이상</option>
      <option>30,000원 이상</option>
      <option>10,000원 이상</option>
      <option>5,000원 이상</option>
      <option>상관없음</option>
    </select>

    <input v-model="data.stuffName" placeholder=" 상품명">
    <button>검색</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Dropdown",
    data:function(){
      return {
        data: {
          selected: '',
          stuffName: ''
        }
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
