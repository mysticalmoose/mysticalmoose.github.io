module MainModule {
    
    export class GameManager extends Phaser.Game  {
        game: Phaser.Game;
        jetSprite: Phaser.Sprite;
    
        constructor() {
           super(640, 480, Phaser.AUTO, 'content');
             this.state.add('BootSnake',BootSnake,false);
             this.state.add('BootPopo',BootPopo,false);  
             
             this.state.add('GameSnake', GameSnake, false);
        }
        
        bootGame(name) {
            this.state.start('GameSnake');
            //var fullStateName = 'Boot' + name;
            //this.state.start(fullStateName);
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