


document.addEventListener('DOMContentLoaded', function () {

    const submitButton=document.getElementById("playButton")

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); 
    
       
        const opponentValue = document.querySelector('input[name="opponent"]:checked').value;
      
        const boardSize = document.getElementById('bordSize').value;


        localStorage.setItem("boardSize",boardSize);
        localStorage.setItem("opponent",opponentValue);
        window.location.href = './../pages/game.html';
    
     });
    
});