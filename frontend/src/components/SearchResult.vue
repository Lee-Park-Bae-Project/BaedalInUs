<template>
  <div class="outer">
    <div class="inner">
      <div>
        {{searchResults.length}}
        <div id="searchResultDiv">
          <p v-if="searchResults.length === 0">검색 결과가 없습니다.</p>
          <table v-else="searchResults.length === 0">
            <div v-for="result in searchResults">
              {{result}}
            </div>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchResult",
    data() {
      return {
        data: {
          fromdist: this.$route.query.fromDist,
          todist: this.$route.query.toDist,
          fromfee: this.$route.query.fromFee,
          tofee: this.$route.query.toFee,
          stuffname: this.$route.query.stuffName
        },
        searchResults: '',
      }
    },
    created() {
      this.search();
    },
    methods: {
      search: function () {
        const url = 'http://localhost:3000/search';
        const query = 'fromDist=' + this.data.fromdist + '&toDist=' + this.data.todist + '&fromFee=' + this.data.fromfee + '&toFee=' + this.data.tofee + '&stuffName=' + this.data.stuffname;

        let lat = this.$store.getters.getLatitude;
        let lng = this.$store.getters.getLongitude;

        const body = {lat:lat, lng:lng};

        this.$http.post(url + '?' + query, body)
          .then(result => {
            console.log(result);
            this.searchResults = result.data;
          })
          .catch(err => {
            console.log(err);
            alert(err);
          })
      }
    },
    watch: {
      searchResults: function () {
        console.log('searchResults changes');
        console.log(this.searchResults);
      }
    }
  }
</script>

<style scoped>
  .outer {
    font-family: "Franklin Gothic Demi";
    width:100%;
    text-align: center;
  }

  .inner {
    display: inline-block;
  }

  #searchResultDiv {
    text-align: left;

  }

  #searchResultDiv table div:hover, table div:focus {
    /*color:#fff;*/
    border: 1px solid #B6F2F0;
    background-color: #B6F2F0;
  }

</style>
