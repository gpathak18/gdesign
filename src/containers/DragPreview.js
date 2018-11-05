import * as React from 'react'
import Text from './Text'

const styles = {
	display: 'inline-block',
	// transform: 'rotate(-7deg)',
	// WebkitTransform: 'rotate(-7deg)',
}

export default class DragPreview extends React.PureComponent {

    // componentDidMount() {
	// 	this.interval = setInterval(this.tick, 500)
	// }

	// componentWillUnmount() {
	// 	clearInterval(this.interval)
	// }

	render() {
		// const { left, top } = this.props
		// const { tickTock } = this.state

		return (
			<div style={styles}>
				<Text/>
			</div>
		)
	}

	tick() {
		this.setState({
			tickTock: !this.state.tickTock,
		})
	}
}