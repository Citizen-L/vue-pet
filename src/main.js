import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element封装的组件
import './plugins/element'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
