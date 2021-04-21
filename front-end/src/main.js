import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './assets/mock-data.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

let data = {
    poems: mock,
}

new Vue({
    data,
    router,
    render: h => h(App)
}).$mount('#app')
