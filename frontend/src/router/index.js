import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
import IndexPage from '@/components/IndexPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import SignUpPage from '@/components/SignUpPage.vue'
import MainPage from '@/components/MainPage.vue'
import ChatPage from '@/components/ChatPage.vue'
import UserPage from '@/components/UsersVue'
import ChatRooms from '@/components/ChatRooms'

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/ChatRooms',
      component:ChatRooms
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
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path:'/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path:'/signup',
      name:'SignUpPage',
      component:SignUpPage
    },
    {
      path:'/main',
      name:'MainPage',
      component:MainPage
    }
  ]
})
