<template>
    <div class="content guide with-sidebar">
        <h1>Examples</h1>
        <h2 id="treeview">Treeview</h2>
        <h4>Basic:</h4>
        <treeview v-ref:basic-treeview
                  :model="tree"
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
        <file-treeview :model="files"
                       @item-toggle="onTreeviewItemToggle"
                       @item-expand="onTreeviewItemExpand"
                       @item-collapse="onTreeviewItemCollapse"
                       @item-click="onTreeviewItemClick">
        </file-treeview>
        <p> Checkout these files to learn how to customise your own treeview
        <ul>
            <li><code>/file-treeview/file-treeview.vue</code></li>
            <li><code>/file-treeview/file-treeview-item.vue</code></li>
        </ul>
        </p>
        <h2>Editable</h2>
        <editable :text.sync="editable.text"></editable>
        <h2>Accordion</h2>
        <div class="accordion">
            <template v-for="child in accordion.children">
                <h3 @click="child.expanded=!child.expanded">{{child.name}}</h3>
                <div v-if="child.expanded">
                    <p>{{child.name}}</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    module.exports = {
        components: {
            'treeview': require('../treeview'),
            'file-treeview': require('../file-treeview'),
            'editable': require('../editable')
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
                },
                accordion: {
                    children: [
                        {name: 'accordion item 1', expanded: false},
                        {name: 'accordion item 2', expanded: false},
                        {name: 'accordion item 3', expanded: false}
                    ]
                },
                editable: {
                    text: 'Double click here to edit'
                }
            };
        }
    };
</script>
