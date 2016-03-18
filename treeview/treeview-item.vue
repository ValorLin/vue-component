<template>
    <div :class="{bold: isFolder}">
        <slot name="indent"></slot>
        <span>{{model.name}}</span>
        <span v-if="isFolder" class="arrow" @click.stop="toggle">[{{isOpen ? '-' : '+'}}]</span>
    </div>
</template>
<script>
    var Vue = require('vue');
    module.exports = Vue.extend({
        props: {
            toggle: Function,
            model: Object,
            isOpen: Boolean,
            isRoot: Boolean,
            isFirstChild: Boolean,
            isLastChild: Boolean,
            isFolder: Boolean,
            level: Number
        }
    });
</script>
