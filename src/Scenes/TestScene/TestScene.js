import * as Phaser from 'phaser';

const gameState = {};

export default class TestScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TestScene' });
	}


	preload() {
		this.game.react.setState({ sanity: 200 });
		console.log(this.game.react.state);
		this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
  		this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
		this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
		this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
		this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
	}

	create() {
		gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);
		
		const platforms = this.physics.add.staticGroup();

		platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();
	  
		gameState.player.setCollideWorldBounds(true);
	  
		this.physics.add.collider(gameState.player, platforms);
		
		gameState.cursors = this.input.keyboard.createCursorKeys();
	  
		const bugs = this.physics.add.group();
	  
		function bugGen () {
		  const xCoord = Math.random() * 450;
		  bugs.create(xCoord, 10, 'bug1');
		}
	  
		const bugGenLoop = this.time.addEvent({
		  delay: 100,
		  callback: bugGen,
		  callbackScope: this,
		  loop: true,
		});
	  
		this.physics.add.collider(bugs, platforms, (bug) => {
			bug.destroy();
			//console.log(this.game.react.state);
			this.game.react.setState({ sanity: this.game.react.state.sanity += 1 });
		})
		
		this.physics.add.collider(gameState.player, bugs, () => {
		  bugGenLoop.destroy();
		  this.physics.pause();
		  this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
		  this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
		  
			  // Add your code below:
		  this.input.on('pointerup', () =>{
			  this.react.setState({
				sanity: 100
			})
			  this.scene.restart();
		  });
		});

	}

	update() {

	}
}