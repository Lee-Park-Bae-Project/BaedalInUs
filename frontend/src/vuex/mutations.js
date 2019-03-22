export default {
  setUserID: (state, payload) => {
    console.log(payload);
    state.userID = payload.userID;
  },
  setAuthorize_code: (state, payload) => {
    state.authorize_code = payload.authorize_code;
  },
  setUserSocketID: (state, payload) => {
    state.userSocketID = payload.userSocketID;
  },
  setUserToken: (state, payload) => {
    state.userToken = payload.userToken;
  },
  setUserInfo: (state, payload)=>{
    state.userInfo = payload.userInfo;
  },
  IsLogined:(state, payload)=>{
    state.isLogined = payload.isLogined;
  },
  setLatitude:(state, payload)=>{
    state.myPos.latitude = payload.latitude;
  },
  setLongitude:(state, payload)=>{
    state.myPos.longitude = payload.longitude;
  },
  setAddr:(state, payload)=>{
    state.myPos.addr = payload.addr;
  }

}
