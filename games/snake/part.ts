module MainModule {
	
	export class Part extends Phaser.Sprite {
		
		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, this.makeRectangle(game));
			game.add.existing(this);
		}
		
		makeRectangle(game: Phaser.Game) : Phaser.BitmapData {
			var bmd = game.add.bitmapData(32,32);
			bmd.ctx.beginPath();
			bmd.ctx.rect(0,0,128,128);
			bmd.ctx.fillStyle = '#0000FF';
			bmd.ctx.fill();
			
			return bmd;
		}
		

		
	}
}