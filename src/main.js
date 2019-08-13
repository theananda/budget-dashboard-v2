import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './assets/css/style.css'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { routerHistory, writeHistory } from 'vue-router-back-button'

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

Vue.use(routerHistory)
router.afterEach(writeHistory)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
