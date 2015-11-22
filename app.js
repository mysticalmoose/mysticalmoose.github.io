var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainModule;
(function (MainModule) {
    var BootSnake = (function (_super) {
        __extends(BootSnake, _super);
        function BootSnake() {
            _super.apply(this, arguments);
        }
        BootSnake.prototype.preload = function () {
        };
        BootSnake.prototype.create = function () {
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- phaser -\nSnake", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
            this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
        };
        return BootSnake;
    })(Phaser.State);
    MainModule.BootSnake = BootSnake;
    var BootPopo = (function (_super) {
        __extends(BootPopo, _super);
        function BootPopo() {
            _super.apply(this, arguments);
        }
        BootPopo.prototype.preload = function () {
        };
        BootPopo.prototype.create = function () {
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- phaser -\nPopo", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
            this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
        };
        return BootPopo;
    })(Phaser.State);
    MainModule.BootPopo = BootPopo;
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            _super.call(this, 640, 480, Phaser.AUTO, 'content');
            this.state.add('BootSnake', BootSnake, false);
            this.state.add('BootPopo', BootPopo, false);
        }
        GameManager.prototype.bootGame = function (name) {
            var fullStateName = 'Boot' + name;
            this.state.start(fullStateName);
        };
        return GameManager;
    })(Phaser.Game);
    MainModule.GameManager = GameManager;
})(MainModule || (MainModule = {}));
window.onload = function () {
    var game = new MainModule.GameManager();
    var allGames = document.getElementsByTagName('li');
    var selectedGameName;
    if (allGames.length > 0) {
        startGame(allGames[0].id);
    }
    for (var i = 0; i < allGames.length; i++) {
        allGames[i].addEventListener('click', function () {
            startGame(this.id);
        });
    }
    function startGame(name) {
        if (document.getElementById("content").children.length > 0 && name == selectedGameName)
            return;
        selectedGameName = name;
        game.bootGame(selectedGameName);
    }
};
//# sourceMappingURL=app.js.map