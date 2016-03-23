<template>
    <div v-show="expanded" class="collapse">
        <slot></slot>
    </div>
</template>
<script>
    var Vue = require("vue");
    module.exports = {
        beforeCompile: function () {
            if (this.group) {
                this.$watch('expanded', function (expanded) {
                    if (expanded) {
                        // find by group
                        debugger
                    }
                });
            }
        },
        props: {
            expanded: Boolean,
            group: String
        }
    };
</script>
