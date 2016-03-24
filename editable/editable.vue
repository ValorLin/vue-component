<template>
    <span class="editable"
          @dblclick.stop="startEdit">
        <input v-show="editing"
               v-model="text"
               v-focus="editing"
               v-el:edit
               @focus="$event.target.select()"
               @blur="endEdit"
               @keydown.esc="cancelEdit"
               @keypress.enter="endEdit"
               @keydown.stop>
        <span v-else>{{text}}</span>
    </span>
</template>
<style>
    .editable {
        display: inline-block;
        padding: 0 5px;
        margin: 3px -5px;
    }

    .editable > span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .editable > input {
        border: none;
    }

    .editable > span,
    .editable > input {
        font-family: inherit;
        font-size: inherit;
        padding: inherit;
        line-height: inherit;
    }

</style>
<script>
    var Vue = require("vue");
    module.exports = {
        directives: {
            'focus': require('vue-focus').focus
        },
        methods: {
            startEdit: function () {
                this.editing = true;
                this._originText = this.text;
            },
            cancelEdit: function () {
                this.text = this._originText;
                this.endEdit();
            },
            endEdit: function () {
                this.editing = false;
            }
        },
        props: {
            text: String,
            editing: Boolean,
            _originText: String
        }
    };
</script>
