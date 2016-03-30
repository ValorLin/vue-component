import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

// Make vue aware of vuex
Vue.use(Vuex);

// We create an object to hold the initial state when
// the app starts up

var i = 0;
var generateId = () => `id_${i++}`;

const state = {
    tree: {
        id: generateId(),
        name: 'root',
        children: [{
            id: generateId(),
            name: 'parent 1',
            expanded: true,
            children: [{
                id: generateId(),
                name: 'child a',
                children: [
                    {
                        id: generateId(),
                        name: 'deep 1'
                    },
                    {
                        id: generateId(),
                        name: 'deep 2'
                    }
                ]
            }, {
                id: generateId(),
                name: 'child b',
                expanded: true,
                children: [
                    {
                        id: generateId(),
                        name: 'deep 3'
                    },
                    {
                        id: generateId(),
                        name: 'deep 4'
                    }
                ]
            }]
        }, {
            id: generateId(),
            name: 'parent 2',
            children: [
                {
                    id: generateId(),
                    name: 'child c'
                },
                {
                    id: generateId(),
                    name: 'child d'
                }
            ]
        }, {
            id: generateId(),
            name: 'parent 3',
            children: [
                {
                    id: generateId(),
                    name: 'child e'
                },
                {
                    id: generateId(),
                    name: 'child f'
                }
            ]
        }, {
            id: generateId(),
            name: 'parent 4',
            children: [
                {
                    id: generateId(),
                    name: 'child g'
                },
                {
                    id: generateId(),
                    name: 'child h'
                }
            ]
        }]
    },
    files: {
        children: [
            {
                id: generateId(),
                name: 'parent 1',
                children: [
                    {
                        id: generateId(),
                        name: 'child a',
                        children: [{
                            id: generateId(),
                            name: 'deep 1'
                        }, {
                            id: generateId(),
                            name: 'deep 2'
                        }, {
                            id: generateId(),
                            name: 'deep 3'
                        }]
                    },
                    {
                        id: generateId(),
                        name: 'child b'
                    }
                ]
            },
            {
                id: generateId(),
                name: 'parent 2',
                children: [
                    {
                        id: generateId(),
                        name: 'child c'
                    },
                    {
                        id: generateId(),
                        name: 'child d'
                    }
                ]
            },
            {
                id: generateId(),
                name: 'parent 3',
                children: [
                    {
                        id: generateId(),
                        name: 'child e'
                    },
                    {
                        id: generateId(),
                        name: 'child f'
                    }
                ]
            },
            {
                id: generateId(),
                name: 'parent 4'
            }
        ]
    },
    editable: {
        id: generateId(),
        text: 'Double click here to edit'
    },
    accordion: {
        id: generateId(),
        children: [
            {
                id: generateId(),
                name: 'accordion item 1',
                expanded: false
            },
            {
                id: generateId(),
                name: 'accordion item 2',
                expanded: false
            },
            {
                id: generateId(),
                name: 'accordion item 3',
                expanded: false
            }
        ]
    }
};

var treeHelper = {
    find: function (tree, fn) {
        var result;
        if (fn(tree)) return tree;
        if(!tree.children) return null;
        for (var child of tree.children) {
            result = this.find(child, fn);
            if (result) return result;
        }
    },
    findById: function (tree, id) {
        return this.find(tree, child => child.id === id);
    }
};

// Create an object storing various mutations. We will write the mutation
const mutations = {
    [types.MODIFY_EDITABLE]: (state, text) => {
        state.editable.text = text;
    },
    [types.EXPAND_TREE_ITEM]: (state, id) => {
        treeHelper.findById(state.tree, id).expanded = true;
    },
    [types.COLLAPSE_TREE_ITEM]: (state, id) => {
        treeHelper.findById(state.tree, id).expanded = false;
    },
    [types.EXPAND_FILE_ITEM]: (state, id) => {
        treeHelper.findById(state.files, id).expanded = true;
    },
    [types.COLLAPSE_FILE_ITEM]: (state, id) => {
        treeHelper.findById(state.files, id).expanded = false;
    }
};


// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
    state,
    mutations,
    strict: true
});
