import React, { Component } from "react";
import TextEditor from "./TextEditor";
import store from "./store";
import { setNodeText, setSelectedNode } from "./actions";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import ItemTypes from "./ItemTypes";
import { getEmptyImage } from "react-dnd-html5-backend";

class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      style: { padding: "12px 15px", border: "1px solid transparent" }
    }; 
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }
  }

  showEditor = () => {
    this.setState({ isEdit: true });
    this.editor();
  };

  handleMouseEnter = event => {
    // store.dispatch(setSelectedNode({ selectedNode: event.target.id }));
    let newState = {
      ...this.state,
      style: {
        padding: "12px 15px",
        border: "1px solid black"
      }
    };
    this.setState(newState);
  };

  handleMouseLeave = event => {
    let newState = {
      ...this.state,
      style: {
        padding: "12px 15px",
        border: "1px solid transparent"
      }
    };
    this.setState(newState);
    // store.dispatch(setSelectedNode({ selectedNode: event.target.id }));
  };

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(
      setSelectedNode({ selectedNode: parseInt(event.currentTarget.id) })
    );
  };

  editorCallback = text => {
    let isedit = false;
    this.setState({ isEdit: isedit });
    store.dispatch(setNodeText({ id: this.props.id, text: text }));
    this.editor();
  };

  editor() {
    if (this.state.isEdit) {
      return (
        <TextEditor
          onChange={this.handleChange}
          value={this.props.state[this.props.id].text}
          editorOnBlur={this.editorCallback}
          defaultText={this.props.state[this.props.id].text}
        />
      );
    } else {
      return (
        <div
          id={this.props.id}
          onClick={this.handleClick}
          style = {{ padding: "12px 15px"}}
          dangerouslySetInnerHTML={{
            __html: this.props.state[this.props.id].text
          }}
        />
      );
    }
  }

  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const cursor = "move";

    let element = (
      <div style={{ cursor, opacity }} style={this.props.state[this.props.id].style} onDoubleClick={this.showEditor}>
        {this.editor()}
      </div>
    )

    if(this.state.isEdit) {
      return element;
    } else {
      return this.props.connectDragSource(connectDropTarget(element))
    }

  }
}

const itemSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.id,
      node: props.node,
      parent: props.parent
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.parent !== item.parent) {
      item.target = dropResult.parent;
      props.removeCard(item);
    }
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceItemId = monitor.getItem().parent;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.parent === sourceItemId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

export default flow(
  DropTarget([ItemTypes.Text, ItemTypes.Image], itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(props => props.type, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
)(TextItem);
