import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './assets/css/style.css'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { routerHistory, writeHistory } from 'vue-router-back-button'
import VueAnalytics from 'vue-analytics'
import config from './config/index.js'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

Vue.filter('numFormat', numFormat(numeral));

Vue.use(routerHistory)
router.afterEach(writeHistory)

Vue.use(VueAnalytics, {
  id: config.google_analytic_id,
  router
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
