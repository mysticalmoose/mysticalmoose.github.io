module MainModule {
	export class BootSnake extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
        
        create() {  
            this.game.state.add('TitleScreenSnake', TitleScreenSnake, true);
        }
    }
}