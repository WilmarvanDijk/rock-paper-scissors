/* Query Selectors */
const userScore = document.querySelector("#userScore");
const computerScore = document.querySelector("#computerScore")
const roundResult = document.querySelector(".roundResult p"); 
const gameResult = document.querySelector(".gameResult p");
const buttons = document.querySelectorAll(".userSelection button");
const resetButton = document.querySelector("#reset")

/* Declarations (object) */ 
let rpsData = {gameResult: "", 
                roundResult: "", 
                playerSelection: "", 
                computerSelection: "", 
                round: 0, 
                userScore: 0, 
                computerScore: 0, 
                drawScore: 0};

/* Event Listeners */
buttons.forEach(button => button.addEventListener("click", playGame));
resetButton.addEventListener("click", resetGame);

/* Functions */
function resetGame() {
    setResetData();
    updateHTML();
}

function playGame (e) {
    rpsData.playerSelection = e.target.id;
    rpsData.computerSelection = computerPlay();

    if((rpsData.userScore < 5) && (rpsData.computerScore < 5)) {
        playRound();
    }
    
    if((rpsData.userScore === 5) || (rpsData.computerScore === 5)) {
        setEndGameData();
    }

    updateHTML();
}

function playRound() {
    rpsData.round++;

    switch(rpsData.playerSelection + rpsData.computerSelection) {
        case "RockScissors":
        case "PaperRock":
        case "ScissorsPaper":
            setWinData();
            break;
        case "RockPaper":
        case "PaperScissors":
        case "ScissorsRock":
            setLoseData();
            break;
        case "RockRock":
        case "PaperPaper":
        case "ScissorsScissors":
            setDrawData();   
            break;
        default: result = "Error! Something went wrong";
    }
}

function computerPlay() {
    const choices =  ["Rock", "Paper", "Scissors"];
    let randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}  

function setEndGameData() {
    if(rpsData.userScore === 5){
        rpsData.gameResult = "You've won the game";
    }
    else {
        rpsData.gameResult = "You've lost the game";
    }
}

function setResetData() {
    rpsData.userScore = 0;
    rpsData.computerScore = 0;
    rpsData.gameResult = "";
}

function setWinData() {
    rpsData.userScore++;
    rpsData.roundResult = "You Win! " + rpsData.playerSelection + " beats " + rpsData.computerSelection;
}

function setLoseData() {
    rpsData.computerScore++;
    rpsData.roundResult = "You Lose! " + rpsData.computerSelection + " beats " + rpsData.playerSelection;
}

function setDrawData() {
    rpsData.roundResult = "It's a draw! " + rpsData.playerSelection + " draws " + rpsData.computerSelection;
    roundResult.textContent = rpsData.roundResult;
}

function updateHTML() {
    userScore.textContent = rpsData.userScore;
    computerScore.textContent = rpsData.computerScore;
    roundResult.textContent = rpsData.roundResult;
    gameResult.textContent = rpsData.gameResult;
}