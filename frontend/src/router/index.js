import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '@/components/IndexPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import SignUpPage from '@/components/SignUpPage.vue'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
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
