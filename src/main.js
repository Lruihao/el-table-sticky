import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.scss'
import App from './App.vue'
import router from '@/router'
import elStickyTable from '@/directive/Plugin'

Vue.use(ElementUI)
Vue.use(elStickyTable)
Vue.config.productionTip = false
Vue.prototype.$fullRouter = router

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
