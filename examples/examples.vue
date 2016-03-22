<template>
    <div class="content guide with-sidebar">
        <h1>Examples</h1>
        <h2 id="treeview">Treeview</h2>
        <h4>Basic:</h4>
        <treeview v-ref:basic-treeview
                  :model.sync="tree"
                  :root-visible="true"
                  @item-toggle="onTreeviewItemToggle"
                  @item-expand="onTreeviewItemExpand"
                  @item-collapse="onTreeviewItemCollapse"
                  @item-click="onTreeviewItemClick">
        </treeview>
        <p>
            <button @click="collapseAll">Collapse All</button>
            <button @click="expandAll">Expand All</button>
        </p>
        <p>The component is very basic but easy to customize. You could almost do everything. Advanced example:</p>
        <h4>File Treeview:</h4>
        <file-treeview :model.sync="files"
                       @item-toggle="onTreeviewItemToggle"
                       @item-expand="onTreeviewItemExpand"
                       @item-collapse="onTreeviewItemCollapse"
                       @item-click="onTreeviewItemClick">
        </file-treeview>
        <p> Checkout these files to learn how to customise your own treeview
        <ul>
            <li><code>/examples/treeview/file-treeview.vue</code></li>
            <li><code>/examples/treeview/file-treeview-item.vue</code></li>
        </ul>
        </p>
    </div>
</template>
<script>
    module.exports = {
        components: {
            'treeview': require('../treeview'),
            'file-treeview': require('./treeview/file-treeview.vue')
        },
        methods: {
            onTreeviewItemClick: function (e) {
                console.log('item-click', e);
            },
            onTreeviewItemToggle: function (e) {
                console.log('item-toggle', e);
            },
            onTreeviewItemExpand: function (e) {
                console.log('item-expand', e);
            },
            onTreeviewItemCollapse: function (e) {
                console.log('item-collapse', e);
            },
            collapseAll: function () {
                this.$refs.basicTreeview.collapseAll();
            },
            expandAll: function () {
                this.$refs.basicTreeview.expandAll();
            }
        },
        data: function () {
            return {
                tree: {
                    name: 'root',
                    children: [{
                        name: 'parent 1',
                        expanded: true,
                        children: [{
                            name: 'child a',
                            children: [
                                {name: 'deep 1'},
                                {name: 'deep 2'}
                            ]
                        }, {
                            name: 'child b',
                            expanded: true,
                            children: [
                                {name: 'deep 3'},
                                {name: 'deep 4'}
                            ]
                        }]
                    }, {
                        name: 'parent 2',
                        children: [
                            {name: 'child c'},
                            {name: 'child d'}
                        ]
                    }, {
                        name: 'parent 3',
                        children: [
                            {name: 'child e'},
                            {name: 'child f'}
                        ]
                    }, {
                        name: 'parent 4',
                        children: [
                            {name: 'child g'},
                            {name: 'child h'}
                        ]
                    }]
                },
                files: {
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
                                    }, {
                                        name: 'deep 3'
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
            };
        }
    };
</script>
