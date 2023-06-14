import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$fullRouter = router

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
