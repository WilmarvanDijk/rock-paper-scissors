/* Query Selectors (these values may change) */
const userScore = document.querySelector("#user-roundscore");
const computerScore = document.querySelector("#computer-roundscore")
const userTotalScore = document.querySelector("#user-totalscore");
const computerTotalScore = document.querySelector("#computer-totalscore")
const roundResult = document.querySelector(".roundresult-container"); 
const gameResult = document.querySelector(".gameresult-container");
const buttons = document.querySelectorAll(".playerselection-button");
const resetRoundButton = document.querySelector("#reset-round-button")
const resetGameButton = document.querySelector("#reset-game-button")

/* Declarations (object) */ 
let rpsData = {gameResult: "", roundResult: "", playerSelection: "", computerSelection: "", userTotalScore: 0, computerTotalScore: 0, round: 0, userScore: 0, computerScore: 0, drawScore: 0};

/* Event Listeners */
buttons.forEach(button => button.addEventListener("click", playGame));
resetRoundButton.addEventListener("click", resetRound);
resetGameButton.addEventListener("click", resetGame);

/* Functions */
function resetGame() {
    setResetGameData();
    updateHTML();
}

function resetRound() {
    setResetRoundData();
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
    if((rpsData.userScore === 5) && (rpsData.gameResult ==="")) {
        rpsData.userTotalScore++;
        rpsData.gameResult = "You've won the game";
    }
    else if((rpsData.computerScore === 5) && (rpsData.gameResult ==="")) {
        rpsData.computerTotalScore++;
        rpsData.gameResult = "You've lost the game";
    }
}

function setResetGameData() {
    rpsData.userTotalScore = 0;
    rpsData.computerTotalScore = 0;
    rpsData.gameResult = "";
}

function setResetRoundData() {
    rpsData.userScore = 0;
    rpsData.computerScore = 0;
    rpsData.roundResult = "";
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
    // roundResult.textContent = rpsData.roundResult;
}

function updateHTML() {
    userScore.textContent = rpsData.userScore;
    computerScore.textContent = rpsData.computerScore;
    roundResult.textContent = rpsData.roundResult;
    gameResult.textContent = rpsData.gameResult;
    userTotalScore.textContent = rpsData.userTotalScore;
    computerTotalScore.textContent = rpsData.computerTotalScore;  
}