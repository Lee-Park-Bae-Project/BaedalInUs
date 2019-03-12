import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  RESTAPIKEY:'6e5e709121be509e1ecc65d8e64a492f',
  ADMINKEY:'9d0f6c18e77686768cb7f7e09b1cef1a',
  JAVASCRIPTKEY:'b505e1e8f763054ca5204fc1a8852a05',
  redirect_uri:'http://localhost:8080/api',

  /////////////////////////////////////////////////////////
  isLogined:'false', // 로그인 되어있는지
  /////////////////////////////////////////////////////////
  userToken:{
    access_token: '',
    expires_in: '',
    refresh_token: '',
    refresh_token_expires_in: '',
    scope: '',
    token_type: '',
  },

  userInfo: {
    id:'',
    properties:{
      nickname:'',
      profile_image:'',
      thumbnail_image:'',
    },
    kakao_account:{
      has_email:'', // boolean
      is_email_vaild:'', // boolean
      is_email_verified:'', // boolean
      email:'',
      has_age_range:'', //boolean
      has_birthday:'', //boolean
      has_gender:'', // boolean
    }
  },

  myPos:{
    latitude:'', // 위도
    longitude:'', // 경도
    addr:'', // 실제 주소 ( 서울 서대문구 ~ )
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
