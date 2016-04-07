<template>
    <basic-dialog>
        <slot></slot>
        <footer>
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
            }
        },
        methods: {
            show () {
                this.$children[0].show();
                return new Promise((resolve) => {
                    this._resolve = resolve;
                });
            },
            hide () {
                this.$children[0].hide();
            },
            onOK: function () {
                this.hide();
                this._resolve();
                this.$dispatch('ok');
            }
        }
    };
</script>
