module MainModule {
	export class GameSnake extends Phaser.State {
		game: Phaser.Game;
		snake: MainModule.Snake;
		apple: Phaser.Sprite;
		delay : number;
		
		preload() {
		
		}
	
		create() {
			this.delay = 0.15;
			//this.delay = 0.40;
			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			console.log(this.world.width, 'width');
			console.log(this.world.height, 'height');
			this.snake = new Snake(this.game, 0,0);
			this.apple = new Apple(this.game);
		}
		
		move() {
			
			var headPrevX = this.snake.getChildAt(0).x;
			var headPrevY = this.snake.getChildAt(0).y;
			
			switch (this.snake.direction) {
				case Phaser.LEFT:
					this.snake.getChildAt(0).x += this.snake.SPEED *-1;
				break;
				case Phaser.RIGHT:
					this.snake.getChildAt(0).x += this.snake.SPEED;
				break;
				
				case Phaser.UP:
					this.snake.getChildAt(0).y += this.snake.SPEED *-1;
				break;
				
				case Phaser.DOWN:
					this.snake.getChildAt(0).y += this.snake.SPEED;
				break;	
			}
		
			for (var i = this.snake.children.length - 1 ; i > 1 ; i--) {
				this.snake.getChildAt(i).x = this.snake.getChildAt(i-1).x;
				this.snake.getChildAt(i).y = this.snake.getChildAt(i-1).y;
			}
			this.checkCollisionWithEachPart();
			if (this.snake.children.length > 1) {
				this.snake.getChildAt(1).x = headPrevX;
				this.snake.getChildAt(1).y = headPrevY;
			}

			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.move, this);
		}
		
		
		update() {
			if ((this.snake.getChildAt(0).x == this.apple.x && this.snake.getChildAt(0).y == this.apple.y)) 
				this.getApple();
			
		}
		
		checkCollisionWithEachPart() {
			for (var i = 1 ; i < this.snake.children.length ; i++) {
				if (this.snake.getChildAt(0).x ==  this.snake.getChildAt(i).x && this.snake.getChildAt(0).y ==  this.snake.getChildAt(i).y)
					this.snake.gameOver();
			}
		}
		
		getApple() {
			var x = this.game.rnd.between(0, 19) * 32;
			var y = this.game.rnd.between(0, 14) * 32;
			this.apple.reset(x, y);
			this.snake.add(new Part(this.game, this.snake.getChildAt(this.snake.length-1).x, this.snake.getChildAt(this.snake.length-1).y));
		}
			
		render() {
			//this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
			//this.game.debug.spriteBounds(this.snake.getAt(0));
		}
	}
}