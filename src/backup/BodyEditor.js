import * as React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget
} from "react-dnd";
import ItemTypes from "../containers/ItemTypes";
import { editor, toolMap } from "./ToolMap";
import Row from "./Row";
import store from "../containers/store";
import { setDroppedItem, setSelectedNode } from "../containers/actions";
import TextItem from "../containers/TextItem";
import ImageItem from "../containers/ImageItem";

const boxTarget = {
  drop(props, monitor) {
    switch (monitor.getItemType()) {
      case ItemTypes.Text:
        let textItem = {
          parent: "body",
          item: {
            type: "Text",
            text: "",
            style: { padding: "12px 15px" },
            child: []
          }
        };
        store.dispatch(setDroppedItem(textItem));
        break;
      case ItemTypes.Image:
        let imageItem = {
          parent: "body",
          item: {
            type: "Image",
            url: "",
            style: {},
            child: []
          }
        };
        store.dispatch(setDroppedItem(imageItem));
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

class BodyEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(setSelectedNode({ selectedNode: event.currentTarget.id }));
  };

  renderTree(root) {
    return root.child.map(node => {
      let comp = "";
      switch (this.props.state[node].type) {
        case ItemTypes.Text:
          comp = (
            <TextItem
              key={node}
              id={node}
              node={this.props.state[node]}
              state={this.props.state}
            />
          );
          break;
        case ItemTypes.Image:
          comp = (
            <ImageItem
              key={node}
              id={node}
              node={this.props.state[node]}
              state={this.props.state}
            />
          );
          break;
        default:
          this.items = this.items;
      }
      return comp;
    });
  }

  render() {
    const style = {
      padding: "1rem",
      borderRadius: "2px",
      overflow: "auto"
    };

    const { canDrop, isOver, connectDropTarget, draggingItem } = this.props;

    this.draggingItem = draggingItem;

    this.isActive = canDrop && isOver;

    let backgroundColor = this.props.state.body.style.background;
    let border = this.props.state.body.style.border;
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
        <div
          id="body"
          style={{
            ...this.props.state.body.style,
            backgroundColor,
            boxShadow,
            border
          }}
          onClick={this.handleClick}
          onMouseOver={this.onHoverUpdate}
        >
          {this.renderTree(this.props.state.body)}
        </div>
      )
    );
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }
}

export default DropTarget(
  [ItemTypes.Text, ItemTypes.Image],
  boxTarget,
  collect
)(BodyEditor);
