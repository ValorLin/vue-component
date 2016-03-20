<template>
    <ul v-if="level===0"
        class="treeview">
        <treeview
                v-for="child in model.children"
                :level="level+1"
                :is-first-child="true"
                :is-last-child="true"
                :model="child">
        </treeview>
    </ul>
    <treeview-item v-else
                   @click.stop="onItemClick"
                   :model="model"
                   :level="level"
                   :is-open.sync="isOpen"
                   :is-root="isRoot"
                   :is-folder="isFolder"
                   :is-first-child="isFirstChild"
                   :is-last-child="isLastChild"
                   :toggle="toggle">
        <span slot="indent"
              class="indent"
              v-for="i in level-1"></span>
        <ul slot="child"
            v-show="isOpen"
            v-if="isFolder">
            <treeview
                    v-for="child in model.children"
                    :level="level+1"
                    :is-first-child="$index===0"
                    :is-last-child="model.children && $index===(model.children.length - 1)"
                    :model="child">
            </treeview>
        </ul>
    </treeview-item>
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
        components: {
            'treeview-item': TreeviewItem
        },
        props: {
            level: {
                type: Number,
                default: 0
            },
            isFirstChild: Boolean,
            isLastChild: Boolean,
            children: Array,
            model: Object
        },
        data: function () {
            return {
                isOpen: false
            }
        },
        computed: {
            isRoot: function () {
                return this.level === 1;
            },
            isFolder: function () {
                return this.model.children && this.model.children.length > 0
            }
        },
        methods: {
            onItemClick: function () {
                this.$dispatch('item-click', {
                    model: this.model
                });
            },
            toggle: function (child) {
                if (this.isFolder) {
                    if (this.isOpen) {
                        this.collapse();
                    } else {
                        this.expand();
                    }
                }
                this.$dispatch('toggle', {
                    model: this.model,
                    isOpen: this.isOpen
                });
            },
            expand: function () {
                this.isOpen = true;
                this.$dispatch('expand', {
                    model: this.model
                });
            },
            expandAll: function () {
                this.expand();
                this.$children.forEach(function (child) {
                    if (child instanceof Treeview) {
                        child.expandAll();
                    } else if (child instanceof TreeviewItem) {
                        if (child.$children.length > 0) {
                            child.$children[0].expandAll();
                        }
                    }
                });
            },
            collapse: function () {
                this.isOpen = false;
                this.$dispatch('collapse', {
                    model: this.model
                });
            },
            collapseAll: function () {
                this.collapse();
                this.$children.forEach(function (child) {
                    if (child instanceof Treeview) {
                        child.collapseAll();
                    } else if (child instanceof TreeviewItem) {
                        if (child.$children.length > 0) {
                            child.$children[0].collapseAll();
                        }
                    }
                });
            }
        }
    });

    module.exports = Treeview;
</script>
