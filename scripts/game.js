let board;
let moveCount = 2;
let boardLength;
let boardBoarder = parseInt(localStorage.getItem("boardSize"));
let opponent = localStorage.getItem("opponent")
let level = localStorage.getItem("level")
let choice = localStorage.getItem("choice")

let turn;

let time = 0;

let timerDefauldValue = 60;

let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

let moves = [];
let boardMap = [];

let botMove;

let center = Math.floor(boardBoarder / 2);
console.log("center::" + center)


let botMap = [];
let playerMap = [];

let choiceMap = [];




document.addEventListener('DOMContentLoaded', function () {
    initMaps();
    playWithPerson();
    if (opponent === "computer") {
        let level = localStorage.getItem("level");

        if (level === "1") {
            botMove = botMoveIntern;
            console.log(1)

        } else if (level === "2") {
            botMove = botMoveJunior;
            console.log(2)

        } else if (level === "3") {
            botMove = botMoveBased;
            console.log(3)

        } else if (level === "4") {
            botMove = botMoveSenior;
            console.log(4)

        }
    }

    if(choice==="opponent"){
        botMove();
    }

});

function initMaps() {
    for (let i = 0; i < boardBoarder; i++) {
        botMap[i] = [];
        playerMap[i] = [];
        choiceMap[i] = []
        for (let j = 0; j < boardBoarder; j++) {
            botMap[i][j] = 'F';
            playerMap[i][j] = 'F';
            choiceMap[i][j] = 1;
        }
    }

}

function playWithPerson() {
    board = document.getElementById("board");
    boardLength = board.offsetHeight;
    board.style.width = boardLength + "px";

    for (let i = 0; i < boardBoarder; i++) {
        boardMap[i] = [];
        for (let j = 0; j < boardBoarder; j++) {
            boardMap[i][j] = 'F';
            createBlock(board, `${i}${j}`);
        }
    }

    const exitButton = document.getElementById("exit");
    const replayButton = document.getElementById("replay");

    replayButton.addEventListener("click", function () {
        location.reload();
    });

    exitButton.addEventListener("click", function () {
        console.log(0)
        window.location.href = './../pages/mainMenu.html';
    });

    timer.createTimer()
}

function createBlock(parent, id) {

    console.log(boardLength / boardBoarder - 4)

    const block = document.createElement("div");

    block.setAttribute("class", "boardBlock");
    block.setAttribute("id", id);

    block.style.width = boardLength / boardBoarder - 6 + "px";
    block.style.height = boardLength / boardBoarder - 7 + "px";

    initBlock(block);

    parent.appendChild(block);

}

function initBlock(block) {
    block.addEventListener("click", function () {
        let blockId = block.getAttribute('id');
        let x = blockId[1];
        let y = blockId[0];
        let maxMoveCount=0

        if(choice==="opponent"){
            maxMoveCount=boardBoarder * boardBoarder + 2
    
        }else{maxMoveCount= boardBoarder * boardBoarder + 1}



        if (boardMap[y][x] === 'F') {
            makeMove(x, y,true);
            if (opponent === "computer" && moveCount !== maxMoveCount) {
                botMove(1);
            }

        }

    });
}


function marckBotInMap(x, y, mark) {

    console.log("x=" + x)
    console.log("y=" + y)
    console.log(boardBoarder - y - 1)

    if (mark) {

        for (let i = 0; i < boardBoarder; i++) {
            if (choiceMap[y][i] !== 'X') {
                choiceMap[y][i]++;
            }
            if (choiceMap[i][x] !== 'X') {
                choiceMap[i][x]++;
            }
            if (x === y) {
                if (choiceMap[i][i] !== 'X') {
                    choiceMap[i][i]++;
                }
            }
            if (x == (boardBoarder - y - 1)) {

                if (choiceMap[i][boardBoarder - i - 1] !== "X") {
                    choiceMap[i][boardBoarder - i - 1]++;
                }
            }
        }
    }else{
        for (let i = 0; i < boardBoarder; i++) {
            if (choiceMap[y][i] !== 'X') {
                choiceMap[y][i]--;
            }
            if (choiceMap[i][x] !== 'X') {
                choiceMap[i][x]--;
            }
            if (x === y) {
                if (choiceMap[i][i] !== 'X') {
                    choiceMap[i][i]--;
                }
            }
            if (x == (boardBoarder - y - 1)) {

                if (choiceMap[i][boardBoarder - i - 1] !== "X") {
                    choiceMap[i][boardBoarder - i - 1]--;
                }
            }
        }

    }
    choiceMap[y][x] = "X";

}



