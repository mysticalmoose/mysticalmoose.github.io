module MainModule {
	
	export class Part extends Phaser.Sprite {
		SPEED: number;
		direction : number;
		
		constructor(game: Phaser.Game, x: number, y: number) {
			this.SPEED = 32;
			this.direction = Phaser.RIGHT;
			super(game, x, y, this.makeRectangle(game));
			game.add.existing(this);
			
			this.game.physics.enable(this, Phaser.Physics.ARCADE);
			this.checkWorldBounds = true;
			
			this.events.onOutOfBounds.add(this.gameOver, this);		
		}
		
		makeRectangle(game: Phaser.Game) : Phaser.BitmapData {
			var bmd = game.add.bitmapData(32,32);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0,0,128,128);
			bmd.ctx.fillStyle = '#0000FF';
			bmd.ctx.fill();
			
			return bmd;
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