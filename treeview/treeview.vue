<template>
    <ul v-if="level===0"
        class="treeview">
        <treeview
                :level="level+1"
                :is-last-child="true"
                :model="model">
        </treeview>
    </ul>
    <li v-else
        :class="{'root': isRoot}">
        <treeview-item :model="model"
                       :level="level"
                       :is-open="isOpen"
                       :is-root="isRoot"
                       :is-folder="isFolder"
                       :is-first-child="isFirstChild"
                       :is-last-child="isLastChild"
                       :toggle="toggle">
            <span slot="indent" v-for="i in level-1" class="indent"></span>
        </treeview-item>
        <ul :class="{'open':isOpen}"
            v-show="isOpen"
            v-if="isFolder">
            <treeview
                    v-for="childModel in model.children"
                    :level="level+1"
                    :is-first-child="$index===0"
                    :is-last-child="model.children && $index===(model.children.length - 1)"
                    :model="childModel">
            </treeview>
        </ul>
    </li>
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

    module.exports = Vue.extend({
        name: 'treeview',
        ready: function () {
            if (this.isRoot) {
                this.isOpen = true;
            }
        },
        components: {
            'treeview-item': require('./treeview-item.vue')
        },
        props: {
            level: {
                type: Number,
                default: 0
            },
            isFirstChild: Boolean,
            isLastChild: Boolean,
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
            toggle: function () {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen;
                }
            }
        }
    });
</script>