function makeMove(x, y,mark) {

    const block = document.getElementById("" + y + x);

    if (boardMap[y][x] === 'F' && moveCount < (boardBoarder * boardBoarder + 2)) {
        const icon = document.createElement("img");

        turn = moveCount % 2;
        icon.setAttribute("src", "./../sorces/char" + turn + ".png")
        icon.setAttribute("class", "character")

        block.appendChild(icon);

        moveCount++
        boardMap[y][x] = turn;
        wincheck(turn, x, y);

        time += timer.value;
        timer.value = 61;

       
        marckBotInMap(x, y,mark)
        moves.push("player" + turn + "     X:" + rows[x] + " y:" + columns[y] + "   time: " + time);

    }
}


function botMoveSenior() {

    if (moveCount < 4 &&choiceMap[center][center] !== "X") {
       
            makeMove(center, center,false);
        
    }else if(moveCount>=(boardBoarder*boardBoarder)){
        randomMove();
    }
     else {
        let maxMoveRate=-10;

        let choiceX = -1;
        let choiceY = -1;

        for (let i = 0; i < boardBoarder; i++) {
            for (let j = 0; j < boardBoarder; j++) {
                if (choiceMap[i][j] !== "X") {
                    if (choiceMap[i][j] > maxMoveRate) {
                        maxMoveRate = choiceMap[i][j];
                        choiceX = j;
                        choiceY = i;
                    }
                }
            }
        }

        makeMove(choiceX, choiceY,false);
    }

}


function botMoveBased(turn) {

    setTimeout(() => {

        let opTurn = (turn + 1) % 2;

        for (let j = 0; j < boardBoarder; j++) {
            let inlineX = 0;
            let inlineY = 0;

            let diagL = 0;
            let diagR = 0;

            let maxInline = boardBoarder - j;

            for (let i = 0; i < boardBoarder; i++) {
                if (boardMap[i][i] == opTurn) {
                    diagL++;

                    if (diagL === maxInline) {
                        blockTheDiagonal("L", turn);
                        console.log("diagL");
                        return;
                    }
                }
                if (boardMap[i][boardBoarder - i - 1] == opTurn) {
                    diagR++;
                    if (diagR === maxInline) {
                        blockTheDiagonal("R", turn);
                        console.log("diagr");
                        return;
                    }
                }
                if (boardMap[j][i] == opTurn) {
                    inlineX++;
                    if (inlineX === maxInline) {
                        blockTheRow(j, opTurn);


                        return;
                    }
                }
                if (boardMap[i][j] == opTurn) {
                    inlineY++;
                    if (inlineY === maxInline) {
                        blockTheColumn(j, opTurn);
                        console.log("inlineY");

                        console.log("i=" + i);
                        console.log("j=" + j);

                        return;
                    }
                }
            }
        }

    }, 2000);

}



function botMoveJunior(turn) {
    setTimeout(() => {

        let opTurn = (turn + 1) % 2;

        for (let j = 0; j < boardBoarder; j++) {

            let diagL = 0;
            let diagR = 0;

            let maxInline = boardBoarder - j;

            for (let i = 0; i < boardBoarder; i++) {
                if (boardMap[i][i] == opTurn) {
                    diagL++;

                    if (diagL === maxInline) {
                        blockTheDiagonal("L", turn);
                        console.log("diagL");
                        return;
                    }
                }
                if (boardMap[i][boardBoarder - i - 1] == opTurn) {
                    diagR++;
                    if (diagR === maxInline) {
                        blockTheDiagonal("R", turn);
                        console.log("diagr");
                        return;
                    }
                }
            }
        }

    }, 3000);

}




