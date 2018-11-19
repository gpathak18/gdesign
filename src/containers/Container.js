import * as React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";
import store from "./store";
import { moveItem, sortItem, setSelectedNode } from "./actions";
import TextItem from "./TextItem";
import ImageItem from "./ImageItem";
import ImageGroupItem from "./ImageGroupItem"
const itemTarget = {
  hover(props, monitor, component) {},

  drop(props, monitor, component) {
    return { parent: props.id };
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

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  removeCard(item) {
    store.dispatch(moveItem(item));
  }

  moveCard(dragIndex, hoverIndex) {
    let item = {
      dragIndex,
      hoverIndex,
      parent: this.props.id
    };

    store.dispatch(sortItem(item));
  }

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(setSelectedNode({ selectedNode: event.currentTarget.id }));
  };

  renderTree(root) {
    return root.child.map((node, i) => {
      let item = "";
      switch (this.props.state[node].type) {
        case ItemTypes.Text:
          item = (
            <TextItem
              key={node}
              id={node}
              index={i}
              parent={root.type}
              node={this.props.state[node]}
              state={this.props.state}
              moveCard={this.moveCard.bind(this)}
              removeCard={this.removeCard.bind(this)}
              type="Text"
            />
          );
          break;
        case ItemTypes.Image:
          item = (
            <ImageItem
              key={node}
              id={node}
              index={i}
              parent={root.type}
              node={this.props.state[node]}
              state={this.props.state}
              moveCard={this.moveCard.bind(this)}
              removeCard={this.removeCard.bind(this)}
              type="Image"
            />
          );
          break;
        case ItemTypes.ImageGroup:
          item = (
            <ImageGroupItem
              key={node}
              id={node}
              index={i}
              parent={root.type}
              node={this.props.state[node]}
              state={this.props.state}
              moveCard={this.moveCard.bind(this)}
              removeCard={this.removeCard.bind(this)}
              type="ImageGroup"
            />
          );
          break;
        default:
          this.items = this.items;
      }
      return item;
    });
  }

  render() {
    const { canDrop, isOver, connectDropTarget, draggingItem, id } = this.props;

    this.draggingItem = draggingItem;

    this.isActive = canDrop && isOver;

    let backgroundColor = this.props.state[id].style.background;
    let border = this.props.state[id].style.border;
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
          id={id}
          style={{
            ...this.props.state[id].style,
            backgroundColor,
            boxShadow,
            border
          }}
          onClick={this.handleClick}
          onMouseOver={this.onHoverUpdate}
        >
          {this.renderTree(this.props.state[id])}
        </div>
      )
    );
  }
}

export default DropTarget(
  [ItemTypes.Text, ItemTypes.Image, ItemTypes.ImageGroup],
  itemTarget,
  collect
)(Container);
