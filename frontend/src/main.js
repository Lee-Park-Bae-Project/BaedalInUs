// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './vuex/store';
import VueCookie from 'vue-cookie'
import 'vuetify/dist/vuetify.min.css';

Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.prototype.$cookie = VueCookie;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Kakao.init(store.getters.getJAVASCRIPTKEY);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>',
  store,
});
