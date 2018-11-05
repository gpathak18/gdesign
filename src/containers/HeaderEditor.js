import * as React from 'react'
import {
	DropTarget,
	DropTargetConnector,
	DropTargetMonitor,
	ConnectDropTarget,
} from 'react-dnd'
import ItemTypes from './ItemTypes'

const boxTarget = {
	drop() {
		return { name: 'Dustbin' }
	},
}

function collect(connect, monitor) {
    return {
			connectDropTarget: connect.dropTarget(),
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
    };
  }
  

class HeaderEditor extends React.Component {

    render() {
			const style = {
				// marginRight: '1.5rem',
				// marginBottom: '1.5rem',
				color: 'white',
				padding: '1rem',
				textAlign: 'center',
				fontSize: '1rem',
				lineHeight: 'normal',
				float: 'left',
			}
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver
		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'yellow'
		}


		return (
			
			connectDropTarget &&
			connectDropTarget(
				<div style={{ backgroundColor, widht: '100%', height:'100%'}}>
					{isActive ? 'Release to drop' : 'Drag a box here'}
				</div>,
			)
		)
	}
}

export default  DropTarget(ItemTypes.BOX, boxTarget, collect)(HeaderEditor);