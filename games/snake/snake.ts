module MainModule {
	
	export class Snake extends Phaser.Group {
		SPEED: number;
		direction : number;
		head: MainModule.Part;

		
		constructor(game: Phaser.Game, x: number, y: number) {
			this.SPEED = 32;
			this.direction = Phaser.RIGHT;
			
			this.head = new Part(game, x, y);
			super(game);
			game.add.existing(this);
			
			this.add(this.head);
		}
		
		update() {	
			// Améliorer le gameplay pour prendre toujours le dernier input 
			//appuyé mettre des évènements sur les touches pour changer la direction et dans le update selon aller dans la direction définie
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.direction = Phaser.RIGHT;
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.direction = Phaser.LEFT;
            }
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.direction = Phaser.UP;
            }
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				this.direction = Phaser.DOWN;
            }
		}
		
		gameOver() {
			console.log("aoutch");
			this.game.state.start('GameSnake', true, false);
		}
	}
}