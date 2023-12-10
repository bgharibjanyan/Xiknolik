let board;
let moveCount = 2;
let boardLength;
let boardBoarder = 5;

let boardMap = [];

document.addEventListener('DOMContentLoaded', function () {
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


});

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
        makeMove(block);
    });
}


function makeMove(block) {

    let blockId = block.getAttribute('id');

    let x = blockId[1];
    let y = blockId[0];

    if (boardMap[y][x] === 'F') {
        const icon = document.createElement("img");

        let turn = calcTurn();
        icon.setAttribute("src", "./../sorces/char" + turn + ".png")
        icon.setAttribute("class", "character")


        block.appendChild(icon);
        wincheck(turn, x, y);
        moveCount++

        boardMap[y][x] = turn;

    }
}


function calcTurn() {
    return moveCount % 2;
}


function wincheck(turn, x, y) {
    let inlineX = 1;
    let inlineY = 1;

    for (let i = 0; i < boardBoarder; i++) {
        if (boardMap[i][x] === turn) {

            inlineX++;
        }
        if (boardMap[y][i] === turn) {
            inlineY++;
        }
    }
    console.log(inlineX);
    console.log(inlineY);
  
    if (inlineX === boardBoarder || inlineY === boardBoarder) {
        win(turn);
    }
}

function win(turn) {
    alert('player' + turn+1 + "won")
}