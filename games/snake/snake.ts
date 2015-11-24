module MainModule {
	
	export class Snake extends Phaser.Group {
		SPEED: number;
		direction : number;
		delay : number;
		head: MainModule.Part;

		constructor(game: Phaser.Game, x: number, y: number) {
			this.SPEED = 32;
			this.delay = 0.15;
			this.direction = Phaser.RIGHT;
			
			this.head = new Part(game, x, y);
			super(game);
			game.add.existing(this);
			
			this.add(this.head);
			this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.move, this);
		}
		
		getApple(apple) {
			var x = this.game.rnd.between(0, 19) * 32;
			var y = this.game.rnd.between(0, 14) * 32;
			apple.reset(x, y);
			this.add(new Part(this.game, this.getChildAt(this.length-1).x, this.getChildAt(this.length-1).y));
		}
		
		update() {	
			if (this.isOutOfBounds()) {
				var state : any = this.game.state.getCurrentState();
				state.gameOver();
			}			
			
			// TODO Le input manager n'est pas assez fiable pour gérer les déplacements, il vaut mieux faire cette vérification sur le déplacement plutôt que sur le changement de direction 
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
				this.game.time.events.add(Phaser.Timer.QUARTER * this.delay , this.move, this);
			}
		}
	
		checkCollisionWithEachPart() {
			for (var i = 1 ; i < this.children.length ; i++) {
				if (this.head.x ==  this.getChildAt(i).x && this.head.y ==  this.getChildAt(i).y) {
					return true;
				}
			}
		}
		

	}
}