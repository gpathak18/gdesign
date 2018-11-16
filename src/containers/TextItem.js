import React, { Component } from "react";
import TextEditor from "./TextEditor";
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import ItemTypes from "./ItemTypes";
import { getEmptyImage } from "react-dnd-html5-backend";


class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Double click to edit",
      isEdit: false,
      style: { padding: "12px 15px", border: "1px solid transparent" }
    }; // You can also pass a Quill Delta here
    // this.showEditor = this.showEditor.bind(this);
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
    let isedit = true;
    this.setState({ text: this.state.text, isEdit: isedit });
    this.editor();
    console.log(isedit);
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
    console.log(text);
    let isedit = false;
    this.setState({ text: text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  };

  editor() {
    if (this.state.isEdit) {
      return (
        <TextEditor
          onChange={this.handleChange}
          value={this.state.text}
          editorOnBlur={this.editorCallback}
          defaultText={this.state.text}
        />
      );
    } else {
      return (
        <div
          id={this.props.id}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          style={this.props.state[this.props.id].style}
          dangerouslySetInnerHTML={{ __html: this.state.text }}
        />
      );
    }
  }

  render() {
    const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const cursor = 'move'
    
    return  connectDragSource(connectDropTarget(
      // style={{ padding: "1rem" }}
      <div style={{ cursor, opacity }} onDoubleClick={this.showEditor}>
        {this.editor()}
      </div>
    ));
  }
}

const cardSource = {

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
    console.log('dropped',item,dropResult)
		if ( dropResult && dropResult.parent !== item.parent ) {
			props.removeCard(item.index);
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().parent;	

    // console.log('hovering item',dragIndex,hoverIndex,sourceListId,props)

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

    // Time to actually perform the action
    console.log('hovering item',dragIndex,hoverIndex,sourceListId,props)

		if ( props.parent === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}		
	}
};

export default flow(
	DropTarget([ItemTypes.Text, ItemTypes.Image], cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource((props) => props.type, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}))
)(TextItem);

