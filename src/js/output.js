define("Player", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    var Player = /** @class */ (function () {
        function Player() {
            this.score = 12;
            this.arrayOfId = [];
            this.score = 0;
        }
        Player.prototype.getScore = function () {
            return this.score;
        };
        Player.prototype.addId = function (id) {
            this.arrayOfId.push(id);
        };
        Player.prototype.getArrayOfId = function () {
            return this.arrayOfId;
        };
        return Player;
    }());
    exports.Player = Player;
});
define("main", ["require", "exports", "Player"], function (require, exports, Player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var player = new Player_1.Player();
    console.log(player.getScore()); // Output: 0
    var field = document.querySelector('.field');
    var startButton = document.querySelector('.button-24');
    var checker = false;
    var playerOrBot = true;
    startButton.addEventListener('click', function () {
        if (!isStarted()) {
            checker = true;
            console.log(checker);
            playerOrBot = true;
        }
        else {
            return;
        }
    });
    function fillOneSquare(idOfSquare, christOrCircle) {
        listOfSquares.forEach(function (element) {
            if (element.idOfSquare === idOfSquare && !element.isFilled) {
                var initialSquare = document.getElementById("".concat(idOfSquare));
                var initialSquareSpan = initialSquare.firstElementChild;
                christOrCircle ? initialSquareSpan.classList.add('christ') : initialSquareSpan.classList.add('circle');
                element.isFilled = true;
            }
        });
        return listOfSquares;
    }
    function isFilledChecker(initialId) {
        var temp;
        listOfSquares.forEach(function (element) {
            if (element.idOfSquare == initialId) {
                temp = element.isFilled;
            }
        });
        return temp === undefined ? true : temp;
    }
    field.addEventListener('click', function (e) {
        if (checker && playerOrBot) {
            var target = e.target;
            var check = target.closest('.square-wrapper');
            if (check && !isFilledChecker(Number(target.id))) {
                var idOfSquare = Number(target.id);
                fillOneSquare(idOfSquare, playerOrBot);
                playerOrBot = !playerOrBot;
                setTimeout(botTurn, 1000);
            }
        }
        else {
            return;
        }
    });
    function isStarted() {
        return checker;
    }
    var listOfSquares = [];
    for (var i = 0; i < 9; ++i) {
        var newSquare = { idOfSquare: i + 1, isFilled: false };
        listOfSquares.push(newSquare);
    }
    listOfSquares.forEach(function (element) {
        console.log(element);
    });
    function botTurn() {
        var tempList = listOfSquares.filter(function (element) { return !element.isFilled; });
        if (tempList.length > 0) {
            var randomId = tempList[Math.floor(Math.random() * tempList.length)].idOfSquare;
            fillOneSquare(randomId, playerOrBot);
            playerOrBot = !playerOrBot;
        }
        else {
            return;
        }
    }
});
