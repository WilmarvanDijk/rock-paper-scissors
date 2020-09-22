/* Query Selectors (these values may change) */
const gameResult = document.querySelector(".jsGameResult"); 
const roundString = document.querySelector(".jsRound"); 
const roundResult = document.querySelector(".jsRoundResult"); 
const roundSelection = document.querySelector(".jsRoundSelection"); 
const buttons = document.querySelectorAll(".jsButton");
const resetGameButton = document.querySelector(".jsResetGame");
const userHP = document.querySelector(".jsUserHP");
const computerHP = document.querySelector(".jsComputerHP");
const userSelection = document.querySelector(".jsUserSelection");
const computerSelection = document.querySelector(".jsComputerSelection");

/* Declarations (object) */ 
let rpsData = {gameResult: "", roundStngri: "", roundResult: "", roundSelection: "",
               userSelection: "", userInner: "", userSelectionMod: "", computerSelection: "",
               computerInner: "", userTotalScore: 0, computerTotalScore: 0, round: 0, 
               buttonState: "", userHealth: 5, computerHealth: 5, drawScore: 0};
let bgData = {positionNumber: 0, positionString: ""};

/* Event Listeners */
buttons.forEach(button => button.addEventListener("click", playGame));
buttons.forEach(button => button.addEventListener("mousedown", setButton));
buttons.forEach(button => button.addEventListener("mouseup", deleteUserButton));
buttons.forEach(button => button.addEventListener("mouseover", setButton));
buttons.forEach(button => button.addEventListener("mouseout", deleteUserButton));
resetGameButton.addEventListener("click", resetGame);

/* Functions called by events (event handler) */

/**
 * When this function is called a game of Rock, Paper & Scissors is played.
 */
function playGame(e) {

    initializeGame();
    if((rpsData.userHealth > 0 && rpsData.userHealth <= 5) && (rpsData.computerHealth > 0 && rpsData.computerHealth <= 5)) {
        playRound();
    }
    
    if((rpsData.userHealth === 0) || (rpsData.computerHealth === 0)) {
        buttons.forEach(button => button.disabled = true);
        buttons.item(3).disabled = false;
        setEndGameData();
    }

    updateHTML();
}

/**
 * This function sets the state of a button by adding a class to the selected element.
 * Class gets added by using classList.add other functions that are used in this function
 * are desribed in this file.
 * 
 * @param {*} e event handler 
 */
function setButton(e) {
    state = decideActiveHover(e.type);
    setModifications(e);

    decision = decider(rpsData.userSelectionMod);
    buttons.item(decision[0]).classList.add(state);
}

/**
 * Deletes the old state of the user selection buttons.
 * 
 * @param {*} e 
 */
function deleteUserButton(e) {
    state = decideActiveHover(e.type);

    for(let i = 0; i <= 3; i++) {
        buttons.item(i).classList.remove(state);
    }
}

/* Functions used by event handlers and each other sorted on alphabetic order */

/**
 * Calculates the background position of the hp bar 
 * 
 * @param {*} score 
 */
function calculateHpPosition(score) {
    let totalBgSize = 384; //384
    let marginWidth = 24; //24
    let heartWidth = 48; //48
    bgData.positionNumber = (-totalBgSize + marginWidth) + ((marginWidth + heartWidth) * score);
    bgData.positionString = bgData.positionNumber + "px" + " center";
}

/**
 * Decides if the computer is gonna play rock, paper or scissors.
 * The function returns the chosen value
 */

function computerPlay() {
    const choices =  ["button--rock", "button--paper", "button--scissors"];
    let randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}  

/**
 * Returns which userButton or computerButton has to be changed.
 * userButton exists of 0 (Rock), 1 (Paper), 2 (Scissors), 3 (Reset).
 * computerButton exists of 4 (Rock), 5 (Paper), 6 (Scissors).
 * 
 * These values are based on the classlist numbers
 * 
 * @param expression is used to seperate userSelectionMod with computerSelectionMod 
 */

function decider(expression) {
    let userButton;
    let computerButton; 

    switch(expression) {
        case "Rock": userButton = 0; computerButton = 4;
        break;                      
        case "Paper": userButton = 1; computerButton = 5; 
        break;
        case "Scissors": userButton = 2; computerButton = 6;
        break;
        case "Reset": userButton = 3; 
        break;
        default: rpsData.gameResult = "Error! Something went wrong";
    }

    return [userButton, computerButton];
}

/**
 * Decides if an button--active or a button--hover class has to be added depending on the event that happened.
 * 
 * @param {*} event 
 */
function decideActiveHover(event) {
    if(event === "mouseup" || event === "mousedown") {
        state = "button--active"
    }
    else if(event === "mouseout" || event === "mouseover") {
        state = "button--hover"
    }

    return state;
}

