import React, { Component } from "react";
import AppMenuBar from "./AppMenuBar";
import Editor from "./Editor";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addRow, addColumn, setSelectedNode } from "./actions";
import store from "./store";
class AppAction extends Component {

  rowCallback = () => {
    store.dispatch(addRow(this.props.state.selectedNode));
  };

  columnCallback = () => {
    store.dispatch(addColumn(this.props.state.selectedNode))
  };

  render() {
    console.log('header', this.props.state)

    return (
      <React.Fragment>
        {/* <AppMenuBar
          addRowToEditor={this.rowCallback}
          addColumnToEditor={this.columnCallback}
        /> */}
        <Editor state={this.props.state}/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ADD_ROW: ADD_ROW}, dispatch);
// }

export default connect(mapStateToProps)(AppAction);
