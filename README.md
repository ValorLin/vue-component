# vue-component

Components for Vue.js v1.0

This project is no active anymore but it's still a good example (basic-dialog、alert-dialog) of how to write vue compoents (Still not the best way although).

**DO NOT** use it in your production environment, but feel free to fork.

If you have any idea about the project, just open an issue.

[DEMO](https://weilao.github.io/vue-component/examples)

## Treeview
### Usage
#### HTML:

```html
<treeview v-ref:basic-treeview
          :model="tree"
          :root-visible="true"
          @item-toggle="onItemToggle"
          @item-expand="onItemExpand"
          @item-collapse="onItemCollapse"
          @item-click="onItemClick">
</treeview>
```
#### JS
```js
new Vue({
    el: 'body',
    components: {
        'treeview': require('vue-component/treeview')
    },
    methods: {
        onItemClick: function (e) {
            console.log('item-click', e);
        },
        onItemToggle: function (e) {
            console.log('toggle', e);
        },
        onItemExpand: function (e) {
            console.log('expand', e);
        },
        onItemCollapse: function (e) {
            console.log('toggle', e);
        },
        collapseAll: function () {
            this.$refs.basicTreeview.collapseAll();
        },
        expandAll: function () {
            this.$refs.basicTreeview.expandAll();
        }
    },
    data: {
        tree: {
            name: 'root',
            children: [{
                name: 'parent 1',
                expanded: true,
                children: [{
                    name: 'child a',
                    children: [
                        {name: 'deep 1'},
                        {name: 'deep 2'}
                    ]
                }, {
                    name: 'child b',
                    expanded: true,
                    children: [
                        {name: 'deep 3'},
                        {name: 'deep 4'}
                    ]
                }]
            }, {
                name: 'parent 2',
                children: [
                    {name: 'child c'},
                    {name: 'child d'}
                ]
            }, {
                name: 'parent 3',
                children: [
                    {name: 'child e'},
                    {name: 'child f'}
                ]
            }, {
                name: 'parent 4',
                children: [
                    {name: 'child g'},
                    {name: 'child h'}
                ]
            }]
        }
    }
});
```
