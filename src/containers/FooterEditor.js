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
  

class FooterEditor extends React.Component {

    render() {
		
		const style = {
				padding: '1rem',
                borderRadius: '2px',
                marginTop: '2px'
		}

		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver
		
		let backgroundColor = ''
		let border = '1px dashed gray'
		let boxShadow = ''

		
		if (isActive) {
			backgroundColor = 'whitesmoke';
			border = '1px solid gray'
    		boxShadow =  '0 0 3px blue'
		} else if (canDrop) {
            backgroundColor = '#3f51b596'
            border = '1px solid gray'
		}


		return (
			
			connectDropTarget &&
			connectDropTarget(
				<div style={{...style, backgroundColor, boxShadow, border}}>
					{isActive ? 'Add item to Footer' : 'Edit Footer'}
				</div>
			)
		)
	}
}
    
export default  DropTarget(ItemTypes.Text, boxTarget, collect)(FooterEditor);