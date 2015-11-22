module SnakeModule {
    
    export class SimpleState extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
    
        create() {
        
        }
    }
    
    export class Snake extends Phaser.Game  {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
    
        constructor() {
           super(640, 480, Phaser.AUTO, 'content');
             this.state.add('SimpleState',SimpleState,false);
             this.state.start('SimpleState');
        }
    }
}

window.onload = () => {
    var game = new SnakeModule.Snake();
};