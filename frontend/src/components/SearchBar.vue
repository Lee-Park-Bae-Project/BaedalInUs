<template>
  <div class="container">
    <div id="search">
    <label for="distance">거리</label>
    <select id="distance" v-model="selected">
        <option>1km ↓</option>
      <option>3km ↓</option>
      <option>5km ↓</option>
      <option>10km ↓</option>
      <option>10km ↑</option>
    </select>

    <label for="fee">수수료</label>
    <select id="fee" v-model="selected">
      <option>50,000원 ↑</option>
      <option>30,000원 ↑</option>
      <option>10,000원 ↑</option>
      <option>5,000원 ↑</option>
      <option>5,000원 ↓</option>
    </select>

    <input v-model="stuffName" placeholder=" 상품명">
    <button>검색</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Dropdown",
    data: {
      selected: '',
      stuffName: ''
    }
  }
</script>

<style scoped>

.container {
  padding-top: 200px;
}
#search {
  background-color: white;

}
  input, select {
    margin: 15px;
    border-radius: 5px;
  }
</style>
