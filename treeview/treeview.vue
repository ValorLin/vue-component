<template>
    <ul :class="{'treeview': isRoot(level)}">
        <treeview-item v-for="child in _model.children"
                       :class="'level-'+(level+1)"
                       :model="child"
                       :level="level+1"
                       :index="$index"
                       :expanded.sync="child.expanded"
                       :first-child="isFirstItem($index)"
                       :last-child="isLastItem($index)"
                       :is-root="isRoot"
                       :is-folder-item="isFolderItem"
                       :toggle-item="toggleItem"
                       @click.stop="onItemClick(child)">
            <span slot="indent"
                  v-for="i in level"
                  class="indent">
            </span>
            <treeview slot="child"
                      v-if="isFolderItem(child)"
                      v-show="child.expanded"
                      :level="level+1"
                      :root-visible="false"
                      :model.sync="child">
            </treeview>
        </treeview-item>
    </ul>
</template>
<style>
    .treeview,
    .treeview ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .treeview .indent {
        display: inline-block;
        width: 30px;
    }
</style>
<script>
    var Vue = require('vue');
    var TreeviewItem = require('./treeview-item.vue');

    var Treeview = Vue.extend({
        name: 'treeview',
        beforeCompile: function () {
            if (this.rootVisible) {
                if (typeof this.model.expanded === 'undefined') {
                    Vue.set(this.model, 'expanded', true);
                }
                this._model = {children: [this.model]};
            } else {
                this._model = this.model;
            }

            if (this._model.children) {
                this._model.children.forEach(function (child) {
                    if (typeof child.expanded === 'undefined') {
                        Vue.set(child, 'expanded', false);
                    }
                });
            }
        },
        components: {
            'treeview-item': TreeviewItem
        },
        props: {
            level: {
                type: Number,
                default: 0
            },
            model: Object,
            _model: Object,
            rootVisible: Boolean
        },
        methods: {
            isRoot: function (level) {
                return level === 0;
            },

            isFirstItem: function (index) {
                return index === 0;
            },

            isLastItem: function (index) {
                if (this._model.children) {
                    return index === this._model.children.length - 1;
                } else {
                    return false;
                }
            },

            isFolderItem: function (model) {
                return model.children && model.children.length > -1;
            },

            onItemClick: function (model) {
                this.$dispatch('item-click', {
                    model: model
                });
            },

            toggleItem: function (model) {
                model.expanded ? this.collapseItem(model) : this.expandItem(model);
                this.$dispatch('item-toggle', {
                    model: model,
                    expanded: model.expanded
                });
            },

            expandItem: function (model) {
                if (!this.isFolderItem(model)) return;

                model.expanded = true;
                this.$dispatch('item-expand', {
                    model: model
                });
            },

            collapseItem: function (model) {
                if (!this.isFolderItem(model)) return;

                model.expanded = false;
                this.$dispatch('item-collapse', {
                    model: model
                });
            },

            expandAll: function (model) {
                var self = this;
                model = model || this._model;
                if (this.isFolderItem(model)) {
                    model.children.forEach(function (child) {
                        self.expandItem(child);
                        self.expandAll(child);
                    });
                }
            },

            collapseAll: function (model) {
                var self = this;
                model = model || this._model;
                if (this.isFolderItem(model)) {
                    model.children.forEach(function (child) {
                        self.collapseItem(child);
                        self.collapseAll(child);
                    });
                }
            },

            getRoot: function () {
                var target = this;
                while (!this.isRoot(target.level)) {
                    target = target.$parent;
                }
                return target;
            },

            getRootModel: function () {
                return this.getRoot()._model;
            }
        }
    });

    module.exports = Treeview;
</script>
