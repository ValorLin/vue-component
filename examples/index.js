var Vue = require('vue');
Vue.config.debug = true;
Vue.config.async = false;

new Vue({
    el: 'body',
    components: {
        'treeview': require('../treeview'),
        'input-treeview': require('./treeview/input-treeview.vue')
    },
    data: {
        tree: {
            children: [
                {
                    name: 'child 1',
                    children: [
                        {name: 'a'},
                        {name: 'b'}
                    ]
                },
                {
                    name: 'child 2',
                    children: [
                        {name: 'c'},
                        {name: 'd'}
                    ]
                },
                {
                    name: 'child 3',
                    children: [
                        {name: 'e'},
                        {name: 'f'}
                    ]
                },
                {name: 'child 4'}]
        }
    }
});
