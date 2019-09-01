import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import './plugins/element.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
import FastClick from 'fastclick'

FastClick.attach(document.body);

Vue.component('Scroller', Scroller)

Vue.component('Loading', Loading)
Vue.use(MintUI)

Vue.prototype.axios = axios;

Vue.config.productionTip = false;

Vue.filter('setWH', (url, arg) => {
    if (!url) return ''

    return url.replace(/w\.h/, arg);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
