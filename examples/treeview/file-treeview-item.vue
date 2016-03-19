<template>
    <li class="file-treeview-item"
        :class="{'open': isOpen}"
        @dblclick.stop="toggleWithAnimate">
        <div :class="{bold: isFolder}">
            <slot name="indent"></slot>
            <span v-visibility="isFolder" class="arrow" @click.stop="toggleWithAnimate"></span>
            <img class="icon" width="24" :src="model.icon || defaultIcon" alt="Folder">
            <span>{{model.name}}</span>
        </div>
        <slot name="child"></slot>
    </li>
</template>
<script>
    var dynamics = require('dynamics.js');
    var Vue = require('vue');
    var TreeviewItem = require('../../treeview/treeview-item.vue');
    var IMG_FILE = require('./file.png');
    var IMG_FOLDER = require('./folder.png');

    module.exports = TreeviewItem.extend({
        ready: function () {
        },
        methods: {
            /**
             * A customised toggle method with animation.
             */
            toggleWithAnimate: function () {
                var self = this;
                var ulEl = this.$el.querySelector('ul');
                var arrowEl = this.$el.querySelector('.arrow');
                var duration = 250;

                if (this.isOpen) {
                    var height = parseInt(getComputedStyle(ulEl).height);
                    // Hide
                    dynamics.css(ulEl, {
                        marginTop: 0,
                        opacity: 1
                    });
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
                    this.$nextTick(function () {
                        var height = parseInt(getComputedStyle(ulEl).height);
                        dynamics.css(ulEl, {
                            marginTop: -height,
                            opacity: 0
                        });
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
        directives: {
            'visibility': function (isVisible) {
                this.el.style.visibility = isVisible ? 'visible' : 'hidden';
            }
        },
        computed: {
            defaultIcon: function () {
                return this.isFolder ? IMG_FOLDER : IMG_FILE;
            }
        }
    });
</script>
