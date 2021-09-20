import React, { Component, Fragment } from 'react';
import './test.css'


class BattleScreen extends Component {	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="battle-container">
				<div id="player-stats">
					<p>{ this.props.sanity }</p>
				</div>
				<div id="moves">
					<div onClick={() => {this.props.attack(this.props.moves[0])}}>{this.props.moves[0].name}</div>
				</div>
				<div id="items">
					<p>{this.props.items[0].name}</p>
					{this.props.items[0].quantity}
				</div>
				<div id="enemy">
					{this.props.enemyName}
					<br/>
					{this.props.enemySanity}

				</div>
			</div>

		)
	}
}

export default BattleScreen;