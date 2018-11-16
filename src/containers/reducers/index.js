import { ADD_ROW, ADD_COLUMN } from "../actions";
import _ from "lodash";
const initialState = {
  name: "Untitled Template",
  seq: 0,
  selectedNode: "root",
  root: {
    style: {
      width: "100%",
      height: "100%",
      background: "none"
    }
  },
  header: {
    type: "header",
    text: "Drop an item to begin.",
    child: [],
    style: {
      borderRadius: "2px",
      overflow: "auto",
      minHeight: "45px",
      border: "1px dashed gray"
    }
  },
  body: {
    type: "body",
    text: "Drop an item to begin.",
    child: [],
    style: {
      borderRadius: "2px",
      overflow: "auto",
      minHeight: "45px",
      border: "1px dashed gray"
    }
  },
  footer: {
    type: "footer",
    text: "Drop an item to begin.",
    child: [],
    style: {
      borderRadius: "2px",
      overflow: "auto",
      minHeight: "45px",
      border: "1px dashed gray"
    }
  }
};

function reducer(state = initialState, action) {
  let sequence = {};
  let row = {};
  let obj = {};

  switch (action.type) {
    case "ADD_ROW":
      let rowstoadd = [];
      if (state.selectedNode && state.selectedNode.length > 0) {
        sequence = {
          seq: state.seq + 2
        };

        row[sequence.seq] = {
          type: "row",
          child: []
        };

        row[sequence.seq - 1] = {
          type: "row",
          child: []
        };
        rowstoadd[0] = sequence.seq - 1;
        rowstoadd[1] = sequence.seq;

        state.selectedNode = {};
      } else {
        sequence = {
          seq: state.seq + 1
        };
        row[sequence.seq] = {
          type: "row",
          child: []
        };
        rowstoadd[0] = sequence.seq;
      }

      if (_.isEmpty(action.payload)) {
        action.payload = "root";
      }

      obj = Object.assign(
        {},
        state,
        state[action.payload].child.push(...rowstoadd),
        row,
        sequence
      );

      return obj;
    case "ADD_COLUMN":
      let colstoadd = [];
      if (state.selectedNode && state.selectedNode.length > 0) {
        sequence = {
          seq: state.seq + 2
        };

        row[sequence.seq] = {
          type: "column",
          child: []
        };

        row[sequence.seq - 1] = {
          type: "column",
          child: []
        };

        colstoadd[0] = sequence.seq - 1;
        colstoadd[1] = sequence.seq;

        state.selectedNode = {};
      } else {
        sequence = {
          seq: state.seq + 1
        };
        row[sequence.seq] = {
          type: "row",
          child: []
        };
        colstoadd[0] = sequence.seq;
      }

      if (_.isEmpty(action.payload)) {
        action.payload = "root";
      }

      obj = Object.assign(
        {},
        state,
        state[action.payload].child.push(...colstoadd),
        row,
        sequence
      );

      return obj;

    case "SELECTED_NODE":
      let currentSelectedNode = state.selectedNode;
      let newState = Object.assign({}, state, action.payload);

      if (
        newState[action.payload.selectedNode] &&
        action.payload.selectedNode !== "root"
      ) {
        newState[action.payload.selectedNode].style = {
          ...newState[action.payload.selectedNode].style,
          border: "2px solid gray"
        };
      }

      if (
        currentSelectedNode !== "root" &&
        currentSelectedNode !== action.payload.selectedNode &&
        newState[currentSelectedNode]
      ) {
        newState[currentSelectedNode].style = {
          ...newState[currentSelectedNode].style,
          border: "1px dashed gray"
        };
      }

      console.log("selected node-", action.payload.selectedNode, newState);

      return newState;
    case "SET_BG_COLOR":
      let node = state.selectedNode;
      let nState = Object.assign({}, state);
      console.log("bg color node-", action.payload.selectedNode);

      if (!_.isEmpty(nState[node])) {
        nState[node].style = {
          ...nState[node].style,
          background: action.payload.bgColor
        };
      }

      return nState;
    case "ADD_ITEM":
      let sequence = {
        seq: state.seq + 1
      };

      let row = {};

      row[sequence.seq] = action.payload.item;

      let child = [...state[action.payload.parent].child, sequence.seq];

      let nodeChild = {};

      nodeChild[action.payload.parent] = Object.assign(
        {},
        state[action.payload.parent],
        {
          type: action.payload.parent,
          text: "",
          child: child
        }
      );

      let obj = Object.assign({}, state, nodeChild, row, sequence);

      console.log("state after", obj);

      return obj;
    case "SET_STYLE":
      let styleNode = state.selectedNode;
      let styleState = Object.assign({}, state);

      if (!_.isEmpty(styleState[styleNode])) {
        styleState[styleNode].style = {
          ...styleState[styleNode].style,
          ...action.payload
        };
      }

      console.log("style", styleState);
      return styleState;
    case "SET_TITLE":
      let name = action.payload.name;
      return Object.assign({}, state, name);
    case "MOVE_ITEM":
      let itemRmvState = Object.assign({}, state);
      let index = action.payload.index;
      let pChilds = itemRmvState[action.payload.parent].child;
      pChilds.splice(index, 1);
      let tChild = itemRmvState[action.payload.target].child;
      tChild.push(action.payload.id);
      return itemRmvState;
    case "REMOVE_ITEM":
      let itemMvState = Object.assign({}, state);
      let rmChilds = itemMvState[action.payload.parent].child;
      rmChilds.splice(action.payload.index, 1);
      delete itemRmvState[action.payload.id];
      return itemMvState;
    case "SORT_ITEM":
      let itemSortState = Object.assign({}, state);
      let hoverIndex = action.payload.hoverIndex;
      let dragIndex = action.payload.dragIndex;
      let pChildArray = itemSortState[action.payload.parent].child;
      [pChildArray[dragIndex], pChildArray[hoverIndex]] = [
        pChildArray[hoverIndex],
        pChildArray[dragIndex]
      ];
      return itemSortState;
    case "SET_NODE_TEXT":
      let nodeState = Object.assign({}, state);
      let textNode = nodeState[action.payload.id];
      textNode.text = action.payload.text;
      return nodeState;
    default:
      return state;
  }
}

export default reducer;
