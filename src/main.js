import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'


Vue.use(ViewUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
