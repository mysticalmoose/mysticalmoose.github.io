module MainModule {
	
	export class Snake extends Phaser.Group {
		SPEED: number;
		direction : number;
		delay : number;
		head: MainModule.Part;
		tail: MainModule.Part;
		canMove: boolean

		constructor(game: Phaser.Game, x: number, y: number) {
			this.SPEED = 32;
			this.delay = 0.15;
			this.direction = Phaser.RIGHT;
			this.canMove = false
			
			this.head = new Part(game, x, y, false);
			this.tail = new Part(game, this.head.x-32, this.head.y, false);
			super(game);
			game.add.existing(this);
			
			this.add(this.head);
			this.add(this.tail);
			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.canMoveF, this);
		}
		
		canMoveF() {
			this.canMove = true;
		}
		
		getApple(apple) {
			var x = this.game.rnd.between(0, 19) * 32;
			var y = this.game.rnd.between(0, 14) * 32;
			apple.reset(x, y);
			
			this.tail.bmd.clear();
			this.tail.bmd.ctx.beginPath();
			this.tail.bmd.ctx.rect(0,0,128,128);
			this.tail.bmd.ctx.fillStyle = '#0000FF';
			this.tail.bmd.ctx.fill();
			this.tail = this.add(new Part(this.game, this.getChildAt(this.length-1).x, this.getChildAt(this.length-1).y, true));
		}
		
		update() {	
			 if (this.canMove) {
				var key = this.game.input.keyboard;
				if (key.isDown(Phaser.Keyboard.RIGHT) && this.direction != Phaser.LEFT) {
					this.direction = Phaser.RIGHT;
				}
				else if (key.isDown(Phaser.Keyboard.LEFT) && this.direction != Phaser.RIGHT)  {
					this.direction = Phaser.LEFT;
				}
				else if (key.isDown(Phaser.Keyboard.UP) && this.direction != Phaser.DOWN) {
					this.direction = Phaser.UP;
				}
				else if (key.isDown(Phaser.Keyboard.DOWN)&& this.direction != Phaser.UP) {
					this.direction = Phaser.DOWN;
            	}
			this.move();
			}	
		}
		
		isOutOfBounds() : boolean {
			if (this.head.x < 0 || this.head.x + this.head.width > this.game.world.width || this.head.y < 0 || this.head.y + this.head.width > this.game.world.height) {
				return true;
			}
			return false;
		}

		move() {
			for (var i = this.children.length - 1 ; i > 0 ; i--) {
				this.getChildAt(i).x = this.getChildAt(i-1).x;
				this.getChildAt(i).y = this.getChildAt(i-1).y;
			}

			switch (this.direction) {
				case Phaser.LEFT:
					this.head.x += this.SPEED *-1;
				break;
				case Phaser.RIGHT:
					this.head.x += this.SPEED;
				break;
				
				case Phaser.UP:
					this.head.y += this.SPEED *-1;
				break;
				
				case Phaser.DOWN:
					this.head.y += this.SPEED;
				break;	
			}
			if (this.checkCollisionWithEachPart()) {
				var state : any = this.game.state.getCurrentState();
				state.gameOver();
			} else {
				this.canMove = false;
				this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.canMoveF, this);
			}
		}
	
		checkCollisionWithEachPart() {
			if (this.isOutOfBounds()) {
				return true;
			}	
			for (var i = 1 ; i < this.children.length ; i++) {
				if (this.head.x ==  this.getChildAt(i).x && this.head.y ==  this.getChildAt(i).y) {
					return true;
				}
			}
		}
		

	}
}