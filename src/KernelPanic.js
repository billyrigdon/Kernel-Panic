import * as Phaser from 'phaser';
import TestScene from './Scenes/TestScene/TestScene';



class KernelPanic extends Phaser.Game {
	constructor(react) {
		const config = {
			type: Phaser.AUTO,
			width: 1600,
			height: 800,
			backgroundColor: "b9eaff",
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 200 },
					enableBody: true,
				}
			},
			scene: [TestScene]
		};
		super(config);
		this.react = react;
	}

	
}

export default KernelPanic;
