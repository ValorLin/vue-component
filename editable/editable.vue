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
    import Vue from 'vue'
    import {focus} from 'vue-focus'

    export default {
        directives: {focus},
        props: {
            text: String,
            editing: Boolean,
            _originText: String
        },
        methods: {
            startEdit () {
                this.editing = true;
                this._originText = this.text;
            },
            cancelEdit () {
                this.text = this._originText;
                this.endEdit();
            },
            endEdit () {
                this.editing = false;
            }
        }
    };
</script>
