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

      nodeChild[action.payload.parent] = Object.assign({}, state.header, {
        type: "header",
        text: "",
        child: child
      });

      let obj = Object.assign({}, state, nodeChild, row, sequence);

      console.log("state after", obj);

      return obj;
    case "SET_TITLE":
      let name = action.payload.name;
      return Object.assign({}, state, name);
    default:
      return state;
  }
}

export default reducer;
