var Vue = require('vue');
Vue.config.debug = true;
Vue.config.async = false;

new Vue({
    el: 'body',
    components: {
        'treeview': require('../treeview'),
        'file-treeview': require('./treeview/file-treeview.vue')
    },
    methods: {
        collapseAll: function () {
            this.$refs.basicTreeview.collapseAll();
        },
        expandAll: function () {
            this.$refs.basicTreeview.expandAll();
        }
    },
    data: {
        tree: {
            children: [
                {
                    name: 'parent 1',
                    children: [
                        {
                            name: 'child a',
                            children: [{
                                name: 'deep 1'
                            }, {
                                name: 'deep 2'
                            }]
                        },
                        {name: 'child b'}
                    ]
                },
                {
                    name: 'parent 2',
                    children: [
                        {name: 'child c'},
                        {name: 'child d'}
                    ]
                },
                {
                    name: 'parent 3',
                    children: [
                        {name: 'child e'},
                        {name: 'child f'}
                    ]
                },
                {name: 'parent 4'}
            ]
        }
    }
});
