import * as React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget
} from "react-dnd";
import ItemTypes from "./ItemTypes";
import {editor,toolMap} from './ToolMap'
import Row from './Row'
import store from './store'
import {setDroppedItem} from './actions'
import TextItem from './TextItem'

const boxTarget = {
  drop(props, monitor) {

    switch (monitor.getItemType()) {
      case ItemTypes.Text:
        let textItem = {
          parent: 'header',
          item: {
            type: 'text',
            text: '',
            child: []
          }
        }
        store.dispatch(setDroppedItem(textItem));
        break
      case ItemTypes.Image:
        this.items.push(
          <div key={Math.floor(Math.random() * 1000)}>Double click to edit</div>
        );
        break;
      default:
        this.items = this.items;
    }

    return { name: "dango" };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    didDrop: monitor.didDrop(),
    draggingItem: monitor.getItemType()
  };
}

class HeaderEditor extends React.Component {
  constructor(props) {
    super(props);
  
  }

  renderTree(root) {

    return root.child.map(node => {
      return (
        <TextItem key={node} id={node} node={this.props.state[node]} state={this.props.state}></TextItem>
      );
    });

  }

  render() {

    const style = {
      padding: "1rem",
      borderRadius: "2px",
      overflow: "auto"
    };

    const {
      canDrop,
      isOver,
      connectDropTarget,
      draggingItem
    } = this.props;

    this.draggingItem = draggingItem;

    this.isActive = canDrop && isOver;

    let backgroundColor = "";
    let border = "1px dashed gray";
    let boxShadow = "";

    if (this.isActive) {
      backgroundColor = "whitesmoke";
      border = "1px solid gray";
      boxShadow = "0 0 3px blue";
    } else if (canDrop) {
      backgroundColor = "#3f51b596";
      border = "1px solid gray";
    }

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ ...style, backgroundColor, boxShadow, border }}>
          {this.renderTree(this.props.state.header)}
        </div>
      )
    );
  }
}

export default DropTarget(
  [ItemTypes.Text, ItemTypes.Image],
  boxTarget,
  collect
)(HeaderEditor);
