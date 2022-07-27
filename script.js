// Variables
let playerScore = 0;
let botScore = 0;
let roundNumber = 0;
const roundMax = 5;
const pauseTimer = 1500;
let timerID = null; //timer Id to reset the bot paper rock scissors buttons if player plays faster than the animation timer 1.5s
let lastWeapon = null; //reset the bot paper rock scissors if player plays faster than the animation timer 1.5s

// DOM elements
const playerButtons = document.querySelectorAll(".player-button");
const botButtons = document.querySelectorAll(".bot-button");
const roundCounter = document.querySelector(".round-count");
const youScoreElement = document.getElementById("you-score");
const botScoreElement = document.getElementById("bot-score");

// Game over modal
let gameOverModal = document.querySelector(".gameover-modal");
let playAgainBtn = document.getElementById("play-again-btn");
let gameOverMessage = document.getElementById("gameover-message");

playAgainBtn.onclick = function(){
  gameOverModal.style.display = "none"
  reset();
}

window.onclick = function(e){
  if(e.target == gameOverModal){
    gameOverModal.style.display = "none"
    reset();
  }
}

function getOutcomeMessage(playerSelection, botSelection, playerWinner) {
  if (playerWinner) {
    playerScore += 1;
    youScoreElement.innerHTML = `score: ${playerScore}`;
    testForEndState();
    return `<span class="you-blue">You win!</span>&nbsp;${playerSelection} beats ${botSelection}.`;
  } else {
    botScore += 1;
    botScoreElement.innerHTML = `score: ${botScore}`;
    testForEndState();
    return `${botSelection} beats ${playerSelection}.&nbsp;<span class="bot-red">Bot wins!</span>`;
  }
}

function playRound(playerSelection, botSelection) {
  //Draw if the player and the computer match
  if (playerSelection === botSelection) {
    return "Draw!";
  } //Player win cases
  else if (playerSelection === "paper" && botSelection === "rock") {
    return getOutcomeMessage(playerSelection, botSelection, true);
  } else if (playerSelection === "rock" && botSelection === "scissors") {
    return getOutcomeMessage(playerSelection, botSelection, true);
  } else if (playerSelection === "scissors" && botSelection === "paper") {
    return getOutcomeMessage(playerSelection, botSelection, true);
  } //computer win cases
  else if (playerSelection === "rock" && botSelection === "paper") {
    return getOutcomeMessage(playerSelection, botSelection, false);
  } else if (playerSelection === "scissors" && botSelection === "rock") {
    return getOutcomeMessage(playerSelection, botSelection, false);
  } else if (playerSelection === "paper" && botSelection === "scissors") {
    return getOutcomeMessage(playerSelection, botSelection, false);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBotChoice() {
  const rand = getRandomInt(0, 2);
  if (rand === 0) {
    highlightBotButton("rock");
    return "rock";
  } else if (rand === 1) {
    highlightBotButton("paper");
    return "paper";
  } else {
    highlightBotButton("scissors");
    return "scissors";
  }
}

function highlightBotButton(weapon) {
    lastWeapon = weapon;
  botButtons.forEach((button) => {
    if (button.classList.contains(weapon)) {
      button.classList.add("bot-icon-highlight");
      timerID = setTimeout(() => {
        button.classList.remove("bot-icon-highlight");
      }, pauseTimer);
    }
  });
}

function resetButButtonHighlight() {
    botButtons.forEach((button) => {
        if (button.classList.contains(lastWeapon)) {
            clearTimeout(timerID);
            button.classList.remove("bot-icon-highlight");
      }
    });
}

function playAgainPrompt() {
    console.log("playAgainPrompt");
    resetButButtonHighlight();
  if (playerScore > botScore) {
    gameOverMessage.innerHTML = "<i class='fa-solid fa-user you-icon'></i>&nbsp;<span class='you-blue'>You win!!</span>";
    gameOverModal.style.display = "block"
  } else if (playerScore < botScore) {
    gameOverMessage.innerHTML = "<i class='fa-solid fa-robot bot-icon'></i>&nbsp;<span class='bot-red'>Bot wins!</span>";
    gameOverModal.style.display = "block"
  } else {
    gameOverMessage.innerHTML = "Tie game!";
    gameOverModal.style.display = "block"
  }
}

function testForEndState() {
    incrementRound();
    if (roundNumber >= roundMax) {
        playAgainPrompt();
    } 
}

function reset() {
    playerScore = 0;
    botScore = 0;
    roundNumber = 0;
    youScoreElement.innerHTML = `score: ${playerScore}`;
    botScoreElement.innerHTML = `score: ${botScore}`;
    roundCounter.innerHTML = `Round: ${roundNumber} of ${roundMax}`;
}

function incrementRound() {
  roundNumber += 1;
  roundCounter.innerHTML = `Round: ${roundNumber} of ${roundMax}`;
}

function playGame() {
  playerScore = 0;
  botScore = 0;
  playerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      resetButButtonHighlight();
      let playerSelection = "";
      if (button.classList.contains("rock")) {
        playerSelection = "rock";
      } else if (button.classList.contains("paper")) {
        playerSelection = "paper";
      } else {
        playerSelection = "scissors";
      }
      const botSelection = getBotChoice();
      const message = playRound(playerSelection, botSelection);
      document.getElementById("instruction").innerHTML = message;
    });
  });
}

playGame();
