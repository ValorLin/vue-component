var Vue = require('vue');
Vue.config.debug = true;

new Vue({
    el: 'body',
    components: {
        'treeview': require('../treeview'),
        'input-treeview': require('./treeview/input-treeview.vue')
    },
    data: {
        tree: {
            name: 'root',

            children: [
                {name: 'child 1'},
                {name: 'child 2'},
                {
                    name: 'child 3',
                    children: [
                        {name: 'a'},
                        {name: 'b'}
                    ]
                },
                {name: 'child 4'}]
        }
    }
});
