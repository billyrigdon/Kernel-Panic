import React, { Component, Fragment } from "react";
import KernelPanic from "../../KernelPanic";
import BattleScreen from "../BattleScreen/BattleScreen";
import Desktop from "../Desktop/Desktop";
import "./KernelPanic.scss";

class KernelPanicContainer extends Component {
	constructor(props) {
		super(props);
		//Bind attack function so state can update from child component
		this.attack = this.attack.bind(this);
	}
	state = {
		// Player properties
		sanity: 100,
		typingSpeed: 5,
		brainPower: 5,
		moves: [
			{
				name: "console.log('Hello World');",
				damage: 1,
				heal: 0,
				type: "whiteHat",
				description: "Damage:1",
			},
			{
				name: "Brute Force",
				damage: 2,
				heal: 0,
				type: "blackHat",
				description: "Damage: 2",
			},
			{
				name: "Pray",
				damage: 0,
				heal: 10,
				type: "spiritual",
				description: "Raises Sanity by 10",
			},
		],
		items: [
			{
				name: "Risperidone",
				sanity: 50,
				typingSpeed: 0,
				brainPower: 0,
				quantity: 5,
			},
		],

		//Enemy Stats
		enemyName: "eXpl01t.exe",
		enemyBytes: 100,
		enemySpeed: 10,
		enemyPower: 50,
		enemyType: "bug",
		enemyAscii: `
		\\       /
		 \\     /  
		  \\.-./ 
		  (o\\^/o)  _   _   _     __
		  ./ \\.\\ ( )-( )-( ) .-'  '-.
		  [-] \\(//  ||   \\/ (   )) '-.
		  //-__||__.-\\.       .-'
		  (/    ()     \)'-._.-'
		  ||    ||      \\
		  ('    ('       ')`,

		//Opens battle screen if true
		battleOpen: true,
		//Message that is displayed in battle
		battleMessage: "",
	};

	attack(move) {
		const enemSpeed = this.state.enemySpeed;
		const speed = this.state.typingSpeed;
		const pow = this.state.brainPower;
		const enemPow = this.state.enemyPower;
		
		//Set how much damage your move will do
		let moveDamage = 0
		if (move.damage > 0) {
			moveDamage = move.damage + pow;
		} 

		//Compare speeds to decide who goes first
		if (enemSpeed < speed) {
			//If move does damage, deal that damage
			if (move.damage > 0) {
				this.setState({
					enemyBytes: this.state.enemyBytes - (move.damage + pow),
				})
			}
			//If move heals, raise sanity. Update battle message
			this.setState({
				sanity: this.state.sanity + (move.heal),
				battleMessage: `Dealt ${moveDamage} Byte Damage and gained ${move.heal} Sanity`
			});
			//If enemy is not defeated by move, sanity is lost. Battle message updated 
			if (this.state.enemyBytes - (move.damage + pow) > 0) {
				setTimeout(() => {
					this.setState({
						sanity: this.state.sanity - enemPow,
						battleMessage: `Lost ${enemPow} sanity`
					})
					setTimeout(() => {
						this.setState({
							battleMessage: ""
						})
					},1300)
				}, 1300)
			} else {
				setTimeout(() => {
					this.setState({
						battleMessage: `You've defeated ${this.state.enemyName}`
					})
				}, 1300);
				//End battle if enemy is defeated
				setTimeout(() => {
					this.setState({
						battleOpen: false
					})
				},2600)
			}
			
		} else if (enemSpeed > speed) {
			this.setState({
				sanity: this.state.sanity - enemPow,
				battleMessage: `You lost ${enemPow} sanity`
			});
			if (this.state.sanity - enemPow > 0) {
				setTimeout(() => {
					if (move.damage) {
						this.setState({
							enemyBytes: this.state.enemyBytes - (move.damage + pow)
						})
					}
					this.setState({
						sanity: this.state.sanity + (move.heal),
						battleMessage: `Dealt ${moveDamage} Byte Damage and gained ${move.heal} Sanity`
					})
					if (this.state.enemyBytes - (move.damage + speed) <= 0) {
						setTimeout(() => {
							this.setState({
								battleMessage: `You've defeated ${this.state.enemyName}`
							})
							setTimeout(() => {
								this.setState({
									battleOpen: false,
									battleMessage: ""
								})
							}, 1300)
						},2600)
					} else {
						setTimeout(() => {
							this.setState({
								battleMessage: ""
							})
						},1300)
					}
				}, 1300)

			} else {
				setTimeout(() => {
					this.setState({
						battleMessage: `You've officially gone insane`
					})
				}, 1300)
				setTimeout(() => {
					this.setState({
						battleMessage: "",
						battleOpen: false
					})
				},2600)
			} 
		}
	}


	componentDidMount() {
		//Checks localstorage for moves and sets state accordingly
		//If there's no localstorage set, it uses the default moves and sets localstorage
		if (localStorage.getItem("moves")) {
			this.setState({
				moves: JSON.parse(localStorage.getItem("moves")),
			});
		} else if (!localStorage.getItem("moves")) {
			localStorage.setItem("moves", JSON.stringify(this.state.moves));
		}

		//Same thing as above, but with items
		if (localStorage.getItem("items")) {
			this.setState({
				items: JSON.parse(localStorage.getItem("items")),
			});
		} else if (!localStorage.getItem("items")) {
			localStorage.setItem("items", JSON.stringify(this.state.items));
		}

		//Creates Game
		this.game = new KernelPanic(this);
	}

	render() {
		return (
			<Fragment>
				{this.state.battleOpen && (
					<BattleScreen attack={this.attack} {...this.state} />
				)}
				{this.state.battleOpen && <Desktop />}
				<div id="gameContainer"></div>
			</Fragment>
		);
	}
}

export default KernelPanicContainer;
