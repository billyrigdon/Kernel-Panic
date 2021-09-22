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
		this.useItem = this.useItem.bind(this);
		this.useItemBattle = this.useItemBattle.bind(this);
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
				description: "Raises Sanity by 50 points",
				message: "You've gained 50 sanity!",
			},
			{
				name: "Ritalin",
				sanity: 10,
				typingSpeed: 10,
				brainPower: 10,
				quantity: 1,
				description: "Raises sanity, typing speed, and brainpower",
				message: "You're feeling focused",
			},
		],

		//Enemy Stats
		enemyName: "eXpl01t.exe",
		enemyBytes: 20,
		enemySpeed: 50,
		enemyPower: 100,
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
		let moveDamage = 0;
		if (move.damage > 0) {
			moveDamage = move.damage + pow;
		}

		//Compare speeds to decide who goes first
		if (enemSpeed < speed) {
			//If move does damage, deal that damage
			if (move.damage > 0) {
				this.setState({
					enemyBytes: this.state.enemyBytes - (move.damage + pow),
				});
			}
			//If move heals, raise sanity. Update battle message
			this.setState({
				sanity: this.state.sanity + move.heal,
				battleMessage: `Dealt ${moveDamage} Byte Damage and gained ${move.heal} Sanity`,
			});
			//If enemy is not defeated by move, sanity is lost. Battle message updated
			if (this.state.enemyBytes - (move.damage + pow) > 0) {
				setTimeout(() => {
					this.setState({
						sanity: this.state.sanity - enemPow,
						battleMessage: `Lost ${enemPow} sanity`,
					});
					setTimeout(() => {
						this.setState({
							battleMessage: "",
						});
					}, 1300);
				}, 1300);
			} else {
				//Display battle message that you've won 
				setTimeout(() => {
					this.setState({
						battleMessage: `You've defeated ${this.state.enemyName}`,
					});
				}, 1300);
				//End battle if enemy is defeated
				setTimeout(() => {
					this.setState({
						battleOpen: false,
					});
				}, 2600);
			}
			//If enemy speed is greater, lose sanity before you make move
		} else if (enemSpeed > speed) {
			this.setState({
				sanity: this.state.sanity - enemPow,
				battleMessage: `You lost ${enemPow} sanity`,
			});
			//If sanity is still above 0, your attack succeeds
			if (this.state.sanity - enemPow > 0) {
				setTimeout(() => {
					if (move.damage) {
						this.setState({
							enemyBytes:
								this.state.enemyBytes - (move.damage + pow),
						});
					}
					//Raise sanity if move has a heal property and display battle message
					this.setState({
						sanity: this.state.sanity + move.heal,
						battleMessage: `Dealt ${moveDamage} Byte Damage and gained ${move.heal} Sanity`,
					});
					//If move defeats enemy, display battle message and end battle 
					if (this.state.enemyBytes - (move.damage + speed) <= 0) {
						setTimeout(() => {
							this.setState({
								battleMessage: `You've defeated ${this.state.enemyName}`,
							});
							setTimeout(() => {
								this.setState({
									battleOpen: false,
									battleMessage: "",
								});
							}, 1300);
						}, 2600);
						//If enemy survives, set battle message to blank and prepare for next move
					} else {
						setTimeout(() => {
							this.setState({
								battleMessage: "",
							});
						}, 1300);
					}
				}, 1300);
			} else {
				//If sanity falls below 0, display message and end battle
				setTimeout(() => {
					this.setState({
						battleMessage: `You've officially gone insane`,
					});
				}, 1300);
				setTimeout(() => {
					this.setState({
						battleMessage: "",
						battleOpen: false,
					});
				}, 2600);
			}
		}
	}

	useItem(item) {
		//create copy of items array from state and find index of item
		const newItems = [...this.state.items];
		const itemIndex = newItems.indexOf(item);
		//remove the item from the array, update its quantity property
		//and add it back to the array if quantity is over 0
		newItems.splice(itemIndex, 1);
		item.quantity = item.quantity - 1;
		if (item.quantity > 0) {
			newItems.push(item);
		}
		//Apply affect of items and save new array to state
		this.setState({
			sanity: this.state.sanity + item.sanity,
			typingSpeed: this.state.typingSpeed + item.typingSpeed,
			brainPower: this.state.brainPower + item.brainPower,
			items: [...newItems],
		});
		//Save items array to localstorage
		setTimeout(() => {
			localStorage.setItem("items", JSON.stringify(this.state.items));
		},1300)
	}

	useItemBattle(item) {
		this.useItem(item);
		//Display item message
		this.setState({
			battleMessage: item.message,
		});
		//After a timeout, lose sanity and display message
		setTimeout(() => {
			this.setState({
				sanity: this.state.sanity - this.state.enemyPower,
				battleMessage: `Lost ${this.state.enemyPower} sanity`,
			});
			//Set message back to blank to ready for next move
			setTimeout(() => {
				this.setState({
					battleMessage: "",
				});
			}, 1300);
			//If sanity falls below 0, display battle loss message and close battle
			setTimeout(() => {
				if (this.state.sanity <= 0) {
					this.setState({
						sanity: 0,
						battleMessage: `You've officially gone insane`,
					});
					setTimeout(() => {
						this.setState({
							battleOpen: false,
						});
					}, 1300);
				}
			}, 1300);
		}, 1300);
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
					<BattleScreen
						useItem={this.useItem}
						useItemBattle={this.useItemBattle}
						attack={this.attack}
						{...this.state}
					/>
				)}
				{this.state.battleOpen && <Desktop />}
				<div id="gameContainer"></div>
			</Fragment>
		);
	}
}

export default KernelPanicContainer;