/**
 * Deletes the old state of the computer selection buttons
 * 
 * @param {*} state 
 */
function deleteComputerButton(state) {
    for(let i = 4; i <= 6; i++) {
        buttons.item(i).classList.remove(state);
    }
}

/**
 * Initialize starting values
 */
function initializeGame() {
    rpsData.buttonState = "button--hover"
    rpsData.userInner = "";
    rpsData.computerInner = "";
}

/**
 * Modifies the string that is selected. This is needed because the string input is given by the following values:
 * 1. button--rock
 * 2. button--paper
 * 3. button--scissors
 * 
 * This function trims those string down to the following values:
 * 1. Rock
 * 2. Paper
 * 3. Scissors
 * 
 * @param {*} str 
 */
function modSelectionString (str) {
    let substr;

    if(str === "jsResetGame"){ 
        str = str.substring(2, 7); 
    }
    else {
        substr = str.substring(0, 8);
        str = str.replace(substr, "");  
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}







/**
 * This function has to get better named and has to be divided up.
 * 
 * @param {*} e 
 */

function setModifications(e) {
    rpsData.userSelection = e.target.classList[2];
    rpsData.userSelectionMod = modSelectionString(rpsData.userSelection);
    rpsData.computerSelection = computerPlay();
    rpsData.computerSelectionMod = modSelectionString(rpsData.computerSelection);
}

/**
 * When this function is called a round of Rock, Paper & Scissors is played.
 */
function playRound() {
    rpsData.round++;
    rpsData.roundString = "Round " + rpsData.round;

    switch(rpsData.userSelectionMod + rpsData.computerSelectionMod) {
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
        default: rpsData.gameResult = "Error! Something went wrong";
    }
    
}

/**
 * This function gets called when the reset game button is pressed.
 * It makes use of other functions that can be found in this file.
 */
function resetGame() {
    setResetGameData();
    updateHTML();
}

/**
 * Creates data when the round is a draw. 
 */
function setDrawData() {
    rpsData.roundResult = "It's a draw! "; 
    rpsData.roundSelection = rpsData.userSelectionMod  + " draws " + rpsData.computerSelectionMod;
}

/**
 * Sets the data for when the game is finished.
 * The game is finished when userHealth = 0 or computerHealth = 0 (see playRound())
 */

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

/**
 * Creates data when the user has lost a round. 
 */
function setLoseData() {
    rpsData.userHealth--;
    calculateHpPosition(rpsData.userHealth); 
    userHP.style.backgroundPosition = bgData.positionString;
    rpsData.roundResult = "You Lose! "; 
    rpsData.roundSelection = rpsData.computerSelectionMod + " beats " + rpsData.userSelectionMod;
}

/**
 * Resets the game data. This function is called by the function resetGame().
 */
function setResetGameData() {
    rpsData.userTotalScore = 0;
    rpsData.computerTotalScore = 0;
    rpsData.roundString = "";
    rpsData.roundResult = "";
    rpsData.roundSelection = "";
    rpsData.round = 0;
    rpsData.gameResult = "";
    rpsData.userSelection = "button--standard";
    rpsData.userInner = "?";
    rpsData.computerSelection = "button--standard";
    rpsData.computerInner = "?";
    rpsData.userHealth = 5;
    rpsData.computerHealth = 5;
    rpsData.buttonState = "button";
    
    calculateHpPosition(rpsData.userHealth);
    
    userHP.style.backgroundPosition = bgData.positionString;
    computerHP.style.backgroundPosition = bgData.positionString;
    
    for(let i = 0; i <= 2; i++) {
         buttons.item(i).disabled = false;
    }
}

/**
 * Creates data when the user has won a round. 
 */
function setWinData() {
    rpsData.computerHealth--;
    calculateHpPosition(rpsData.computerHealth); 
    computerHP.style.backgroundPosition = bgData.positionString;
    rpsData.roundResult = "You Win! ";
    rpsData.roundSelection = rpsData.userSelectionMod + " beats " + rpsData.computerSelectionMod;
}

/**
 * Updates the HTML on the page when a round is played.
 */
function updateHTML() {
    deleteComputerButton("button--hover");
    decision = decider(rpsData.computerSelectionMod);
    buttons.item(decision[1]).classList.add(rpsData.buttonState);
    

    gameResult.textContent = rpsData.gameResult;  
    roundString.textContent = rpsData.roundString;
    roundResult.textContent = rpsData.roundResult;
    roundSelection.textContent = rpsData.roundSelection;

    userSelection.classList.replace(userSelection.classList.item(2), rpsData.userSelection);
    userSelection.innerHTML = rpsData.userInner;

    computerSelection.classList.replace(computerSelection.classList.item(2), rpsData.computerSelection);
    computerSelection.innerHTML = rpsData.computerInner;
}