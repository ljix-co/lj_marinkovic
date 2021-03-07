import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vue2Editor from "vue2-editor"
import LazyLoadDirective from './directives/LazyLoadDirective';

Vue.use(Vue2Editor);

Vue.config.productionTip = false

Vue.directive("lazyload", LazyLoadDirective);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
