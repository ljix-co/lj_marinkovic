import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vue2Editor from "vue2-editor"
import VueI18n from 'vue-i18n';
import LazyLoadDirective from './directives/LazyLoadDirective';
import i18n from './i18n'

Vue.use(Vue2Editor);
Vue.use(VueI18n)
Vue.config.productionTip = false

Vue.directive("lazyload", LazyLoadDirective);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
