<script>
    var Treeview = require('../../treeview');

    module.exports = Treeview.extend({
        // override treeview-item component
        components: {
            'treeview-item': require('./input-treeview-item.vue')
        }
    });
</script>
