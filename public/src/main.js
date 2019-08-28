import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import MySideBar from './components/MySideBar'
import axios from './axios'

Vue.component("my-header",MyHeader);
Vue.component("my-footer",MyFooter);
Vue.component("my-sidebar",MySideBar);
Vue.use(axios);
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
