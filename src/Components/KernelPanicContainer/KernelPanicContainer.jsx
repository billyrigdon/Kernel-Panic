import React, { Component, Fragment } from 'react';
import KernelPanic from '../../KernelPanic';
import TestScreen from '../BattleScreen/TestScreen';

class KernelPanicContainer extends Component {	
	constructor(props) {
		super(props);
	}

	state = {
		sanity: 100,
		testOpen: false
	}

	componentDidMount() {
		this.game = new KernelPanic(this);
	}

	render() {
		return (
			<Fragment>
				{this.state.testOpen && <TestScreen />}
				<p>{this.state.sanity}</p>
				<div id="gameContainer"></div>
			</Fragment>
		)
	}
}

export default KernelPanicContainer;