
export const addRow = row => ({ type: "ADD_ROW", payload: row });
export const addColumn = col => ({ type: "ADD_COLUMN", payload: col });
export const setSelectedNode = node => ({ type: "SELECTED_NODE", payload: node });
export const setDroppedItem = node => ({ type: "ADD_ITEM", payload: node });
