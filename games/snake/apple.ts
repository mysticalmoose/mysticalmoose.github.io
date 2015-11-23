module MainModule {
	
	export class Apple extends Phaser.Sprite {
		SPEED: number;
		constructor(game: Phaser.Game) {
			var x = game.rnd.between(0, 19) * 32;
			var y = game.rnd.between(0, 14) * 32;
			super(game, x, y, this.makeRectangle(game));
			game.add.existing(this);
			
			this.game.physics.enable(this, Phaser.Physics.ARCADE);
		}
		
		makeRectangle(game: Phaser.Game) : Phaser.BitmapData {
			var bmd = game.add.bitmapData(32,32);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0,0,128,128);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.fill();
			
			return bmd;
		}
	}
}