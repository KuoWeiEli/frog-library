import Vue from 'vue'
import App from './App.vue'
import router from './router'

// element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';

Vue.use(ElementUI)
Vue.use(VueAxios, axios)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
