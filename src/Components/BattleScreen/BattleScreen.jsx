import React, { Component, Fragment } from 'react';
import './test.css'


class BattleScreen extends Component {	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="battle-container">
				<div id="moves">
					<p>{this.props.moves[0].name}</p>
				</div>
				<div id="items">
					<p>{this.props.items[0].name}</p>
				</div>
			</div>

		)
	}
}

export default BattleScreen;