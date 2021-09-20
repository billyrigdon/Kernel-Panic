import React, { Component, Fragment } from 'react';
import './BattleScreen.scss';
import Draggable, { DraggableCore } from "react-draggable";

class BattleScreen extends Component {	
	constructor(props) {
		super(props);
	}

	render() {
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
							<div onClick={() => { this.props.attack(this.props.moves[0]) }}>>{this.props.moves[0].name} - Deals {this.props.moves[0].damage} Damage</div>
						</div>

						<div id="enemy" className="column">
							{this.props.enemyName}
							<div className="ascii">{`
\\       /
 \\     /  
  \\.-./ 
(o\\^/o)  _   _   _     __
./ \\.\\ ( )-( )-( ) .-'  '-.
[-] \\(//  ||   \\/ (   )) '-.
//-__||__.-\\.       .-'
(/    ()     \)'-._.-'
||    ||      \\
('    ('       ')
	`}</div>
							{this.props.enemySanity}
						</div>
					</div>

				</div>
			</Draggable>
		)
	}
}

export default BattleScreen;