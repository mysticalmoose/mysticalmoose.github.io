module MainModule {
    
    export class BootSnake extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
    
        create() {
        
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- phaser -\nSnake", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
        
            this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        }
    }
    
        export class BootPopo extends Phaser.State {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
        
        preload() {
          
        }
    
        create() {
        
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- phaser -\nPopo", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
        
            this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        }
    }
    
    export class GameManager extends Phaser.Game  {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
    
        constructor() {
           super(640, 480, Phaser.AUTO, 'content');
             this.state.add('BootSnake',BootSnake,false);
             this.state.add('BootPopo',BootPopo,false);
        }
        
        bootGame(name) {
            var fullStateName = 'Boot' + name;
            this.state.start(fullStateName);
        }
    }
}

window.onload = () => {
    var game = new MainModule.GameManager();
    var allGames = document.getElementsByTagName('li');
    var selectedGameName;
    if (allGames.length > 0) {

        startGame(allGames[0].id);
    }
    
    for (var i = 0 ; i < allGames.length ; i++) {
        allGames[i].addEventListener('click', function() {
            startGame(this.id)
        });
    }
    
    
    function startGame(name) {
        if (document.getElementById("content").children.length > 0 && name == selectedGameName) return;
        selectedGameName = name;
        game.bootGame(selectedGameName);
    }
};