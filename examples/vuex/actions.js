import types from './mutation-types'

function makeAction(type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}

export const modifyEditable = makeAction(types.MODIFY_EDITABLE);
export const expandTreeItem = makeAction(types.EXPAND_TREE_ITEM);
export const collapseTreeItem = makeAction(types.COLLAPSE_TREE_ITEM);
export const expandFolder = makeAction(types.EXPAND_FOLDER);
export const collapseFolder = makeAction(types.COLLAPSE_FOLDER);

export default {
    modifyEditable,
    expandTreeItem,
    collapseTreeItem,
    expandFolder,
    collapseFolder
};
