<template>
    <li class="file-treeview-item"
        :class="{
            'expanded'  : model.expanded,
            'selected'  : model.selected,
            'collapsing': _hiding
        }"
        @dblclick.stop="_editing=true">
        <div :class="{'bold': this.isFolderItem(model)}">
            <slot name="indent"></slot>
            <span class="arrow" @click.stop="toggleWithAnimate" @dblclick.stop></span>
            <img class="icon" width="20" :src="model.icon || defaultIcon" alt="Icon">
            <editable :text.sync="model.name" :editing.sync="_editing"></editable>
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
        components: {
            'editable': require('../editable')
        },
        beforeCompiled: function () {
            this.$set('model.selected', false);
        },
        methods: {
            toggleWithAnimate: function () {
                if (!this.isFolderItem(this.model)) return;

                var self = this;
                var ulEl = this.$el.querySelector('ul');
                var arrowEl = this.$el.querySelector('.arrow');
                var duration = 250;

                dynamics.stop(ulEl);
                dynamics.stop(arrowEl);

                if (this.model.expanded && !this._hiding) {
                    // Hide
                    var height = parseInt(getComputedStyle(ulEl).height);
                    this._hiding = true;
                    dynamics.animate(ulEl, {
                        marginTop: -height,
                        opacity: 0
                    }, {
                        duration: duration,
                        complete: function () {
                            self._hiding = false;
                            self.model.expanded = false;
                        }
                    });
                    dynamics.animate(arrowEl, {
                        rotateZ: 0
                    }, {
                        duration: duration
                    });
                    self.$dispatch('item-collapse', {
                        model: self.model
                    });
                } else {
                    // Show
                    this.model.expanded = true;
                    this._hiding = false;
                    this.$nextTick(function () {
                        var ulStyle = getComputedStyle(ulEl);
                        var height = parseInt(ulStyle.height);
                        var startMarginTop = parseInt(ulStyle.marginTop);
                        if (!this._hiding) {
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
                        this.$dispatch('item-expand', {
                            model: self.model
                        });
                    });
                }
                this.$dispatch('item-toggle', {
                    model: self.model,
                    expanded: self.model.expanded
                });
            }
        },
        computed: {
            defaultIcon: function () {
                return this.isFolderItem(this.model) ? IMG_FOLDER : IMG_FILE;
            }
        },
        props: {
            _hiding: Boolean,
            _editing: Boolean
        }   
    });
</script>
