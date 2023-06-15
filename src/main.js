import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
import App from './App.vue'
import router from '@/router'
import elTableSticky from '@/directive'
// development mode
// import elTableSticky from '../dist/el-table-sticky.umd.js'

Vue.use(ElementUI)
Vue.use(elTableSticky)
Vue.config.productionTip = false
Vue.prototype.$fullRouter = router

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
