<template>
    <div class="input-treeview-item"
         :class="{bold: isFolder}"
         @dblclick.stop="toggle">
        <template v-for="i in level-1">
            {{ i===1 ? '│' : ''}}
            <span class="indent"></span>
        </template>
        {{ isRoot ? '' : isFirstChild ? '├' : isLastChild ? '└' : '├'}}
        <input type="text" v-model="model.name">
        {{ model.children && model.children.length > 0 && isOpen? '┐':''}}
        <span v-if="isFolder" class="expand-handle" @click.stop="toggle">[{{isOpen ? '-' : '+'}}]</span></div>
</template>
<style>
    .input-treeview-item {
        font-size: 28px;
        font-family: Serif;
    }

    .input-treeview-item .expand-handle {
        font-size: 18px;
    }

    .input-treeview-item input {
        vertical-align: middle;
        padding: 3px 3px;
        width: 40px;
    }

    .input-treeview-item .indent {
        width: 50px;
    }
</style>
<script>
    var TreeviewItem = require('../../treeview/treeview-item.vue');
    module.exports = TreeviewItem.extend({});
</script>
