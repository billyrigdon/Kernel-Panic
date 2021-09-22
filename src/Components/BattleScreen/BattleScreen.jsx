import React, { Component, Fragment } from "react";
import "./BattleScreen.scss";
import Draggable, { DraggableCore } from "react-draggable";

class BattleScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const moveList = this.props.moves.map((item, index) => (
			<li
				className="move"
				key={item.name}
				onClick={() => this.props.attack(item)}
			>
				{`>`}
				{item.name}
			</li>
		));

		const itemList = this.props.items.map((item, index) => (
			<li className="item" key={item.name} onClick={() => {this.props.useItemBattle(item)}}>
				{`>`} {item.name} - {item.quantity}x
				<br />
				<p> --{item.description}</p>
			</li>
		));

		return (
			<Draggable>
				<div id="window">
					<div className="windowBar">
						<div className="windowButtons minimize"></div>
						<div className="windowButtons maximize"></div>
						<div className="windowButtons close"></div>
					</div>

					<div id="battle-container">
						<div id="moves" className="column">
							<h2 id="sanity">SANITY:{this.props.sanity}</h2>
							<br />
							<h2>
								<span className="bashPrompt">
									root@gh0st:~$
								</span>{" "}
								list_moves.sh
							</h2>
							<ul>
								<br />
								<li>---Available Commands---</li>
								<br />
								{moveList}
							</ul>
							<br />
							<h2>
								<span className="bashPrompt">
									root@gh0st:~$
								</span>{" "}
								list_items.sh
							</h2>
							<ul>
								<br />
								<li>---Available Items---</li>
								<br />
								{itemList}
							</ul>
							<br />

							<br />
							<br />
							<p id="battleMessage">{this.props.battleMessage}</p>
						</div>

						<div id="enemy" className="column">
							<h2>{this.props.enemyName}</h2>
							<br />
							<p>BYTES:{this.props.enemyBytes}</p>
							<div className="ascii">{this.props.enemyAscii}</div>
						</div>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default BattleScreen;
