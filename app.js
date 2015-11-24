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
            this.state.start('GameSnake');
            //var fullStateName = 'Boot' + name;
            //this.state.start(fullStateName);
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
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.snake = new MainModule.Snake(this.game, this.game.width / 2, this.game.height / 2 - 16);
            this.apple = new MainModule.Apple(this.game);
            console.log(this.snake.head.x);
            console.log(this.snake.head.y);
        };
        GameSnake.prototype.update = function () {
            if ((this.snake.head.x == this.apple.x && this.snake.head.y == this.apple.y))
                this.snake.getApple(this.apple);
        };
        GameSnake.prototype.render = function () {
            //this.game.debug.text("Time until event: " + this.game.time.events.duration, 32, 32);
            //this.game.debug.spriteBounds(this.snake.head);
        };
        GameSnake.prototype.gameOver = function () {
            console.log("aoutch");
            this.game.paused = true;
            //this.game.state.start('GameSnake', true, false);
        };
        return GameSnake;
    })(Phaser.State);
    MainModule.GameSnake = GameSnake;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var Part = (function (_super) {
        __extends(Part, _super);
        function Part(game, x, y) {
            _super.call(this, game, x, y, this.makeRectangle(game));
            game.add.existing(this);
        }
        Part.prototype.makeRectangle = function (game) {
            var bmd = game.add.bitmapData(32, 32);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 128, 128);
            bmd.ctx.fillStyle = '#0000FF';
            bmd.ctx.fill();
            return bmd;
        };
        return Part;
    })(Phaser.Sprite);
    MainModule.Part = Part;
})(MainModule || (MainModule = {}));
var MainModule;
(function (MainModule) {
    var Snake = (function (_super) {
        __extends(Snake, _super);
        function Snake(game, x, y) {
            this.SPEED = 32;
            this.delay = 0.15;
            this.direction = Phaser.RIGHT;
            this.head = new MainModule.Part(game, x, y);
            _super.call(this, game);
            game.add.existing(this);
            this.add(this.head);
            this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);
        }
        Snake.prototype.getApple = function (apple) {
            var x = this.game.rnd.between(0, 19) * 32;
            var y = this.game.rnd.between(0, 14) * 32;
            apple.reset(x, y);
            this.add(new MainModule.Part(this.game, this.getChildAt(this.length - 1).x, this.getChildAt(this.length - 1).y));
        };
        Snake.prototype.update = function () {
            if (this.isOutOfBounds()) {
                var state = this.game.state.getCurrentState();
                state.gameOver();
            }
            // TODO Le input manager n'est pas assez fiable pour gérer les déplacements, il vaut mieux faire cette vérification sur le déplacement plutôt que sur le changement de direction 
            var key = this.game.input.keyboard;
            if (key.isDown(Phaser.Keyboard.RIGHT) && this.direction != Phaser.LEFT) {
                this.direction = Phaser.RIGHT;
            }
            else if (key.isDown(Phaser.Keyboard.LEFT) && this.direction != Phaser.RIGHT) {
                this.direction = Phaser.LEFT;
            }
            else if (key.isDown(Phaser.Keyboard.UP) && this.direction != Phaser.DOWN) {
                this.direction = Phaser.UP;
            }
            else if (key.isDown(Phaser.Keyboard.DOWN) && this.direction != Phaser.UP) {
                this.direction = Phaser.DOWN;
            }
        };
        Snake.prototype.isOutOfBounds = function () {
            if (this.head.x < 0 || this.head.x + this.head.width > this.game.world.width || this.head.y < 0 || this.head.y + this.head.width > this.game.world.height) {
                return true;
            }
            return false;
        };
        Snake.prototype.move = function () {
            for (var i = this.children.length - 1; i > 0; i--) {
                this.getChildAt(i).x = this.getChildAt(i - 1).x;
                this.getChildAt(i).y = this.getChildAt(i - 1).y;
            }
            switch (this.direction) {
                case Phaser.LEFT:
                    this.head.x += this.SPEED * -1;
                    break;
                case Phaser.RIGHT:
                    this.head.x += this.SPEED;
                    break;
                case Phaser.UP:
                    this.head.y += this.SPEED * -1;
                    break;
                case Phaser.DOWN:
                    this.head.y += this.SPEED;
                    break;
            }
            if (this.checkCollisionWithEachPart()) {
                var state = this.game.state.getCurrentState();
                state.gameOver();
            }
            else {
                this.game.time.events.add(Phaser.Timer.QUARTER * this.delay, this.move, this);
            }
        };
        Snake.prototype.checkCollisionWithEachPart = function () {
            for (var i = 1; i < this.children.length; i++) {
                if (this.head.x == this.getChildAt(i).x && this.head.y == this.getChildAt(i).y) {
                    return true;
                }
            }
        };
        return Snake;
    })(Phaser.Group);
    MainModule.Snake = Snake;
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