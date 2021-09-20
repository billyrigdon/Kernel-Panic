import React, { Component, Fragment } from 'react';
import KernelPanic from '../../KernelPanic';
import BattleScreen from '../BattleScreen/BattleScreen';
import './KernelPanic.css'

class KernelPanicContainer extends Component {	
	state = {
		// Player stats
		sanity: 100,
		typingSpeed: 5,
		brainPower: 5,
		moves: [{
			name: "Hello World",
			damage: 1,
			heal: 0,
			type: "whiteHat"
		}],
		items: [{
			name: "Risperidone",
			sanity: 50,
			typingSpeed: 0,
			brainPower: 0
		}],
		
		//Enemy Stats
		enemySanity: 20,
		enemySpeed: 3,
		enemyPower: 3,
		enemyType: "bug",

		//Opens battle screen if true
		battleOpen: true,
	}

	componentDidMount() {
		//Checks localstorage for moves and sets state accordingly
		//If there's no localstorage set, it uses the default moves and sets localstorage 
		if (localStorage.getItem("moves")) {
			this.setState({
				moves: JSON.parse(localStorage.getItem("moves"))
			})
		} else if (!localStorage.getItem("moves")) {
			localStorage.setItem("moves", JSON.stringify(this.state.moves));
		}

		//Same thing as above, but with items
		if (localStorage.getItem("items")) {
			this.setState({
				items: JSON.parse(localStorage.getItem("items"))
			})
		} else if (!localStorage.getItem("items")) {
			localStorage.setItem("items", JSON.stringify(this.state.items));
		}

		//Creates Game
		this.game = new KernelPanic(this);
	}

	render() {
		return (
			<Fragment>
				{this.state.battleOpen && <BattleScreen {...this.state} />}
				<div id="gameContainer"></div>
			</Fragment>
		)
	}
}

export default KernelPanicContainer;