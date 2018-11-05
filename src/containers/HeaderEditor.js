import * as React from 'react'
import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import TextEditor from './TextEditor'

const boxTarget = {
	drop(props, monitor) {
		return {name: 'dango'}
	}
}

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

	isActive = false;
	draggingItem = ''
	items = []

	returnDroppedItem(draggingItem) {

		switch (draggingItem) {
			case ItemTypes.Text:
				this.items.push(<TextEditor key={Math.floor(Math.random() * 1000)}></TextEditor>)
				break
			case ItemTypes.Image:
				this.items.push(<TextEditor key={Math.floor(Math.random() * 1000)}></TextEditor>)
				break
			default:
				this.items = this.items
		}
		
	}

	check(didDrop,draggingItem) {
		if(didDrop) {
			return this.returnDroppedItem(draggingItem)
		} else {
			return this.items
		}

	}

    render() {
		
		const style = {
				padding: '1rem',
				borderRadius: '2px',
				overflow: 'auto' 
		}

		const { canDrop, isOver, didDrop, connectDropTarget, draggingItem } = this.props

		this.draggingItem = draggingItem;

		this.isActive = canDrop && isOver;

		let backgroundColor = ''
		let border = '1px dashed gray'
		let boxShadow = ''

		
		if (this.isActive) {
			backgroundColor = 'whitesmoke';
			border = '1px solid gray'
    		boxShadow =  '0 0 3px blue'
		} else if (canDrop) {
            backgroundColor = '#3f51b596'
            border = '1px solid gray'
		}

		//this.isActive ? 'Add item to Header' : 'Edit Header'

		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={{...style, backgroundColor, boxShadow, border}} >
					{this.check(didDrop, draggingItem)}
				</div>
			)
		)
	}
}

export default  DropTarget([ItemTypes.Text,ItemTypes.Image], boxTarget, collect)(HeaderEditor);