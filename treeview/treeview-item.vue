<template>
    <li :class="{
            'bold': isFolderItem(model),
            'expanded': model.expanded
        }">
        <slot name="indent"></slot>
        <span>{{model.name}}</span>
        <span v-if="isFolderItem(model)" class="arrow" @click.stop="toggleItem(this.model)">[{{model.expanded ? '-' : '+'}}]</span>
        <slot name="child"></slot>
    </li>
</template>
<script>
    var Vue = require('vue');
    module.exports = Vue.extend({
        name: 'treeview-item',
        props: {
            toggleItem: Function,
            isFolderItem: Function,
            isRoot: Function,
            model: Object,
            expanded: Boolean,
            root: Boolean,
            firstChild: Boolean,
            lastChild: Boolean,
            folder: Boolean,
            level: Number
        }
    });
</script>
