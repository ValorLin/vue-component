<template>
    <basic-dialog>
        <slot></slot>
        <footer>
            <button @click="onCancel()">{{cancel}}</button>
            <button @click="onOK()">{{ok}}</button>
        </footer>
    </basic-dialog>
</template>
<script type="text/babel">
    import BasicDialog from '../basic-dialog';

    export default {
        components: {BasicDialog},
        props: {
            ok: {
                type: String,
                default: 'OK'
            },
            cancel: {
                type: String,
                default: 'Cancel'
            }
        },
        methods: {
            show () {
                this.$children[0].show();
                return new Promise((resolve, reject) => {
                    this._resolve = resolve;
                    this._reject = reject;
                });
            },
            hide () {
                this.$children[0].hide();
            },
            onOK: function () {
                this.hide();
                this._resolve();
                this.$dispatch('ok');
            },
            onCancel: function () {
                this.hide();
                this._reject();
                this.$dispatch('cancel');
            }
        }
    };
</script>
