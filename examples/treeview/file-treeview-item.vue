<template>
    <li class="file-treeview-item"
        :class="{'open': isOpen}"
        @dblclick.stop="toggleWithAnimate">
        <div :class="{'bold': isFolder}">
            <slot name="indent"></slot>
            <span class="arrow" @click.stop="toggleWithAnimate" @dblclick.stop></span>
            <img class="icon" width="24" :src="model.icon || defaultIcon" alt="Folder">
            <span>{{model.name}}</span>
        </div>
        <slot name="child"></slot>
    </li>
</template>
<script>
    var dynamics = require('dynamics.js');
    var Vue = require('vue');
    var TreeviewItem = require('vue-component/treeview/treeview-item.vue');
    var IMG_FILE = require('./file.png');
    var IMG_FOLDER = require('./folder.png');

    module.exports = TreeviewItem.extend({
        methods: {
            toggleWithAnimate: function () {
                if (!this.isFolder) return;

                var self = this;
                var ulEl = this.$el.querySelector('ul');
                var arrowEl = this.$el.querySelector('.arrow');
                var duration = 250;

                dynamics.stop(ulEl);
                dynamics.stop(arrowEl);

                if (this.isOpen && !this._isHidding) {
                    // Hide
                    var height = parseInt(getComputedStyle(ulEl).height);
                    this._isHidding = true;
                    dynamics.animate(ulEl, {
                        marginTop: -height,
                        opacity: 0
                    }, {
                        duration: duration,
                        complete: function () {
                            self.isOpen = false;
                        }
                    });
                    dynamics.animate(arrowEl, {
                        rotateZ: 0
                    }, {
                        duration: duration
                    });
                } else {
                    // Show
                    this.isOpen = true;
                    this._isHidding = false;
                    this.$nextTick(function () {
                        var ulStyle = getComputedStyle(ulEl);
                        var height = parseInt(ulStyle.height);
                        var startMarginTop = parseInt(ulStyle.marginTop);
                        if (!this._isHidding) {
                            dynamics.css(ulEl, {
                                marginTop: startMarginTop || -height,
                                opacity: 0
                            });
                        }
                        dynamics.animate(ulEl, {
                            marginTop: 0,
                            opacity: 1
                        }, {
                            duration: duration
                        });
                        dynamics.animate(arrowEl, {
                            rotateZ: 90
                        }, {
                            duration: duration
                        });
                    });
                }
            }
        },
        computed: {
            defaultIcon: function () {
                return this.isFolder ? IMG_FOLDER : IMG_FILE;
            }
        },
        props: {
            isChildVisible: {
                type: Boolean,
                default: false
            }
        }
    });
</script>
