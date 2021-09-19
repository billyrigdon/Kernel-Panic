import React, { Component, Fragment } from 'react';
import KernelPanic from '../../KernelPanic';
import TestScreen from '../BattleScreen/TestScreen';
import './KernelPanic.css'

class KernelPanicContainer extends Component {	
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
				<div id="gameContainer"></div>
			</Fragment>
		)
	}
}

export default KernelPanicContainer;