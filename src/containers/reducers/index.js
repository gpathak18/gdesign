import { ADD_ROW, ADD_COLUMN } from "../actions";
import _ from "lodash";
const initialState = {
  name: "Untitled",
  seq: 0,
  header: {
    type: "header",
    text: "Drop an item.",
    child: []
  },
  body: {
    type: "row",
    text: "",
    style: {
      height: "60%"
    },
    child: []
  },
  footer: {
    type: "row",
    text: "",
    style: {
      height: "20%"
    },
    child: []
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
      let selNode = {
        selectedNode: action.payload
      };
      return Object.assign({}, state, selNode);
    case "ADD_ITEM":
      let sequence = state.seq + 1;

      let row = {};

      row[sequence] = action.payload.item;

      let child = [...state.header.child, sequence];

      let obj = {
        ...state,
        header: Object.assign({}, state.header, {
          type: "header",
          text: "",
          child: child
        }),
        ...row,
        seq: sequence
      };

      console.log("state after", obj);

      return obj;
    case "SET_TITLE":
      let name = action.payload.name
      return Object.assign({}, state, name);
    default:
      return state;
  }
}

export default reducer;
