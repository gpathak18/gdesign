import * as React from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget
} from "react-dnd";
import ItemTypes from "./ItemTypes";
import { editor, toolMap } from "./ToolMap";
import Row from "./Row";
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";
import TextItem from "./TextItem";
import ImageItem from "./ImageItem";
import div from "./div.css";
import update from 'immutability-helper';

const itemTarget = {

  hover(props, monitor, component) {
  },

  drop(props, monitor) {
    console.log('drop action',props,monitor)
    switch (monitor.getItemType()) {
      case ItemTypes.Text:
        let textItem = {
          parent: props.id,
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
          parent: props.id,
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

  pushCard(card) {
    this.setState(
      update(this.state, {
        cards: {
          $push: [card]
        }
      })
    );
  }

  removeCard(index) {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  moveCard(dragIndex, hoverIndex) {
    console.log('props',this.props,dragIndex,hoverIndex)
    const { child } = this.props.state[this.props.id];
    const dragChild = child[dragIndex];

    // let temp = child[hoverIndex];
    // child[hoverIndex] = child[dragIndex];
    // child[dragIndex] = temp;

    // console.log('childs', child)

    [child[dragIndex], child[hoverIndex]] = [child[hoverIndex], child[dragIndex]];

    console.log('childs', child)


    // this.setState(
    //   update(this.state, {
    //     cards: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    //     }
    //   })
    // );
  }

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(setSelectedNode({ selectedNode: event.currentTarget.id }));
  };

  renderTree(root) {
    return root.child.map((node, i) => {
      // console.log('node',node)
      let comp = "";
      switch (this.props.state[node].type) {
        case ItemTypes.Text:
          comp = (
            <TextItem
              key={node}
              id={node}
              index={i}
              parent={root.type}
              node={this.props.state[node]}
              state={this.props.state}
              moveCard={this.moveCard.bind(this)}
              type="Text"
            />
          );
          break;
        case ItemTypes.Image:
          comp = (
            <ImageItem
              key={node}
              id={node}
              index={i}
              parent={root.type}
              node={this.props.state[node]}
              state={this.props.state}
              type="Image"
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
  [ItemTypes.Text, ItemTypes.Image],
  itemTarget,
  collect
)(Container);