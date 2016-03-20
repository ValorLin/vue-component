<style>
    .treeview {
        user-select: none;
    }

    .treeview ul {
        position: relative;
        z-index: 0;
    }

    .treeview li {
        overflow: hidden;
    }

    .treeview .file-treeview-item > div > * {
        vertical-align: middle;
    }

    .treeview .file-treeview-item > div > .arrow {
        display: inline-block;
        border: 6px solid transparent;
        border-left-width: 10px;
        border-right-width: 2px;
        border-left-color: #999;
        transform-origin: 4px 6px;
        margin-left: 5px;
        visibility: hidden;
    }

    .treeview .file-treeview-item > .bold > .arrow {
        visibility: visible;
    }

    .treeview .file-treeview-item > div {
        position: relative;
        background-color: #fff;
        z-index: 1;
    }

</style>
<script>
    var Treeview = require('vue-component/treeview');

    module.exports = Treeview.extend({
        components: {
            // override treeview-item component
            'treeview-item': require('./file-treeview-item.vue')
        }
    });
</script>
