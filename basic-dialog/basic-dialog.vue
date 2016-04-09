<template>
    <div v-show="active"
         class="dialog-container"
         tabindex="0"
         @click.self="onContainerClick">
        <div v-if="active" class="dialog">
            <slot>dialog</slot>
        </div>
    </div>
</template>
<style>
    .dialog-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .dialog-container .dialog {
        max-width: 640px;
        min-width: 320px;
        padding: 1em 2em;
        box-sizing: border-box;
        margin: auto;
        background-color: #fff;
    }

    .dialog-container .dialog footer {
        float: right;
    }

    .dialog-container .dialog footer button ~ button {
        margin-left: 1em;
    }
</style>
<script>
    import Vue from 'vue'

    var keyCodes = Vue.directive('on').keyCodes;

    export default {
        ready () {
            var self = this;
            document.body.appendChild(this.$el);
            window.addEventListener('keyup', function (e) {
                if (e.keyCode === keyCodes.esc) {
                    self.hide();
                }
            });
        },
        data () {
            return {
                active: false
            };
        },
        methods: {
            show () {
                this.active = true;
                this.$dispatch('show');
            },
            hide () {
                this.active = false;
                this.$dispatch('hide');
            },
            onContainerClick () {
                this.hide();
            }
        }
    };
</script>
