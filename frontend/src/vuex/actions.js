import getters from './getters';
import mutations from './mutations';
import router from '../router'
import axios from 'axios';
import VueCookie from 'vue-cookie'

/**
 * 카카오로 처음 로그인시 유저정보 등록
 */

// actions는 비동기 처리 로직 담당
export default{
  // 카카오 로그인
  kakaoLogin:(context)=>{
    Kakao.Auth.loginForm({
      success:function(authObj){
        // context.commit('setUserToken', {userToken:authObj}); // mutations의 setUserToken 호출

        Kakao.Auth.setAccessToken(authObj.access_token); // 서버 측에서 새로 발급받은 Access Token을 JavaScript SDK에 설정합니다.


        Kakao.API.request({
          url:'/v2/user/me',
          success:function(res){
            console.log(res);
            context.commit('setUserInfo', {userInfo:res}); // mutations의 setUserInfo 호출
            context.commit('IsLogined',{isLogined:true}); // 로그인 되어 있다고 표시
            context.commit('setUserID', {userID: res.id});
            VueCookie.set('nickname',res.properties.nickname,10); // 카카오 닉네임을 쿠키에 저장함
            // context.dispatch('setKakaoUserToken', authObj, res.id);  // kakao token을 디비에 저장하기
            // context.dispatch('getAccessToken', res.id); // access token 가져오기
            // context.dispatch('setKakaoUserInfo', res); // 카카오 유저정보를 디비에 저장하기

            const data = {
              userToken:authObj,
              userInfo:res
            }
            context.dispatch('setKakaoProperties', data);


          },
          fail: function(err){
            alert(JSON.stringify(err));
          }
        })
          .then(

            ()=>{router.push('/');}
          )
      },
      fail:function(err){
        alert(JSON.stringify(err));
      },

      throughTalk:false, // 간편 로그인 사용 여부
      // persistAccessToken:true // 세션이 종료된 뒤에도 Access Token을 사용할 수 있도록 로컬 스토리지에 저장합니다.
    })

  },
  // 로그아웃
  kakaoLogout:(context)=> {
    console.log('kakao logout');
    Kakao.Auth.logout(function(){
      context.commit('IsLogined', {isLogined:false}); // 로그인 안되어 있다고 표시
      VueCookie.delete('nickname');

    })

  },

  localLogin:(context,userID)=> {
    console.log('local login');
    VueCookie.set('nickname',userID,10);
    context.commit('IsLogined',{isLogined:true});
    context.commit('setUserID', {userID, userID});
  },
  localLogout:(context)=> {
    console.log('local logout');
    VueCookie.delete('access_token'); //액세스 토큰 삭제
    context.commit('IsLogined',{isLogined:false});
    context.commit('setUserID', {setUserID:''});
  },

  isKakaoLogined:(context)=>{
    console.log('isKakaoLogined');
    Kakao.Auth.getStatus(
      function (statusObj) {
        // alert(JSON.stringify(statusObj));

        if(statusObj.status === 'connected'){
          context.commit('IsLogined', {isLogined:true}); // 로그인 되어 있다고 표시
          context.commit('setUserID',{userID:statusObj.user.id}); // 자기 아이디 vuex 에 저장
        } else{
          context.commit('IsLogined', {isLogined:false}); // 로그인 안되어 있다고 표시
        }
      }
    )
  },

  setKakaoProperties:(context, data)=>{
    const url = 'http://localhost:3000/auth/setKakaoProperties';
    const body = {userToken:data.userToken, userInfo:data.userInfo};

    axios.post(url, body)
      .then(result=>{console.log(result)})
      .catch(err=>{console.log(err)})
  },

  sendMsg:(context, data)=>{
    let msg = data.msg; // 메시지 내용
    let sender = data.sender; // 보내는 사람
    let receiver = data.receiver; // 받는사람
    let created = data.created; // 보낸시각

    console.log(data);
    console.log(msg);
    console.log(sender);
    console.log(receiver);
    console.log(created);

    const url = 'http://localhost:3000/chat/sendMsg';
    const body = {msg: msg, sender: sender, receiver: receiver, created: created};

    axios.post(url, body)
      .then(res=>{
        
        console.log(res);
      })
      .catch(err=>{
        alert(err.message);
        console.log(err);
      })
      
  },


}
