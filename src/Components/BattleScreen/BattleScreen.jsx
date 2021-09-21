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
				{item.name}   ----- {item.description}
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
							<h2>root@gh0st:~$ list_moves.sh</h2>
							<ul>
								<br />
								<li>##SANITY: {this.props.sanity}##</li>
								<br />
								{moveList}
							</ul>
							<br />
							<h2>{this.props.battleMessage}</h2>
						</div>

						<div id="enemy" className="column">
							<h2>{this.props.enemyName}</h2>
							<br />
							##BYTES:{this.props.enemyBytes}##
							<div className="ascii">{this.props.enemyAscii}</div>
						</div>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default BattleScreen;