function botMoveIntern(turn) {
    setTimeout(() => {
        randomMove();
    }, 1000);

}


function randomMove() {
    while (moveCount < (boardBoarder * boardBoarder + 2)) {

        let x = Math.floor(Math.random() * boardBoarder);
        let y = Math.floor(Math.random() * boardBoarder);

        console.log("" + x + "-" + y);
        if (boardMap[y][x] == "F") {
            makeMove(x, y,false);
            marckBotInMap(x, y);
            return 0;
        } else {
            randomMove()
            return 0;
        }
    }
}

function blockTheRow(row, turn) {
    for (let i = 0; i < boardBoarder; i++) {
        if (boardMap[row][i] === "F") {
            makeMove(i, row,false);
            return 0;
        }
    }
    randomMove();
}

function blockTheColumn(column, turn) {
    for (let i = 0; i < boardBoarder; i++) {
        if (boardMap[i][column] === "F") {
            makeMove(column, i,false);
            return 0;
        }
    }
    randomMove();

}

function blockTheDiagonal(direction, turn) {

    if (direction === "L") {
        for (let i = 0; i < boardBoarder; i++) {
            if (boardMap[i][i] === "F") {
                makeMove(i, i,false);
                return 0;
            }
        }
    } else if (direction === "R") {
        for (let i = 0; i < boardBoarder; i++) {
            if (boardMap[i][boardBoarder - i - 1] === "F") {

                makeMove(boardBoarder - i - 1, i,false);
                return 0;
            }
        }

    }
    randomMove();

}

function wincheck(turn, x, y) {
    let inlineX = 0;
    let inlineY = 0;

    let diagL = 0;
    let diagR = 0;
    let maxMoveCount= boardBoarder * boardBoarder + 2
    if(choice==="opponent"){
       maxMoveCount++;

    }

    if (moveCount === boardBoarder * boardBoarder + 2) {
        win(3);
    } else {

        for (let i = 0; i < boardBoarder; i++) {
            if (boardMap[i][i] == turn) {
                diagL++
            }
            if (boardMap[i][boardBoarder - i - 1] === turn) {
                diagR++;
            }


            if (boardMap[i][x] === turn) {

                inlineX++;
            }
            if (boardMap[y][i] === turn) {
                inlineY++;
            }
        }

        if (inlineX === boardBoarder || inlineY === boardBoarder || diagL === boardBoarder || diagR === boardBoarder) {
            win(turn);
        }
    }


}

function win(turn) {
 let winTitle = ' player ' + (turn + 1) + "   won";

    if(turn===3){    winTitle = "No Winner";}

    document.getElementById('wonMenuContainer').style.display = "flex";

    timer.clearTimer();
   
    const winTitleElement = document.getElementById("winTitle");
    winTitleElement.textContent = winTitle;


    const movesContainer = document.getElementById("moves");

    if(!moves[0]){
        moves[0]="no moves in that game";
    }

    for (let i = 0; i < moves.length; i++) {
        let move = document.createElement("p");
        move.setAttribute('class', "moveStr")
        move.textContent = moves[i];
        movesContainer.appendChild(move);

    }

}


let timer = {
    value: 61,
    interval: 100,
    timerLoop: null,

    createTimer() {
        this.timer = setInterval(this.dec.bind(this), this.interval);
    },

    dec() {
        this.value--;
        this.updateValue();

        if (this.value === 0) {
            win((moveCount + 1) % 2);
        }
    },

    updateValue() {
        turn = moveCount % 2 + 1;
        const parentElement = document.getElementById("val" + turn);

        if (parentElement) {
            parentElement.textContent = this.value;
        }
    },

    clearTimer() {
        clearInterval(this.timer);
    }
};






