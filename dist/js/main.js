var winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7] // диагональные комбинации
];
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
    Player.prototype.clearArrayOfId = function () {
        this.arrayOfId.length = 0;
        return this.arrayOfId;
    };
    Player.prototype.calculateResult = function () {
        if (this.arrayOfId.length >= 3) {
            for (var i = 0; i < winningCombinations.length; ++i) {
                var _a = winningCombinations[i], a = _a[0], b = _a[1], c = _a[2];
                if (this.arrayOfId.includes(a) && this.arrayOfId.includes(b) && this.arrayOfId.includes(c)) {
                    return true;
                }
            }
        }
        return false;
    };
    return Player;
}());
var listOfSquares = [];
for (var i = 0; i < 9; ++i) {
    var newSquare = { idOfSquare: i + 1, isFilled: false };
    listOfSquares.push(newSquare);
}
var bot = new Player();
var player = new Player();
var field = document.querySelector('.field');
var startButton = document.querySelector('.button-24');
var againButton = document.querySelector('.button-25');
var resultSpan = document.querySelector('.win-span');
var checker = false;
var playerOrBot = true;
startButton.addEventListener('click', function () {
    if (!isStarted()) {
        checker = true;
        playerOrBot = true;
        startButton.parentElement.style.pointerEvents = "none";
        startButton.parentElement.style.opacity = "0.5";
        againButton.parentElement.style.pointerEvents = "unset";
        againButton.parentElement.style.opacity = "1";
    }
    else {
        return;
    }
});
againButton.addEventListener('click', function () {
    clearListOfSquares();
    checker = false;
    playerOrBot = false;
    startButton.parentElement.style.pointerEvents = "unset";
    startButton.parentElement.style.opacity = "1";
    againButton.parentElement.style.pointerEvents = "none";
    againButton.parentElement.style.opacity = "0.5";
    resultSpan.textContent = "";
});
field.addEventListener('click', function (e) {
    if (checker && playerOrBot) {
        var target = e.target;
        var check = target.closest('.square-wrapper');
        if (check && !isFilledChecker(Number(target.id))) {
            var idOfSquare = Number(target.id);
            fillOneSquare(idOfSquare, playerOrBot);
            player.addId(idOfSquare);
            if (player.calculateResult()) {
                resultSpan.insertAdjacentText('beforeend', 'You won');
                checker = false;
                startButton.parentElement.style.pointerEvents = "none";
                startButton.parentElement.style.opacity = "0.5";
                return;
            }
            playerOrBot = !playerOrBot;
            setTimeout(botTurn, 1000);
            if (isDraw()) {
                resultSpan.insertAdjacentText('beforeend', 'Draw');
                return;
            }
        }
    }
    else {
        return;
    }
});
function clearListOfSquares() {
    listOfSquares.forEach(function (element) {
        element.isFilled = false;
        var initialSquare = document.getElementById("".concat(element.idOfSquare));
        var child = initialSquare.firstElementChild;
        if (child.classList.contains('circle')) {
            child.classList.remove('circle');
        }
        else if (child.classList.contains('christ')) {
            child.classList.remove('christ');
        }
        else {
            return;
        }
    });
    player.clearArrayOfId();
    bot.clearArrayOfId();
}
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
function isStarted() {
    return checker;
}
function isDraw() {
    var sum = listOfSquares.filter(function (element) { return element.isFilled == true; }).length;
    return sum == 9;
}
function botTurn() {
    var tempList = listOfSquares.filter(function (element) { return !element.isFilled; });
    if (tempList.length > 0) {
        var randomId = tempList[Math.floor(Math.random() * tempList.length)].idOfSquare;
        fillOneSquare(randomId, playerOrBot);
        bot.addId(randomId);
        if (bot.calculateResult()) {
            resultSpan.insertAdjacentText('beforeend', 'Bot won');
            checker = false;
            return;
        }
        playerOrBot = !playerOrBot;
    }
    else {
        return;
    }
}
