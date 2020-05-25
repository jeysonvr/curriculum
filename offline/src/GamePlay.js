var amound_diamonds = 30;
var amound_boobles = 30;

var diamondsLimit_min = 50;
var diamondsLimit_max = 250;

var timer_position = window.innerWidth * 0.8;

var finalMessageStyle = {
    font: 'bold 40pt Arial',
    fill: '#FFFFFF',
    align: 'center'
};

if (window.innerWidth < 600) {
    amound_diamonds = 10;
    amound_boobles = 10;

    finalMessageStyle = {
        font: 'bold 18pt Arial',
        fill: '#FFFFFF',
        align: 'center'
    };

    diamondsLimit_min = 0;
    diamondsLimit_max = 0;

    timer_position = window.innerWidth * 0.9;
}

GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        this.flagFirstMouseDown = false;
        this.amountDiamondsCaught = 0;
        this.endGame = false;

        this.countSmile = -1;
    },
    preload: function() {
        game.load.image('background', '/offline/assets/images/background.png');
        game.load.spritesheet('horse', '/offline/assets/images/horse.png', 84, 156, 2);
        game.load.spritesheet('diamonds', '/offline/assets/images/diamonds.png', 81, 84, 4);

        game.load.spritesheet('explosion', '/offline/assets/images/explosion.png');
        game.load.spritesheet('shark', '/offline/assets/images/shark.png');
        game.load.spritesheet('fishes', '/offline/assets/images/fishes.png');
        game.load.spritesheet('mollusk', '/offline/assets/images/mollusk.png');

        game.load.spritesheet('booble1', '/offline/assets/images/booble1.png');
        game.load.spritesheet('booble2', '/offline/assets/images/booble2.png');

    },
    create: function() {
        game.add.sprite(0, 0, 'background');

        // Decoration
        this.boobleArray = [];
        for (var i = 0; i < amound_boobles; i++) {
            var xBooble = game.rnd.integerInRange(1, window.innerWidth);
            var yBooble = game.rnd.integerInRange(window.innerHeight - 50, window.innerHeight);

            var booble = game.add.sprite(xBooble, yBooble, 'booble' + game.rnd.integerInRange(1, 2));
            booble.vel = 0.2 + game.rnd.frac() * 2;
            booble.alpha = 0.9;
            booble.scale.setTo(0.2 + game.rnd.frac());
            this.boobleArray[i] = booble;
        }

        this.mollusk = game.add.sprite(500, 150, 'mollusk');
        this.shark = game.add.sprite(500, 20, 'shark');
        this.fishes = game.add.sprite(100, 550, 'fishes');


        this.horse = game.add.sprite(0, 0, 'horse');
        this.horse.frame = 0;
        this.horse.x = game.width / 2;
        this.horse.y = game.height / 2;
        this.horse.anchor.setTo(0.5, 0.5);
        game.input.onDown.add(this.onTap, this);


        // Load diamonds
        this.diamonds = [];
        for (var i = 0; i < amound_diamonds; i++) {
            var diamond = game.add.sprite(100, 100, 'diamonds');
            diamond.frame = game.rnd.integerInRange(0, 3);
            diamond.scale.setTo(0.30 + game.rnd.frac());
            diamond.anchor.setTo(0.5);
            diamond.x = game.rnd.integerInRange(50, window.innerWidth - 250);
            diamond.y = game.rnd.integerInRange(50, window.innerHeight - 250);

            this.diamonds[i] = diamond;

            var rectCurrentDiamond = this.getBoundsDiamond(diamond);
            var rectHorse = this.getBoundsDiamond(this.horse);
            while (this.isOverLappingOtherDiamond(i, rectCurrentDiamond) || this.isRectangleOverLapping(rectHorse, rectCurrentDiamond)) {
                diamond.x = game.rnd.integerInRange(diamondsLimit_min, window.innerWidth - diamondsLimit_max);
                diamond.y = game.rnd.integerInRange(diamondsLimit_min, window.innerHeight - diamondsLimit_max);
                rectCurrentDiamond = this.getBoundsDiamond(diamond);
            }

        }

        // Include explosion 
        this.explosionGroup = game.add.group();
        for (var i = 0; i < 10; i++) {
            this.explosion = this.explosionGroup.create(100, 100, 'explosion');

            this.explosion.tweenScale = game.add.tween(this.explosion.scale).to({
                x: [0.4, 0.8, 0.4],
                y: [0.4, 0.8, 0.4]
            }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);

            this.explosion.tweenAlpha = game.add.tween(this.explosion).to({
                alpha: [1, 0.6, 0]
            }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);
            this.explosion.anchor.setTo(0.5);
            this.explosion.kill();
        }


        // Puntaje
        this.currentScore = 0;
        var style = {
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.scoreText = game.add.text(game.width / 2, 40, '0', style);
        this.scoreText.anchor.setTo(0.5);

        // Timer
        this.totalTime = 30;
        this.timerText = game.add.text(timer_position, 40, this.totalTime, style);
        this.timerText.anchor.setTo(0.5);
        this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function() {
            if (this.flagFirstMouseDown) {
                this.totalTime -= 1;
                this.timerText.text = this.totalTime;

                if (this.totalTime <= 0) {
                    game.time.events.remove(this.timerGameOver);
                    this.endGame = true;
                    this.showFinalMessage('Game over');

                }
            }
        }, this);


    },
    increaseScore: function() {

        // Open horse eye
        this.countSmile = 0;
        this.horse.frame = 1;

        this.currentScore += 100;
        this.scoreText.text = this.currentScore;
        this.amountDiamondsCaught += 1;

        if (this.amountDiamondsCaught >= amound_diamonds) {
            this.endGame = true;
            game.time.events.remove(this.timerGameOver);
            this.showFinalMessage('CONGRATULATIONS');
        }
    },
    showFinalMessage: function(msg) {

        this.tweenMollusk.stop();

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        var bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;


        this.textFieldFinalMsg = game.add.text(game.width / 2, game.height / 2, msg, finalMessageStyle);
        this.textFieldFinalMsg.anchor.setTo(0.5);
    },
    onTap: function() {
        if (!this.flagFirstMouseDown) {
            this.tweenMollusk = game.add.tween(this.mollusk.position).to({
                y: -0.001
            }, 5800, Phaser.Easing.Cubic.InOut, true, 0, 1000, true).loop(true);
        }
        this.flagFirstMouseDown = true;

    },
    getBoundsDiamond: function(currentDiamond) {
        return new Phaser.Rectangle(currentDiamond.left, currentDiamond.top, currentDiamond.width, currentDiamond.height);
    },
    isRectangleOverLapping: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
            return false;
        }
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
            return false;
        }

        return true;
    },
    isOverLappingOtherDiamond: function(index, rect2) {
        for (var i = 0; i < index; i++) {
            var rect1 = this.getBoundsDiamond(this.diamonds[i]);
            if (this.isRectangleOverLapping(rect1, rect2)) {
                return true;
            }
        }
        return false;
    },
    getBoundsHorse: function() {
        var x0 = this.horse.x - Math.abs(this.horse.width / 4);
        var width = Math.abs(this.horse.width) / 2;
        var y0 = this.horse.y - this.horse.height / 2;
        var height = this.horse.height;

        return new Phaser.Rectangle(x0, y0, width, height);
    },
    render: function() {
        // game.debug.spriteBounds(this.horse);
        // for (var i = 0; i < amound_diamonds; i++) {
        //     game.debug.spriteBounds(this.diamonds[i]);
        // }
    },
    update: function() {
        if (this.flagFirstMouseDown && !this.endGame) {

            // boobles motion
            for (var i = 0; i < amound_boobles; i++) {
                var booble = this.boobleArray[i];
                booble.y -= booble.vel;
                if (booble.y < -500) {
                    booble.y = 700;
                    booble.x = game.rnd.integerInRange(1, 140);
                }
            }

            // Horse eye
            if (this.countSmile >= 0) {
                this.countSmile++;
                if (this.countSmile > 50) {
                    this.countSmile = -1;
                    this.horse.frame = 0;
                }
            }

            // Shark motion
            this.shark.x--;
            if (this.shark.x < -300) {
                this.shark.x = 1300;
            }

            // fishes motion
            this.fishes.x += 0.3;
            if (this.fishes.x > 1300) {
                this.fishes.x = -300;
            }

            // this.horse.angle += 1;
            var pointerX = game.input.x;
            var pointerY = game.input.y;
            // console.log(pointerX, pointerY);

            var distX = pointerX - this.horse.x;
            var distY = pointerY - this.horse.y;

            if (distX > 0) {
                this.horse.scale.setTo(1, 1);
            } else {
                this.horse.scale.setTo(-1, 1);
            }

            this.horse.x += distX * 0.02;
            this.horse.y += distY * 0.02;

            for (var i = 0; i < amound_diamonds; i++) {
                var rectHorse = this.getBoundsHorse();
                var rectDiamond = this.getBoundsDiamond(this.diamonds[i]);
                if (this.diamonds[i].visible && this.isRectangleOverLapping(rectHorse, rectDiamond)) {
                    this.diamonds[i].visible = false;

                    // Show explosion
                    var explosion = this.explosionGroup.getFirstDead();
                    this.increaseScore();
                    if (explosion != null) {
                        explosion.reset(this.diamonds[i].x, this.diamonds[i].y);
                        explosion.tweenScale.start();
                        explosion.tweenAlpha.start();

                        explosion.tweenAlpha.onComplete.add(function(currentTarget, currentTween) {
                            currentTarget.kill();
                        }, this);
                    }
                }
            }
        }
    }
}

if (window.innerWidth < 600) {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);
} else {
    var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
}


game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');