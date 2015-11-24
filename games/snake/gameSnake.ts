module MainModule {
	export class GameSnake extends Phaser.State {
		game: Phaser.Game;
		snake: MainModule.Snake;
		apple: Phaser.Sprite;
		delay : number;
		
		
		preload() {
		}
	
		create() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.snake = new Snake(this.game, this.game.width / 2, this.game.height / 2 - 16);
			this.apple = new Apple(this.game);
			console.log(this.snake.head.x);
			console.log(this.snake.head.y);
		}
		
		update() {
			if ((this.snake.head.x == this.apple.x && this.snake.head.y == this.apple.y))
				this.snake.getApple(this.apple);
		}
		
		render() {
			//this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
			//this.game.debug.spriteBounds(this.snake.head);
		}
		
		gameOver() {
			console.log("aoutch");
			this.game.paused = true;
			//this.game.state.start('GameSnake', true, false);
		}
	}
}