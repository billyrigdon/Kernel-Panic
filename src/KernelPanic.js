import * as Phaser from 'phaser';
import TestScene from './Scenes/TestScene/TestScene';



class KernelPanic extends Phaser.Game {
	constructor(react) {
		const config = {
			type: Phaser.AUTO,
			width: window.innerWidth,
			height: window.innerHeight,
			parent: "gameContainer",
			pixelArt:true,
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
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
