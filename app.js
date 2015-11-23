var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainModule;
(function (MainModule) {
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            _super.call(this, 640, 480, Phaser.AUTO, 'content');
            this.state.add('BootSnake', MainModule.BootSnake, false);
            this.state.add('BootPopo', MainModule.BootPopo, false);
            this.state.add('GameSnake', MainModule.GameSnake, false);
        }
        GameManager.prototype.bootGame = function (name) {
            //this.state.start('GameSnake');
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
var MainModule;
(function (MainModule) {
    var BootPopo = (function (_super) {
        __extends(BootPopo, _super);
        function BootPopo() {
            _super.apply(this, arguments);
        }
        BootPopo.prototype.preload = function () {
        };
        BootPopo.prototype.create = function () {
            var _this = this;
            this.game.input.onTap.add(function () { _this.game.scale.startFullScreen(true); }, this);
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- Test plein écran -", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
            this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
        };
        return BootPopo;
    })(Phaser.State);
    MainModule.BootPopo = BootPopo;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var Apple = (function (_super) {
        __extends(Apple, _super);
        function Apple(game) {
            var x = game.rnd.between(0, 19) * 32;
            var y = game.rnd.between(0, 14) * 32;
            _super.call(this, game, x, y, this.makeRectangle(game));
            game.add.existing(this);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }
        Apple.prototype.makeRectangle = function (game) {
            var bmd = game.add.bitmapData(32, 32);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 128, 128);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.fill();
            return bmd;
        };
        return Apple;
    })(Phaser.Sprite);
    MainModule.Apple = Apple;
})(MainModule || (MainModule = {}));
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
            this.game.state.add('TitleScreenSnake', MainModule.TitleScreenSnake, true);
        };
        return BootSnake;
    })(Phaser.State);
    MainModule.BootSnake = BootSnake;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var GameSnake = (function (_super) {
        __extends(GameSnake, _super);
        function GameSnake() {
            _super.apply(this, arguments);
        }
        GameSnake.prototype.preload = function () {
        };
        GameSnake.prototype.create = function () {
            this.delay = 0.15;
            //this.delay = 0.40;
            this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.player = new MainModule.Player(this.game, 0 * 32, 0 * 32);
            this.apple = new MainModule.Apple(this.game);
        };
        GameSnake.prototype.move = function () {
            switch (this.player.direction) {
                case Phaser.LEFT:
                    this.player.x += this.player.SPEED * -1;
                    break;
                case Phaser.RIGHT:
                    this.player.x += this.player.SPEED;
                    break;
                case Phaser.UP:
                    this.player.y += this.player.SPEED * -1;
                    break;
                case Phaser.DOWN:
                    this.player.y += this.player.SPEED;
                    break;
            }
            this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);
        };
        GameSnake.prototype.update = function () {
            if (this.player.x == this.apple.x && this.player.y == this.apple.y)
                this.getApple();
        };
        GameSnake.prototype.getApple = function () {
            var x = this.game.rnd.between(0, 19) * 32;
            var y = this.game.rnd.between(0, 14) * 32;
            this.apple.reset(x, y);
        };
        GameSnake.prototype.render = function () {
            //this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
            //this.game.debug.spriteBounds(this.player);
        };
        return GameSnake;
    })(Phaser.State);
    MainModule.GameSnake = GameSnake;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            this.SPEED = 32;
            this.direction = Phaser.RIGHT;
            _super.call(this, game, x, y, this.makeRectangle(game));
            game.add.existing(this);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.checkWorldBounds = true;
            this.body.checkCollision.up = true;
            this.body.checkCollision.down = true;
            this.body.checkCollision.left = true;
            this.body.checkCollision.right = true;
            this.events.onOutOfBounds.add(this.gameOver, this);
        }
        Player.prototype.makeRectangle = function (game) {
            var bmd = game.add.bitmapData(32, 32);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 128, 128);
            bmd.ctx.fillStyle = '#0000FF';
            bmd.ctx.fill();
            return bmd;
        };
        Player.prototype.update = function () {
            // Améliorer le gameplay pour prendre toujours le dernier input 
            //appuyé mettre des évènements sur les touches pour changer la direction et dans le update selon aller dans la direction définie
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.direction = Phaser.RIGHT;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.direction = Phaser.LEFT;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.direction = Phaser.UP;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.direction = Phaser.DOWN;
            }
        };
        Player.prototype.gameOver = function () {
            console.log("aoutch");
            this.game.state.start('GameSnake', true, false);
        };
        return Player;
    })(Phaser.Sprite);
    MainModule.Player = Player;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var TitleScreenSnake = (function (_super) {
        __extends(TitleScreenSnake, _super);
        function TitleScreenSnake() {
            _super.apply(this, arguments);
        }
        TitleScreenSnake.prototype.preload = function () {
        };
        TitleScreenSnake.prototype.create = function () {
            var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
            var text = this.game.add.text(this.world.centerX, this.world.centerY, "- Snake -\nAppuyez sur espace", style);
            text.anchor.set(0.5);
            text.alpha = 0.1;
            this.game.add.tween(text).to({ alpha: 1 }, 2000, "Linear", true);
        };
        TitleScreenSnake.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.add('GameSnake', MainModule.GameSnake, true);
            }
        };
        return TitleScreenSnake;
    })(Phaser.State);
    MainModule.TitleScreenSnake = TitleScreenSnake;
})(MainModule || (MainModule = {}));
//# sourceMappingURL=app.js.map