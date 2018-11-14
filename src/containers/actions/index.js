
export const addRow = row => ({ type: "ADD_ROW", payload: row });
export const addColumn = col => ({ type: "ADD_COLUMN", payload: col });
export const setSelectedNode = node => ({ type: "SELECTED_NODE", payload: node });
export const setDroppedItem = node => ({ type: "ADD_ITEM", payload: node });
export const setTitle = node => ({ type: "SET_TITLE", payload: node });
export const setBgColor = node => ({ type: "SET_BG_COLOR", payload: node });
export const setStyle = node => ({ type: "SET_STYLE", payload: node });
export const removeItem = node => ({ type: "REMOVE_ITEM", payload: node });