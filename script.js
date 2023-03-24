// Elementos del DOM
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const restart = document.querySelector(".restart");
const scoreP = document.querySelector(".scoreP");
const scoreC = document.querySelector(".scoreC");
const messageBox = document.querySelector(".message");
const computerChoiceBox = document.querySelector(".computer-choice");
const playerChoiceBox = document.querySelector(".player-choice");
const playerChoiceText = document.querySelector(".player-choice-text");
const computerChoiceText = document.querySelector(".computer-choice-text");

// Variables iniciales
let playerScore = 0;
let computerScore = 0;
let rounds;

const choices = {
    rock: "👊",
    paper: "👋",
    scissors: "✌️",
};


// Funciones de selección
function getRandomPick(array) {
  return Math.floor(Math.random() * array.length);
}

function getPlayerSelection(e) {
    const target = e.target;
    let choice;
    if (target.classList.contains("paper")) {
      choice = "paper";
    } else if (target.classList.contains("scissors")) {
      choice = "scissors";
    } else if (target.classList.contains("rock")) {
      choice = "rock";
    }
  
    return {
      key: choice,
      emoji: target.textContent
    };
  }


function getComputerChoice() {
    const keys = Object.keys(choices);
    const randomIndex = getRandomPick(keys); //Elija aleatoriamente una key de las disponibled
    const choice = keys[randomIndex]; // Y aca guardamos la clave elegida
    return {//Creamos otro objeto y lo retornamos
            key: choice, //En el cual la key, es ahora la key elegida al azar
            emoji: choices[choice], // y el emoji ess correspondiente a la clave seleccionada, estamos accediendo a la clave aleatoria dentro de choice que, contiene el emoji.
        };
    }

// Funciones de juego
function playRound(e) {
    if (playerScore < 5 && computerScore < 5) {
        let computerSelection = getComputerChoice()
        let playerSelection = getPlayerSelection(e);
        let result = whoWon(playerSelection.key, computerSelection.key);
        updateGame(result, playerSelection, computerSelection);
    }
  }

function whoWon(playerPick, computerPick) {
  let isTie = false;
  let win = false;
  let lost = false;

  if (
    (playerPick === "rock" && computerPick === "scissors") ||
    (playerPick === "scissors" && computerPick === "paper") ||
    (playerPick === "paper" && computerPick === "rock")
  ) {
    playerScore++;
    win = true;
  } else if (playerPick === computerPick) {
    isTie = true;
  } else {
    computerScore++;
    lost = true;
  }
  return { isTie, win, lost};
}


function updateGame(result, playerSelection, computerSelection) {
    toggleChoicesDisplay(true);
    playerChoiceText.textContent = playerSelection.emoji;
    computerChoiceText.textContent = computerSelection.emoji;
    updateScore(result.isTie, result.win, result.lost);
    rounds++;
  }


  function updateScore(itsTie, win, lost) {
    scoreP.textContent = playerScore;
    scoreC.textContent = computerScore;
    messages(itsTie, win, lost);
  }



  function restartGame() {
    if (rounds === 0) {
      messageBox.textContent = "You haven't played yet";
    } else {
      playerScore = 0;
      computerScore = 0;
      updateScore(false, false, false);
      messageBox.textContent = "Let's play again";
      rounds = 0;
      scoreC.textContent=""
      scoreP.textContent=""
      toggleChoicesDisplay(false);
    }
  }
  
// Funciones de interfaz
function toggleChoicesDisplay(show) {
  if (show) {
    playerChoiceBox.classList.add("show");
    computerChoiceBox.classList.add("show");
  } else {
    playerChoiceBox.classList.remove("show");
    computerChoiceBox.classList.remove("show");
  }
}

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getMessageType(isTie, win, lost) {
  if (isTie) {
    return "tieMessage";
  } else if (win) {
    if (playerScore === 5) {
      return "playerWins";
    } else if (playerScore >= 3) {
      return "playerScores3";
    } else {
      return "playerScores";
    }
  } else if (lost) {
    if (computerScore === 5) {
      return "computerWins";
    } else if (computerScore >= 3) {
      return "computerScores3";
    } else {
      return "computerScores";
    }
  }
}

function messages(isTie, win, lost) {
  const messageTypes = {
    playerScores: [
      "Great job! You scored a point. Keep up the good work!",
      "That's nice, keep going",
    ],
    playerScores3: [
        "Nice job! Just a couple more wins to go!",
        "You're doing great! Keep it up!",
      ],
      computerScores: [
        "Oops, the computer scored a point. Don't worry, you can still catch up!",
        "Too bad, give it another try",
      ],
      computerScores3: [
        "Don't give up! You can still make a comeback!",
        "Uh oh, looks like you need to step up your game!",
      ],
      tieMessage: [
        "It's a tie! Try again!",
        "You both chose the same! Let's see who wins the next round.",
      ],
      computerWins: [
        "Oh no! The computer has won this time. Better luck next time!",
        "The computer was victorious this round. Don't worry, you can always try again!",
      ],
      playerWins: [
        "Congratulations! You've won the game!",
        "Well done! You've beaten the computer!",
      ],
    };
  
    let messageType = getMessageType(isTie, win, lost);
    if (messageType) {
      message = getRandomMessage(messageTypes[messageType]);
      messageBox.textContent = message;
    }
  }
  
  // Funciones de eventos
 
  



  // Event listeners
  paper.addEventListener("click", playRound);
  rock.addEventListener("click", playRound);
  scissors.addEventListener("click", playRound);
  restart.addEventListener("click", restartGame);
  
  // Mensaje inicial
  messageBox.textContent = "Welcome to Rock Paper Scissors! Get ready to play!";