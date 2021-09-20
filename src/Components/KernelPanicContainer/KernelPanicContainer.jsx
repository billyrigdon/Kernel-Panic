import React, { Component, Fragment } from 'react';
import KernelPanic from '../../KernelPanic';
import BattleScreen from '../BattleScreen/BattleScreen';
import './KernelPanic.css'


class KernelPanicContainer extends Component {
	constructor(props) {
		super(props);
	//Bind attack function so state can update from child component
		this.attack = this.attack.bind(this);
	}
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
			brainPower: 0,
			quantity: 5
		}],
		
		//Enemy Stats
		enemyName: "eXpl01t.exe",
		enemySanity: 20,
		enemySpeed: 3,
		enemyPower: 3,
		enemyType: "bug",

		//Opens battle screen if true
		battleOpen: true,
	}

	attack(move) {		
	//If your speed is greater than enemy, your move goes first
		if (this.state.enemySpeed < this.state.typingSpeed) {
		//Check if move does damage
			if (move.damage > 0) {
			//Check if move would kill enemy. If it does, attack goes through and battle ends
				if (this.state.enemySanity - (this.state.brainPower + move.damage) <= 0) {
					this.setState({
						enemySanity: this.state.enemySanity - (this.state.brainPower + move.damage),
						sanity: this.state.sanity + move.heal,
						battleOpen: false
					})
				} else {
					this.setState({
						enemySanity: this.state.enemySanity - (this.state.brainPower + move.damage),
						sanity: this.state.sanity + move.heal
					})
				}
			//If enemy sanity is greater than 0, player takes damage
			//If enemy sanity goes to 0 or below, the battle ends
				if (this.state.enemySanity > 0) {
					this.setState({
						sanity: this.state.sanity - this.state.enemyPower
					})
				} else if (this.state.enemySanity <= 0) {
					this.setState({
						battleOpen: false
					})
				}
		//If the move doesn't have a damage value, no damage is dealt but user still heals
			} else if (move.damage <= 0) {
				this.setState({
					sanity: this.state.sanity + move.heal
				})
				if (this.state.enemySanity > 0) {
					this.setState({
						sanity: this.state.sanity - this.state.enemyPower
					})
				} 
			}
	//If enemy speed is greater, enemy deals damage first
		} else if (this.state.enemySpeed >= this.state.typingSpeed) {
			this.setState({
				sanity: this.state.sanity - this.state.enemyPower
			})
		//If enemy damage didn't drain your sanity, your attack will succeed
			if (this.state.sanity > 0) {
				if (move.damage > 0) {
					this.setState({
						enemySanity: this.state.enemySanity - (this.state.brainPower + move.damage),
						sanity: this.state.sanity + move.heal
					})
				} else if (move.damage <= 0) {
					this.setState({
						sanity: this.state.sanity + move.heal
					})
				}

			//End battle if enemy sanity < 0
				if (this.state.enemySanity <= 0) {
					this.setState({
						battleOpen: false
					})
				}
			}
		}
		
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
				{this.state.battleOpen && <BattleScreen attack={this.attack} {...this.state} />}
				<div id="gameContainer"></div>
			</Fragment>
		)
	}
}

export default KernelPanicContainer;