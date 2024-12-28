// MainGame.ts

import Phaser from "phaser";

export default class MainGame extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private player!: Phaser.Physics.Arcade.Sprite;
    private showDebug: boolean = false;

    constructor() {
        super({ key: "MainGame" });
    }

    preload(): void {
        // Replace with your actual asset paths or local file references
        this.load.image("tiles", "assets/tuxmon-sample-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "assets/tuxemon-town2.json");
        this.load.atlas(
          "atlas",
          "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png",
          "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json"
        );
    }

    create(): void {
        const map = this.make.tilemap({ key: "map" });
        if (!map) {
            throw new Error("Failed to create tilemap. Check your preload() setup.");
        }

        const tileset = map.addTilesetImage(
          "tuxmon-sample-32px-extruded",
          "tiles"
        );
        if (!tileset) {
            throw new Error(
              "Tileset is null. Double-check that the Tiled tileset name matches and that 'tiles' was loaded."
            );
        }

        const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
        const interactiveLayer = map.createLayer("Interactive", tileset, 0, 0);

        if (!worldLayer || !interactiveLayer) {
            throw new Error(
              "Could not create one of the required tile layers. Check your Tiled layer names."
            );
        }

        worldLayer.setCollisionByProperty({ collides: true });
        interactiveLayer.setCollisionByProperty({ collides: true });

        if (aboveLayer) {
            aboveLayer.setDepth(10);
        }

        const spawnPoint = map.findObject(
          "Objects",
          (obj) => obj.name === "Spawn Point"
        );
        if (!spawnPoint || spawnPoint.x == null || spawnPoint.y == null) {
            throw new Error(
              "Spawn Point is missing or invalid. Make sure there's an object named 'Spawn Point' in your Tiled map."
            );
        }

        const testPoint = map.findObject(
          "Object Layer 2",
          (obj) => obj.name === "test"
        );

        this.player = this.physics?.add
          .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
          .setSize(30, 40)
          .setOffset(0, 24);

        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.player, interactiveLayer, () => {
            this.input.keyboard?.on("keyup-SPACE", () => {
                console.log("Collision with interactive layer and SPACE pressed.");
            });
        });

        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard?.createCursorKeys();


        this.input.keyboard?.once("keydown-D", () => {
            this.showDebug = !this.showDebug;
            console.log("Show debug toggled:", this.showDebug);
        });
    }

    update(time: number, delta: number): void {
        const speed = 175;
        const prevVelocity = this.player.body?.velocity.clone();

        this.player.setVelocity(0);

        if (this.cursors?.left?.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors?.right?.isDown) {
            this.player.setVelocityX(speed);
        }

        if (this.cursors?.up?.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors?.down?.isDown) {
            this.player.setVelocityY(speed);
        }

        this.player.body?.velocity.normalize().scale(speed);

        if (this.cursors?.left?.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors?.right?.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors?.up?.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors?.down?.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();

            if (prevVelocity && prevVelocity.x < 0) {
                this.player.setTexture("atlas", "misa-left");
            } else if (prevVelocity && prevVelocity.x > 0) {
                this.player.setTexture("atlas", "misa-right");
            } else if (prevVelocity && prevVelocity.y < 0) {
                this.player.setTexture("atlas", "misa-back");
            } else if (prevVelocity && prevVelocity.y > 0) {
                this.player.setTexture("atlas", "misa-front");
            }
        }
    }
}