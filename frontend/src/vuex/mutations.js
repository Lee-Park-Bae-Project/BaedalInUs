export default {
  setUserID: (state, payload) => {
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

}
