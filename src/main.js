import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store.js'
import router from '@/router/router.js'
import BaseDateFilter from '@/components/BaseDateFilter.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


Vue.use(Buefy)
Vue.component('BaseDateFilter',BaseDateFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
