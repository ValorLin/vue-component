import store from './vuex/store'
import Vue from 'vue'

Vue.config.debug = true;
Vue.config.async = false;
Vue.config.devtools = true;

new Vue({
    el: 'body',
    store,
    components: {
        examples: require('./vuex-examples.vue')
    }
});
