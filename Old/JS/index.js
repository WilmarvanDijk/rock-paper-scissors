/* Query Selectors (these values may change) */
const userScore = document.querySelector("#user-roundscore");
const computerScore = document.querySelector("#computer-roundscore")
// const userTotalScore = document.querySelector("#user-totalscore");
// const computerTotalScore = document.querySelector("#computer-totalscore")
const gameResult = document.querySelector(".roundresult-container .result #game-result"); 
const roundString = document.querySelector(".roundresult-container .result #round"); 
const roundResult = document.querySelector(".roundresult-container .result #round-result"); 
const roundSelection = document.querySelector(".roundresult-container .result #round-selection"); 
// const gameResult = document.querySelector(".gameresult-container");
// const buttons = document.querySelectorAll(".playerselection-button");
const buttons = document.querySelectorAll(".button-selection");
const resetGameButton = document.querySelector(".reset-game-button")
const userHP = document.getElementById("userHP");
const computerHP = document.getElementById("computerHP");
const userSelection = document.getElementById("userSelection");
const computerSelection = document.getElementById("computerSelection");

/* Declarations (object) */ 
let rpsData = {gameResult: "", roundString: "", roundResult: "", roundSelection: "", playerSelection: "", computerSelection: "", userTotalScore: 0, computerTotalScore: 0, round: 0, userHealth: 5, computerHealth: 5, drawScore: 0};
let bgData = {positionNumber: 0, positionString: ""};

/* Event Listeners */
buttons.forEach(button => button.addEventListener("click", playGame));
resetGameButton.addEventListener("click", resetGame);

/* Functions */
function resetGame() {
    setResetGameData();
    updateHTML();
}

function playGame (e) {
    if((rpsData.userHealth > 0 && rpsData.userHealth <= 5) && (rpsData.computerHealth > 0 && rpsData.computerHealth <= 5)) {
        rpsData.playerSelection = e.target.id;
        rpsData.computerSelection = computerPlay();
        playRound();
    }
    
    if((rpsData.userHealth === 0) || (rpsData.computerHealth === 0)) {
        setEndGameData();
    }

    updateHTML();
}

function playRound() {
    rpsData.round++;
    rpsData.roundString = "Round " + rpsData.round;

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
    if((rpsData.computerHealth === 0) && (rpsData.gameResult ==="")) {
        rpsData.userTotalScore++;
        rpsData.gameResult = "You've won the game!";
    }
    else if((rpsData.userHealth === 0) && (rpsData.gameResult ==="")) {
        rpsData.computerTotalScore++;
        rpsData.gameResult = "You've lost the game!";
    }
}

function setResetGameData() {
    rpsData.userTotalScore = 0;
    rpsData.computerTotalScore = 0;
    rpsData.roundString = "";
    rpsData.roundResult = "";
    rpsData.roundSelection = "";
    rpsData.round = 0;
    rpsData.gameResult = "";
    rpsData.playerSelection = "";
    rpsData.computerSelection = "";
    rpsData.userHealth = 5;
    rpsData.computerHealth = 5;
    calculateHpPosition(rpsData.userHealth);
    userHP.style.backgroundPosition = bgData.positionString;
    computerHP.style.backgroundPosition = bgData.positionString;
}

function calculateHpPosition(score) {
    let totalBgSize = 384;
    let marginWidth = 24;
    let heartWidth = 48;
    bgData.positionNumber = (-totalBgSize + marginWidth) + ((marginWidth + heartWidth) * score);
    bgData.positionString = String(bgData.positionNumber) + "px" + " center";
}

function setWinData() {
    console.log("Player Won!");
    rpsData.computerHealth--;
    calculateHpPosition(rpsData.computerHealth); 
    computerHP.style.backgroundPosition = bgData.positionString;
    rpsData.roundResult = "You Win! ";
    rpsData.roundSelection = rpsData.playerSelection + " beats " + rpsData.computerSelection;
}

function setLoseData() {
    console.log("Computer Won!");
    rpsData.userHealth--;
    calculateHpPosition(rpsData.userHealth); 
    userHP.style.backgroundPosition = bgData.positionString;
    rpsData.roundResult = "You Lose! "; 
    rpsData.roundSelection = rpsData.computerSelection + " beats " + rpsData.playerSelection;
}

function setDrawData() {
    console.log("It's a draw");
    rpsData.roundResult = "It's a draw! "; 
    rpsData.roundSelection = rpsData.playerSelection + " draws " + rpsData.computerSelection;
}

function updateHTML() {
    console.log(rpsData.computerSelection);

    switch(rpsData.computerSelection) {
        case "Rock": buttons.item(6).classList.add("buttonselection-active");
        buttons.item(7).classList.remove("buttonselection-active");
        buttons.item(8).classList.remove("buttonselection-active");
        break;
        // console.log("computer chose rock"); 
        // buttons.item(6).classList.add("buttonselection-active");
        case "Paper": buttons.item(7).classList.add("buttonselection-active");
        buttons.item(6).classList.remove("buttonselection-active");
        buttons.item(8).classList.remove("buttonselection-active");
        break;
        // console.log("computer chose paper");
        // buttons.item(7).classList.add("buttonselection-active");
        case "Scissors": buttons.item(8).classList.add("buttonselection-active"); 
        buttons.item(6).classList.remove("buttonselection-active");
        buttons.item(7).classList.remove("buttonselection-active");
        break;
        // console.log("computer chose scissors"); 
        // buttons.item(8).classList.add("buttonselection-active");
        default: console.log("Something went wrong");
    }


    roundString.textContent = rpsData.roundString;
    roundResult.textContent = rpsData.roundResult;
    roundSelection.textContent = rpsData.roundSelection;
    userSelection.id = rpsData.playerSelection;
    computerSelection.id = rpsData.computerSelection;
    gameResult.textContent = rpsData.gameResult;  
}