import React, {
    Component
} from "react";
import ItemTypes from "./ItemTypes";
import {
    DragSource
} from "react-dnd";
import Text from './Text'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Rnd } from "react-rnd";
const itemSource = {
    beginDrag(props) {
        console.log("drag started", props);
        const {
            id,
            left,
            top
        } = props
        return {
            id,
            left,
            top
        }
    },
    endDrag(props) {
        console.log("drag ended");
    }
};

function getStyles(props) {
	const { left, top, isDragging } = props
	const transform = `translate3d(${left}px, ${top}px, 0)`

	return {
		position: 'absolute',
		transform,
        WebkitTransform: transform,
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	}
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}


class DraggableText extends Component {

    componentDidMount() {
        const {
            connectDragPreview
        } = this.props
        if (connectDragPreview) {
            connectDragPreview(getEmptyImage(), {
                  captureDraggingState: true,
            })
        }
    }

    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
				<div style={getStyles(this.props)}>
                    <Rnd disableDragging={true}> 
					<Text />
                    </Rnd>

				</div>
		)
        
    }
}

export default DragSource(ItemTypes.NOTE, itemSource, collect)(DraggableText)