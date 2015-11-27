module MainModule {
	
	export class Part extends Phaser.Sprite {
		
		bmd : Phaser.BitmapData

		constructor(game: Phaser.Game, x: number, y: number, isTail :boolean) {
			this.bmd = game.add.bitmapData(32,32);
			if (isTail) {
				this.makeTail();
			} else {
				this.makePart();
			}
			super(game, x, y, this.bmd);
			game.add.existing(this);
		}
				
		// TODO Évidemment, changer le this.bmd n'aura aucun impact sur le changement de couleur puisque le bmd ne sert que dans le constructor lors de la création du sprite
		// Pour régler ce problème 2 solutions s'offrent à nous : Trouver un moyen pour modifier directement le bmd d'un sprite
		makeTail() {
			this.bmd.ctx.beginPath();
			this.bmd.ctx.rect(0,0,128,128);																																															
			this.bmd.ctx.fillStyle = '#006600';
			this.bmd.ctx.fill();
		}
		
		
		makePart()  {
			this.bmd.ctx.beginPath();
			this.bmd.ctx.rect(0,0,128,128);
			this.bmd.ctx.fillStyle = '#0000FF'; 
			this.bmd.ctx.fill();
		}																						
		}	
}