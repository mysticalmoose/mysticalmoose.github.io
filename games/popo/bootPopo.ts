module MainModule {
        export class BootPopo extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
    
        create() {
            this.game.input.onTap.add(() => { this.game.scale.startFullScreen(true); }, this); 
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- Test plein écran -", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
        
            this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        }
    }
}