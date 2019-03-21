import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Vuetify from 'vuetify'
Vue.use(Router);
Vue.use(Vuetify);


import LoginPage from '@/components/auth/LoginPage.vue'
import SignUpPage from '@/components/auth/SignUpPage.vue' // 회원가입
import MainPage from '@/components/MainPage.vue'
import ChatPage from '@/components/chat/ChatPage.vue'
import UserPage from '@/components/UsersVue.vue'
import ChatRoomList from '@/components/chat/ChatRoomList.vue' // 채팅방목록
import ChatRoom from '@/components/chat/ChatRoom.vue' // 채팅방
import postPage from '@/components/post/postPage.vue' // 주문하기
import MyPage from '@/components/myPage.vue'
import PaginateList from '@/components/post/PaginateList.vue'
import SearchResult from'@/components/SearchResult.vue' // 검색 결과

import logintest from '@/components/auth/logintest.vue'
import auth from '@/components/auth/auth.vue'

// 로그인 확인하기
const requireAuth = ()=>(from, to, next)=>{
  if(store.getters.IsLogined) return next();
  alert('로그인이 필요한 서비스입니다');
  next('/login');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/searchResult',
      component:SearchResult
    },
    {
      path:'/myPage',
      component:MyPage,
      beforeEnter:requireAuth()
    },
    {
      path:'/auth',
      component:auth
    },
    {
      path:'/logintest',
      component:logintest
    },
    {
      path:'/chatroomlist',
      component:ChatRoomList,
      beforeEnter:requireAuth()
    },
    {
      path:'/chatroom/:roomID', // roomID 의 채팅방으로 이동
      component:ChatRoom,
      beforeEnter:requireAuth()
    },
    {
      path:'/userList',
      name:'UsersVue',
      component:UserPage
    },
    {
      path:'/chat',
      name:'ChatPage',
      component:ChatPage
    },
    {
      path:'/login',
      component: LoginPage
    },
    {
      path:'/signUp',
      name:'SignUpPage',
      component:SignUpPage
    },
    {
      path:'/post',
      name:'postPage',
      component: postPage,
      beforeEnter:requireAuth()

    },
    {
      path:'/pagination',
      name:'PaginateList',
      component: PaginateList,
      beforeEnter:requireAuth()

    },
    {
      path:'/',
      name:'MainPage',
      component:MainPage
    }
  ]
})
