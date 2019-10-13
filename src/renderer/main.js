import {remote} from 'electron'
import Vue from 'vue'
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'photon/dist/css/photon.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(Vuetify);
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log('remote: ')
console.log(remote)


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

export default remote
