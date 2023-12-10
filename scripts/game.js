let board;
let moveCount=2;
let boardLength;
let boardBoarder=3;

document.addEventListener('DOMContentLoaded', function() {
    board = document.getElementById("board");
    boardLength=board.offsetHeight;
    board.style.width=boardLength+"px";

    for (let i = 0; i < 9; i++) {
        createBlock(board);
    }
});

function createBlock(parent) {


    console.log(boardLength/boardBoarder-4)

    const block = document.createElement("div");

    block.setAttribute("class", "boardBlock");
    block.setAttribute("id", "boardBlock");

    block.style.width=boardLength/boardBoarder-6+"px";
    block.style.height=boardLength/boardBoarder-7+"px";

    initBlock(block);

    parent.appendChild(block); 

}

function initBlock(block){
    block.addEventListener("click", function() {
        makeMove(block);
    });
}


function makeMove(block){
    const icon = document.createElement("img");

    let turn=calcTurn();
    icon.setAttribute("src","./../sorces/char"+turn+".png")
    icon.setAttribute("class","character")


    block.appendChild(icon);

    moveCount++

}


function calcTurn(){
    return moveCount%2;
}