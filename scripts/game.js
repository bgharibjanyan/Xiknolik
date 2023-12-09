let board;
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

    block.style.width=boardLength/boardBoarder-4+"px";
    block.style.height=boardLength/boardBoarder-4+"px";

    parent.appendChild(block); 

}
