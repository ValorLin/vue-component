<template>
    <basic-dialog class="prompt-dialog">
        <slot></slot>
        <input v-focus="_focus"
               v-model="_value"
               type="text"
               :placeholder="placeholder"
               @keypress.enter="onOK">
        <footer>
            <button @click="onCancel">{{cancel}}</button>
            <button class="primary" @click="onOK">{{ok}}</button>
        </footer>
    </basic-dialog>
</template>
<style>
    .prompt-dialog input {
        display: block;
        box-sizing: border-box;
        margin-bottom: 1em;
        width: 100%;
    }
</style>
<script type="text/babel">
    import {focus} from 'vue-focus'
    import BasicDialog from '../basic-dialog'

    export default {
        directives: {focus},
        components: {BasicDialog},
        props: {
            ok: {
                type: String,
                default: 'OK'
            },
            cancel: {
                type: String,
                default: 'Cancel'
            },
            placeholder: {
                type: String,
                default: ''
            },
            _value: {
                type: String,
                default: ''
            },
            _focus: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            show () {
                this.$children[0].show();
                this._focus = true;
                return new Promise((resolve, reject) => {
                    this._resolve = resolve;
                    this._reject = reject;
                });
            },
            hide () {
                this.$children[0].hide();
                this._focus = false;
            },
            onOK () {
                this.hide();
                this._resolve(this._value);
                this.$dispatch('ok', {value: this._value});
                this._value = '';
            },
            onCancel () {
                this.hide();
                this._reject();
                this.$dispatch('cancel');
                this._value = '';
            }
        }
    };
</script>
