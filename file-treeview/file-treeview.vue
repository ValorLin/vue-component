<style>
    .treeview {
        user-select: none;
    }

    .treeview ul {
        position: relative;
        z-index: 0;
    }

    .treeview li {
        overflow: hidden;
    }

    .treeview li > div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 5px;
    }

    .treeview .file-treeview-item > div > * {
        vertical-align: middle;
        line-height: 25px;
    }

    .treeview .file-treeview-item > div > .arrow {
        display: inline-block;
        border: 6px solid transparent;
        border-left-width: 10px;
        border-right-width: 2px;
        border-left-color: rgb(140, 140, 140);
        transform-origin: 4px 6px;
        margin-left: 10px;
        visibility: hidden;
    }

    .treeview .file-treeview-item > .bold > .arrow {
        visibility: visible;
    }

    .treeview .file-treeview-item > div {
        position: relative;
        background-color: rgb(245, 245, 245);
        color: rgb(39, 39, 39);
        z-index: 1;
        transition: all 0.25s ease;
    }

    .treeview .file-treeview-item.odd > div {
        background-color: rgb(255, 255, 255);
    }

    .treeview .file-treeview-item.selected > div {
        background-color: rgb(17, 108, 214);
        color: #ffffff;
        transition: none;
    }

    .treeview .file-treeview-item.selected > div .arrow {
        border-left-color: inherit;
    }
</style>
<script>
    import Vue from 'vue'
    import Treeview from '../treeview'
    import TreeviewItem from './file-treeview-item.vue'

    export default Treeview.extend({
        components: {
            TreeviewItem // override treeview-item component
        },
        events: {
            'item-toggle': function () {
                this.updateItemOdd();
            }
        },
        ready () {
            if (this.isRoot(this.level)) {
                this.updateItemOdd();
            }
        },
        methods: {
            updateItemOdd () {
                this.$nextTick(function () {
                    var rootEl = this.getRoot().$el;
                    var itemEls = rootEl.querySelectorAll('.expanded>ul>li, :scope>li');
                    var collapsingEl = rootEl.querySelector('.collapsing');
                    var visibleItemEls = [];

                    if (collapsingEl) {
                        for (var i = 0; i < itemEls.length; i++) {
                            if (collapsingEl && collapsingEl.contains(itemEls[i]) && !collapsingEl.isSameNode(itemEls[i])) continue;
                            visibleItemEls.push(itemEls[i]);
                        }
                    } else {
                        visibleItemEls = itemEls;
                    }

                    for (var i = 0; i < visibleItemEls.length; i++) {
                        if (i % 2 !== 0) {
                            visibleItemEls[i].classList.add('odd');
                        } else {
                            visibleItemEls[i].classList.remove('odd');
                        }
                    }
                });
            },

            onItemClick (model) {
                this.deselectOthers(this.getRootModel(), model);
                this.selectItem(model);
                this.$dispatch('item-click', {
                    model: model
                });
            },

            selectItem (model) {
                Vue.set(model, 'selected', true);
                this.$dispatch('item-select', {
                    model: model
                });
            },

            deselectItem (model) {
                Vue.set(model, 'selected', false);
                this.$dispatch('item-deselect', {
                    model: model
                });
            },

            deselectOthers (model, excluded) {
                var self = this;
                if (this.isFolderItem(model)) {
                    model.children.forEach(function (child) {
                        if (child !== excluded) {
                            self.deselectItem(child);
                        }
                        self.deselectOthers(child, excluded);
                    });
                }
            },

            deselectAll (model) {
                this.deselectOthers(model);
            }
        },

        props: {
//            multiSelectable: {
//                type: Boolean,
//                default: false
//            }
        }
    })
    ;
</script>
