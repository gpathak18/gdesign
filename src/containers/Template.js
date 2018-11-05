import React, { Component } from "react";
import Text from "./Text";
import ItemTypes from "./itemTypes";
import {
	DropTarget,
	ConnectDropTarget,
	DropTargetMonitor,
	DropTargetConnector,
} from 'react-dnd'
import DraggableText from "./DraggableItem";

const styles = {
	width: 300,
	height: 300,
	border: '1px solid black',
	// position: 'relative',
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const boxTarget = {
  drop(
		props,
		monitor,
		component
	) {
		if (!component) {
			return
		}
		const delta = monitor.getDifferenceFromInitialOffset() 
		const item = monitor.getItem()

		let left = Math.round(item.left + delta.x)
		let top = Math.round(item.top + delta.y)

		component.moveBox(item.id, left, top)
	},
};

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 10,
      top: 10,
      width: 200,
      height: 200
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  moveBox(id, left, top) {
    console.log(left, top);
    this.setState({
      left: left,
      top: top
    });
  }

  render() {
    const { left, top, width, height } = this.state;
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={styles}>
        <DraggableText left={left} top={top} />
      </div>
    );
  }
}
export default  DropTarget(ItemTypes.NOTE, boxTarget, collect)(Template);

// export default  (DragDropContext(HTML5Backend),DropTarget(ItemTypes.NOTE, boxTarget, collect)) (Template);
