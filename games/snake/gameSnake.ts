module MainModule {
	export class GameSnake extends Phaser.State {
		game: Phaser.Game;
		player: MainModule.Player;
		apple: Phaser.Sprite;
		delay : number;
		
		preload() {
		
		}
	
		create() {
			this.delay = 0.15;
			//this.delay = 0.40;
			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.player = new Player(this.game, 0 * 32, 0 * 32);
			this.apple = new Apple(this.game);
		}
		
		move() {
			switch (this.player.direction) {
				case Phaser.LEFT:
					this.player.x += this.player.SPEED *-1;
				break;
				case Phaser.RIGHT:
					this.player.x += this.player.SPEED;
				break;
				
				case Phaser.UP:
					this.player.y += this.player.SPEED *-1;
				break;
				
				case Phaser.DOWN:
					this.player.y += this.player.SPEED;
				break;
				
			}
			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.move, this);
		}
		
		update() {
			if (this.player.x == this.apple.x && this.player.y == this.apple.y) 
				this.getApple();
		}
		
		getApple() {
			var x = this.game.rnd.between(0, 19) * 32;
			var y = this.game.rnd.between(0, 14) * 32;
			this.apple.reset(x, y);
		}
			
		render() {
			//this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
			//this.game.debug.spriteBounds(this.player);
		}
	}
}