export default{
  getUserID:(state)=>{
    return state.userID;
  },

  getUserKakaoUID:(state)=>{
    return state.userKakaoUID;
  },

  getSocketID:(state)=>{
    return state.userSocketID;
  },

  getRESTAPIKEY:(state)=>{
    return state.RESTAPIKEY;
  },

  getADMINKEY:(state)=>{
    return state.ADMINKEY;
  },

  getJAVASCRIPTKEY:(state)=>{
    return state.JAVASCRIPTKEY;
  },

  getRedirect_uri:(state)=>{
    return state.redirect_uri;
  },

  getAuthorize_code:(state)=>{
    return state.authorize_code;
  },

  getUserToken:(state)=>{
    return state.userToken;
  },

  IsLogined:(state)=>{
    return state.isLogined;
  },
  getUserNickName:(state)=>{
    return state.userInfo.properties.nickname;
  },


}
