import React, { Component } from "react";
import ItemTypes from "../containers/ItemTypes";
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import DraggableText from "../containers/DraggableItem";
import Column from "./Column";
import store from "../containers/store";
import { setSelectedNode } from "../containers/actions";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const boxTarget = {
  drop(props, monitor, component) {
    if (!component) {
      return;
    }
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let left = Math.round(item.left + delta.x);
    let top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 10,
      top: 10,
      width: 200,
      height: 200,
      row: {
        background: "#" + Math.floor(Math.random() * 1000),
        height: "50%",
        width: "100%",
      }
    };
    this.handleRow = this.handleRow.bind(this);
  }

  handleRow(e) {
    store.dispatch(setSelectedNode(e.target.id));
    this.setState({
      row: {
        background: "#" + Math.floor(Math.random() * 1000),
        height: "50%",
        width: "100%",
        border: '2px dotted grey'
      }
    })
  }

  moveBox(id, left, top) {
    console.log(left, top);
    this.setState({
      left: left,
      top: top
    });
  }

  callMe(node) {
    if (node) {
      return this.checkChildNode(node);
    } else {
      console.log('default row');
      return;
    }
  }

  checkChildNode(node) {
    console.log(this.props);
    return node.child.map(node => {
      return this.renderChilds(this.props.state[node], node);
    });
  }

  renderChilds(node, key) {
    if (node && node.type === "row") {
      return <Row key={key} id={key} node={node} state={this.props.state} />;
    } else if (node && node.type === "column") {
      return <Column key={key} id={key} node={node} state={this.props.state} />;
    } else {
      console.log('inside else row')
      return;
    }
  }

  render() {
    const {row} = this.state;
    return (
          // <table style={row} id={this.props.id} onClick={this.handleRow}>
          //   <tbody>
          //     <tr id={this.props.id} onClick={this.handleRow}>

          //     {this.callMe(this.props.node)}
          //       {/* <td style={style.color}  onFocus={ this.onFocus } onBlur={ this.onBlur } >
          //     <DraggableText left={left} top={top} />
          //   </td> */}
          //     </tr>
          //  </tbody>
          // </table>

                <Grid style={row} item id={this.props.id} onClick={this.handleRow}>
                      {this.callMe(this.props.node)}
                </Grid>
     );
  }
}

export default Row;
