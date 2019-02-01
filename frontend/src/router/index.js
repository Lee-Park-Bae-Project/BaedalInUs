import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
import LoginPage from '@/components/LoginPage.vue'
import SignUpPage from '@/components/SignUpPage.vue'
import MainPage from '@/components/MainPage.vue'
import ChatPage from '@/components/ChatPage.vue'
import UserPage from '@/components/UsersVue'
import ChatRoomList from '@/components/ChatRoomList'
import ChatRoom from '@/components/ChatRoom'

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/chatroomlist',
      component:ChatRoomList
    },
    {
      path:'/chatroom/:roomID', // roomID 의 채팅방으로 이동
      component:ChatRoom
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
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path:'/SignUpPage',
      name:'SignUpPage',
      component:SignUpPage
    },
    {
      path:'/',
      name:'MainPage',
      component:MainPage
    }
  ]
})
