<template>
    <div class="content guide with-sidebar">
        <h1>Examples</h1>
        <h2 id="treeview">Treeview</h2>
        <h4>Basic:</h4>
        <treeview v-ref:basic-treeview
                  :model="tree | cloneDeep"
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
        <file-treeview :model="files | cloneDeep"
                       @item-toggle="onFileTreeviewItemToggle"
                       @item-expand="onFileTreeviewItemExpand"
                       @item-collapse="onFileTreeviewItemCollapse"
                       @item-click="onFileTreeviewItemClick">
        </file-treeview>
        <p> Checkout these files to learn how to customise your own treeview
        <ul>
            <li><code>/file-treeview/file-treeview.vue</code></li>
            <li><code>/file-treeview/file-treeview-item.vue</code></li>
        </ul>
        </p>
        <h2>Editable</h2>
        <editable :text="editable.text" @change="onEditableChange"></editable>
        <!--<h2>Accordion</h2>-->
        <!--<div class="accordion">-->
            <!--<template v-for="child in accordion.children">-->
                <!--<h3 @click="child.expanded=!child.expanded">{{child.name}}</h3>-->
                <!--<div v-if="child.expanded">-->
                    <!--<p>{{child.name}}</p>-->
                <!--</div>-->
            <!--</template>-->
        <!--</div>-->
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue'
    import extend from 'extend'
    import actions from './vuex/actions'
    import getters from './vuex/getters'
    import types from './vuex/mutation-types'

    module.exports = {
        components: {
            'treeview': require('../treeview'),
            'file-treeview': require('../file-treeview'),
            'editable': require('../editable')
        },
        filters: {
            cloneDeep: obj => extend(true, {}, obj)
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
                this.expandTreeItem(e.model.id);
            },
            onTreeviewItemCollapse: function (e) {
                console.log('folder-item-collapse', e);
                this.collapseTreeItem(e.model.id);
            },
            onFileTreeviewItemClick: function (e) {
                console.log('file-item-click', e);
            },
            onFileTreeviewItemToggle: function (e) {
                console.log('folder-toggle', e);
            },
            onFileTreeviewItemExpand: function (e) {
                console.log('folder-item-expand', e);
                this.expandFolder(e.model.id);
            },
            onFileTreeviewItemCollapse: function (e) {
                console.log('folder-item-collapse', e);
                this.collapseFolder(e.model.id);
            },
            collapseAll: function () {
                this.$refs.basicTreeview.collapseAll();
            },
            expandAll: function () {
                this.$refs.basicTreeview.expandAll();
            },
            onEditableChange: function (e) {
                this.modifyEditable(e.target.value);
            }
        },
//
//        computed: {
//            accordion: function () {
//                return extend(true, {}, this._accordion);
//            }
//        },
        vuex: {actions, getters}
    };
</script>
