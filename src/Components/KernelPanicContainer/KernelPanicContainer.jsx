import React, { Component, Fragment } from 'react';
import KernelPanic from '../../KernelPanic';

class KernelPanicContainer extends Component {	
	constructor(props) {
		super(props);
	}

	state = {
		sanity: 100
	}

	componentDidMount() {
		this.game = new KernelPanic(this);
	}

	render() {
		return (
			<Fragment>
				<p>{this.state.sanity}</p>
				<div id="gameContainer"></div>
			</Fragment>
		)
	}
}

export default KernelPanicContainer;