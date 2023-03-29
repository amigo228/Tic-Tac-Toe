const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // горизонтальные комбинации
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // вертикальные комбинации
    [1, 5, 9], [3, 5, 7]            // диагональные комбинации
];

class Player {
    protected score: number = 12;
    private arrayOfId: number[] = [];

    constructor() {
        this.score = 0;
    }

    getScore(): number {
        return this.score;
    }

    addId(id: number): void {
        this.arrayOfId.push(id);
    }

    clearArrayOfId(): number[] {
        this.arrayOfId.length = 0;
        return this.arrayOfId;
    }

    calculateResult(): boolean {
        if (this.arrayOfId.length >= 3) {
            for (let i = 0; i < winningCombinations.length; ++i) {
                const [a, b, c] = winningCombinations[i];
                if (this.arrayOfId.includes(a) && this.arrayOfId.includes(b) && this.arrayOfId.includes(c)) {
                    return true;
                }
            }
        }
        return false;
    }
}

interface Square {
    idOfSquare: number;
    isFilled: boolean;
}

let listOfSquares: Square[] = [];

for (let i: number = 0; i < 9; ++i) {
    let newSquare: Square = {idOfSquare: i + 1, isFilled: false};
    listOfSquares.push(newSquare);
}

let bot: Player = new Player();
let player: Player = new Player();
const field = document.querySelector('.field');
const startButton = document.querySelector('.button-24');
const againButton = document.querySelector('.button-25');
const resultSpan = document.querySelector('.win-span');
let checker: boolean = false;
let playerOrBot: boolean = true;

startButton.addEventListener('click', () => {
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

againButton.addEventListener('click', () => {
    clearListOfSquares();
    checker = false;
    playerOrBot = false;
    startButton.parentElement.style.pointerEvents = "unset";
    startButton.parentElement.style.opacity = "1";
    againButton.parentElement.style.pointerEvents = "none";
    againButton.parentElement.style.opacity = "0.5";
    resultSpan.textContent = "";
})

field.addEventListener('click', (e: Event) => {
    if (checker && playerOrBot) {
        const target = e.target as HTMLElement;
        const check = target.closest('.square-wrapper');

        if(check && !isFilledChecker(Number(target.id))) {
            const idOfSquare: number = Number(target.id);
            fillOneSquare(idOfSquare, playerOrBot);
            player.addId(idOfSquare);
            if(player.calculateResult()) {
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
    listOfSquares.forEach(element => {
        element.isFilled = false;
        const initialSquare = document.getElementById(`${element.idOfSquare}`);
        const child = initialSquare.firstElementChild;
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

function fillOneSquare(idOfSquare: number, christOrCircle: boolean): Square[] {
    listOfSquares.forEach(element => {
        if(element.idOfSquare === idOfSquare && !element.isFilled) {
            const initialSquare = document.getElementById(`${idOfSquare}`);
            const initialSquareSpan = initialSquare.firstElementChild;
            christOrCircle ? initialSquareSpan.classList.add('christ') : initialSquareSpan.classList.add('circle');
            element.isFilled = true;
        }
    })
    return listOfSquares;
}

function isFilledChecker(initialId: number): boolean {
    let temp: boolean;
    listOfSquares.forEach(element => {
        if (element.idOfSquare == initialId) {
            temp = element.isFilled;
        }
    });
    return temp === undefined ? true : temp;
}

function isStarted(): boolean {
    return checker;
}

function isDraw(): boolean {
    let sum = listOfSquares.filter(element => element.isFilled == true).length;
    return sum == 9;
}

function botTurn() { // function that behave like AI or bot
    let tempList = listOfSquares.filter((element) => !element.isFilled);
    if (tempList.length > 0) {
        const randomId: number = tempList[Math.floor(Math.random()*tempList.length)].idOfSquare;
        fillOneSquare(randomId, playerOrBot);
        bot.addId(randomId);
        if(bot.calculateResult()) {
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








