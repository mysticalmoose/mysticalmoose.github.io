module MainModule {
	export class TitleScreenSnake extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
    
        create() {
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- Snake -\nAppuyez sur espace", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
        
            this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        }
        
        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.add('GameSnake', GameSnake, true); 
            }
        }
    }
}