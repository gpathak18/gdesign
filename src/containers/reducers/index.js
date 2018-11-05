import { ADD_ROW, ADD_COLUMN } from "../actions";
import _ from "lodash";
const initialState = {
  seq: 0,
  selectedNode: "root",
  root: {
    type: "row",
    child: []
  },
  header: {
    type: "row",
    style: {
      height: "20%",
    },
    child: []
  },
  body: {
    type: "row",
    style: {
      height: "60%",
      background: 'grey'
    },
    child: []
  },
  footer: {
    type: "row",
    style: {
      height: "20%",
      background: 'pink'
    },
    child: []
  },
  1: {
    type: "row",
    style: {
      height: "20%",
      background: 'grey'
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
    case "ADJUST_ROW":
     state.header = {
        type: "row",
        style: {
           border: '2px dotted black',
           height: '20%'
        },
        child: []
      }
      let obj = Object.assign({}, state);
      console.log(obj)
      return obj;
    default:
      return state;
  }
}

export default reducer;
