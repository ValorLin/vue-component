<template>
    <div class="content guide with-sidebar">
        <h1>Examples</h1>
        <h2 id="treeview">Treeview</h2>
        <h3>Basic:</h3>
        <treeview v-ref:basic-treeview
                  :model="tree"
                  :root-visible="true"
                  @item-toggle="onTreeviewItemToggle"
                  @item-expand="onTreeviewItemExpand"
                  @item-collapse="onTreeviewItemCollapse"
                  @item-click="onTreeviewItemClick">
        </treeview>
        <p>
            <button @click="collapseAll">Collapse All</button>
            <button @click="expandAll">Expand All</button>
        </p>
        <p>The component is very basic but easy to customize. You could almost do everything. Advanced example:</p>
        <h3>File Treeview:</h3>
        <file-treeview :model="files"
                       @item-toggle="onTreeviewItemToggle"
                       @item-expand="onTreeviewItemExpand"
                       @item-collapse="onTreeviewItemCollapse"
                       @item-click="onTreeviewItemClick">
        </file-treeview>
        <p> Checkout these files to learn how to customise your own treeview </p>
        <ul>
            <li><code>/file-treeview/file-treeview.vue</code></li>
            <li><code>/file-treeview/file-treeview-item.vue</code></li>
        </ul>

        <h2 id="dialog">Dialog</h2>
        <h3>Basic Dialog</h3>
        <button @click="showBasicDialog">Show Dialog</button>
        <basic-dialog v-ref:basic-dialog>
            <h4>Title</h4>
            <p>Hello. This is an information message.</p>
            <p>You can click outside or in the button to close it.</p>
            <footer>
                <button @click="onBasicDialogButtonClick">Some Button</button>
            </footer>
        </basic-dialog>
        <h3>Alert Dialog</h3>
        <button @click="showAlertDialog">Show AlertDialog</button>
        <alert-dialog v-ref:alert-dialog
                      ok="Got it"
                      @ok="onAlertDialogOk">
            <p>AlertDialog only have one button.</p>
        </alert-dialog>
        <h3>Confirm Dialog</h3>
        <button @click="showConfirmDialog">Show ConfirmDialog</button>
        <confirm-dialog v-ref:confirm-dialog
                        ok="Yes"
                        cancel="NOOOOO!"
                        @ok="onConfirmDialogOk"
                        @cancel="onConfirmDialogCancel">
            <p>Are you sure?</p>
        </confirm-dialog>
        <h3>Prompt Dialog</h3>
        <button @click="showPromptDialog">Show PromptDialog</button>
        <prompt-dialog v-ref:prompt-dialog
                       ok="OK"
                       cancel="Cancel"
                       placeholder="balabalabala"
                       @ok="onPromptDialogOk"
                       @cancel="onPromptDialogCancel">
            <p>Are you sure?</p>
        </prompt-dialog>

        <h2 id="editable">Editable</h2>
        <editable :text.sync="editable.text"></editable>
    </div>
</template>
<script>
//    import theme from '../theme/osx.css'

    module.exports = {
        components: {
            'treeview': require('../treeview'),
            'file-treeview': require('../file-treeview'),
            'editable': require('../editable'),
            'basic-dialog': require('../basic-dialog'),
            'alert-dialog': require('../alert-dialog'),
            'confirm-dialog': require('../confirm-dialog'),
            'prompt-dialog': require('../prompt-dialog')
        },
        methods: {
            /**
             * <basic-treeview>
             */
            onTreeviewItemClick: function (e) {
                console.log('treeview event: item-click', e);
            },
            onTreeviewItemToggle: function (e) {
                console.log('treeview event: item-toggle', e);
            },
            onTreeviewItemExpand: function (e) {
                console.log('treeview event: item-expand', e);
            },
            onTreeviewItemCollapse: function (e) {
                console.log('treeview event: item-collapse', e);
            },
            collapseAll: function () {
                this.$refs.basicTreeview.collapseAll();
            },
            expandAll: function () {
                this.$refs.basicTreeview.expandAll();
            },
            /**
             * <basic-dialog>
             */
            showBasicDialog: function () {
                this.$refs.basicDialog.show();
            },
            hideBasicDialog: function () {
                this.$refs.basicDialog.hide();
            },
            onBasicDialogButtonClick: function () {
                console.log('basic-dialog: Some Button click');
                this.$refs.basicDialog.hide();
            },
            /**
             * <alert-dialog>
             */
            showAlertDialog: function () {
                this.$refs.alertDialog
                        .show()
                        .then(function () {
                            console.log('alert-dialog ok callback');
                        });
            },
            onAlertDialogOk: function () {
                console.log('alert-dialog event: ok');
            },
            /**
             * <confirm-dialog>
             */
            showConfirmDialog: function () {
                this.$refs.confirmDialog
                        .show()
                        .then(function () {
                            console.log('confirm-dialog ok callback');
                        }, function () {
                            console.log('confirm-dialog cancel callback');
                        });
            },
            onConfirmDialogOk: function () {
                console.log('confirm-dialog event: ok');
            },
            onConfirmDialogCancel: function () {
                console.log('confirm-dialog event: cancel');
            },
            /**
             * <prompt-dialog>
             */
            showPromptDialog: function () {
                this.$refs.promptDialog
                        .show()
                        .then(function (inputText) {
                            console.log('prompt-dialog ok callback. text:', inputText);
                        }, function () {
                            console.log('prompt-dialog cancel callback');
                        });
            },
            onPromptDialogOk: function (e) {
                console.log('prompt-dialog event: ok', e);
            },
            onPromptDialogCancel: function () {
                console.log('prompt-dialog event: cancel');
            }
        },
        data: function () {
            return {
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
                },
                files: {
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
                                    }, {
                                        name: 'deep 3'
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
                },
                accordion: {
                    children: [
                        {name: 'accordion item 1', expanded: false},
                        {name: 'accordion item 2', expanded: false},
                        {name: 'accordion item 3', expanded: false}
                    ]
                },
                editable: {
                    text: 'Double click here to edit'
                }
            };
        }
    };
</script>
