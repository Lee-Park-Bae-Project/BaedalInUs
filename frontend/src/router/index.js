import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import LoginPage from '@/components/auth/LoginPage.vue'
import SignUpPage from '@/components/auth/SignUpPage.vue'
import MainPage from '@/components/MainPage.vue'
import ChatPage from '@/components/chat/ChatPage.vue'
import UserPage from '@/components/UsersVue.vue'
import ChatRoomList from '@/components/chat/ChatRoomList.vue'
import ChatRoom from '@/components/chat/ChatRoom.vue'

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
      component: LoginPage
    },
    {
      path:'/signUp',
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
