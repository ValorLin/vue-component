<template>
    <basic-dialog>
        <slot></slot>
        <footer>
            <button class="primary" v-focus="_focus" @click="onOK">{{ok}}</button>
        </footer>
    </basic-dialog>
</template>
<script type="text/babel">
    import {focus} from 'vue-focus'
    import BasicDialog from '../basic-dialog';

    export default {
        directives: {focus},
        components: {BasicDialog},
        props: {
            ok: {
                type: String,
                default: 'OK'
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
                return new Promise((resolve) => {
                    this._resolve = resolve;
                });
            },
            hide () {
                this._focus = false;
                this.$children[0].hide();
            },
            onOK () {
                this.hide();
                this._resolve();
                this.$dispatch('ok');
            },
            onKeydown (){
                debugger
            }
        }
    };
</script>
