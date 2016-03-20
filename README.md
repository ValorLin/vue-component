# vue-component
Components for Vue.js

[DEMO](https://weilao.github.io/vue-component/examples)

## Treeview
### Usage
#### HTML:

```html
<treeview v-ref:basic-treeview
          :model="tree"
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
        	  rootVisible
            children: [
                {
                    name: 'parent 1',
                    children: [
                        {
                            name: 'child a',
                            children: [{
                                name: 'deep 1'
                            }, {
                                name: 'deep 2'
                            }]
                        },
                        {name: 'child b'}
                    ]
                },
                {
                    name: 'parent 2',
                    children: [
                        {name: 'child c'},
                        {name: 'child d'}
                    ]
                },
                {
                    name: 'parent 3',
                    children: [
                        {name: 'child e'},
                        {name: 'child f'}
                    ]
                },
                {name: 'parent 4'}
            ]
        }
    }
});
```