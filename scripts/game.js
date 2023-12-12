let board;
let moveCount = 2;
let boardLength;
let boardBoarder = 5;


let timerDefauldValue=60;


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

    timer.createTimer()


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
     
        moveCount++

        boardMap[y][x] = turn;
   wincheck(turn, x, y);
   timer.value=61
    }
}


function calcTurn() {
    return moveCount % 2;
}


function wincheck(turn, x, y) {
    let inlineX = 0;
    let inlineY = 0;

    let diagL=0;
    let diagR=0;


    for (let i = 0; i < boardBoarder; i++) {
 
    console.log(boardMap[i][boardBoarder-i-1]);
   
             if(boardMap[i][i]==turn){
            diagL++
        }
        if(boardMap[i][boardBoarder-i-1]===0){
            diagR++;
        }
        
       
        if (boardMap[i][x] === turn) {

            inlineX++;
        }
        if (boardMap[y][i] === turn) {
            inlineY++;
        } 
       
    }
    console.log("R"+diagR);
  
    if (inlineX === boardBoarder || inlineY === boardBoarder||diagL === boardBoarder||diagR === boardBoarder) {
        win(turn);
    }
}

function win(turn) {
    alert('player' + turn+1 + "won")
}


var timer={
    value:61,
    interval:1000,
    

    createTimer() {
        setInterval(this.dec.bind(this), this.interval);
      },

    dec(){
        this.value--
        this.updateValue();
        console.log(this.value)
    },

    updateValue(){
        let turn=moveCount%2+1;
        const parentElement=document.getElementById("val"+turn)

        if (parentElement) {
            parentElement.textContent = this.value; 
        }
    }
}


