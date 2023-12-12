let board;
let moveCount = 2;
let boardLength;
let boardBoarder=parseInt(localStorage.getItem("boardSize"));

let time=0;

let timerDefauldValue=60;

let rows=[1,2,3,4,5,6,7,8,9];
let columns = ["a","b","c","d","e","f","g","h","i"]

let moves=[];
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
   time+=timer.value;
   timer.value=61;
    moves.push("player"+turn+"     X:"+rows[x]+" y:"+columns[y]+ "   time: "+ time);
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
  
    console.log(inlineX)
  
    if (inlineX === boardBoarder || inlineY === boardBoarder||diagL === boardBoarder||diagR === boardBoarder) {
        win(turn);
    }
}

function win(turn) {

    document.getElementById('wonMenuContainer').style.display="flex";


    timer.clearTimer();
    let winTitle=' player' + (turn+1) + "   won";

    const winTitleElement=document.getElementById("winTitle");
    winTitleElement.textContent = winTitle;


    const movesContainer= document.getElementById("moves");

    for(let i=0;i<moves.length;i++){
        let move=document.createElement("p");
        move.setAttribute('class',"moveStr")
        move.textContent=moves[i];
        movesContainer.appendChild(move);

    }


    alert('player' + (turn+1) + "won")
    console.log(moves);
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
            win((moveCount+1)%2);
        }
    },

    updateValue() {
        let turn = moveCount % 2 + 1;
        const parentElement = document.getElementById("val" + turn);

        if (parentElement) {
            parentElement.textContent = this.value;
        }
    },

    clearTimer() {
        clearInterval(this.timer);
    }
};






