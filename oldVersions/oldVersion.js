//GETTING ELEMENTS FROM THE DOM
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const restart = document.querySelector(".restart")
const scoreP= document.querySelector(".scoreP")
const scoreC= document.querySelector(".scoreC")
const messageBox = document.querySelector(".message")
const computerChoiceBox = document.querySelector(".computer-choice")
const playerChoiceBox = document.querySelector(".player-choice")
const playerChoiceText = document.querySelector(".player-choice-text");
const computerChoiceText = document.querySelector(".computer-choice-text");


//Random Pick
    function getRandomPick(array) {
        randomPick = Math.floor(Math.random()*array.length);
        return randomPick;
    }
    

//STARTING VARIABLES
let playerScore = 0;
let computerScore = 0;
let rounds = 0;
let started = false

const choices = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️",
};

//GETTING PLAYER CHOICE
function getPlayerSelection(e){
    let playerSelection;
    target = e.target
    if (target.classList.contains("paper")){
         playerSelection = "paper";
    }else if (target.classList.contains("scissors")){
         playerSelection = "scissors";
    }else if(target.classList.contains("rock")){
         playerSelection = "rock";
    }
    return playerSelection;
}
//GETTING COMPUTER CHOICE
function getComputerChoice(){
    const keys = Object.keys(choices)
     let choice = keys[getRandomPick(keys)]
     console.log[choices[choice]]
 }

//Hiding choices

function displayingChoices(){
    if (started){
        playerChoiceBox.classList.add("show")
        computerChoiceBox.classList.add("show")
    }else{
        playerChoiceBox.classList.remove("show")
        computerChoiceBox.classList.remove("show")
    }
}

//Round
function playRound(e){ 
    let playerPick = getPlayerSelection(e);
    let computerPick = getComputerChoice();
    started = true;
    displayingChoices()
    if(playerScore < 5 && computerScore <5){
        playerChoiceText.textContent = playerPick.toUpperCase();
        computerChoiceText.textContent = computerPick.toUpperCase();
        let result = whoWon(playerPick, computerPick);
        updateScore(playerScore, computerScore, result.isTie, result.win, result.lost);
        rounds++;         
    }    
}
       
//Who won
function whoWon(playerPick,computerPick){
    let isTie = false
    let win= false
    let lost=false
    //Player wins
    if ((playerPick === "rock" && computerPick === "scissors") ||
    (playerPick === "scissors" && computerPick === "paper") ||
    (playerPick === "paper" && computerPick === "rock")) {
        playerScore++;
        win=true;
     } else if (playerPick === computerPick) {
        isTie = true
    //COMPUTER WIN
    } else if ((computerPick === "rock" && playerPick === "scissors") ||
            (computerPick === "scissors" && playerPick === "paper") ||
            (computerPick === "paper" && playerPick === "rock")) {
        computerScore++;
        lost=true
    }  
    return { isTie, win, lost }
}




//Update score
function updateScore(playerScore, computerScore, itsTie, win, lost){
    scoreP.textContent = playerScore; 
    scoreC.textContent = computerScore;
    messages(itsTie, win, lost)
}

//Messages

//Get message

function messages(isTie,win, lost) {
    const messageTypes = {
        playerScores: ["Great job! You scored a point. Keep up the good work!", "That's nice, keep going"],
        playerScores3: ["Nice job! Just a couple more wins to go!", "You're doing great! Keep it up!"],
        computerScores: ["Oops, the computer scored a point. Don't worry, you can still catch up!", "Too bad, give it another try"],
        computerScores3: ["Don't give up! You can still make a comeback!", "Uh oh, looks like you need to step up your game!"],
        tieMessage: ["It's a tie! Try again!", "You both chose the same! Let's see who wins the next round."],
        computerWins: ["Oh no! The computer has won this time. Better luck next time!", "The computer was victorious this round. Don't worry, you can always try again!"],
        playerWins: ["Congratulations! You've won the game!", "Well done! You've beaten the computer!"]
    };

    let messageType = getMessageType(isTie, win, lost)
    if(messageType){
        message = messageTypes[messageType][getRandomPick(messageTypes[messageType])];
        messageBox.textContent = message;
    }
}
function getMessageType(isTie, win, lost){
    if (isTie) {
        return  'tieMessage';
    }else if (win) {
    
        if (playerScore ===5){
            return "playerWins"
        }else if (playerScore >= 3) {
            return  'playerScores3';
        }else{
           return 'playerScores';
        }
    } else if (lost) {
        if (computerScore ===5){
            return "computerWins"

        }else if (computerScore >=3) {
            return  'computerScores3'; 
         }else{
          return 'computerScores'
        }
    }
}

//Restart Game
function restartGame(){
    if (rounds === 0){ 
        messageBox.textContent="You haven't played yet"
    }else{
        started = false
        playerScore = 0
        computerScore = 0
        tiesScore = 0
        updateScore(playerScore, computerScore)
        messageBox.textContent="Let's play again"
        rounds = 0
        scoreC.textContent=""
        scoreP.textContent=""
        displayingChoices()
    }
}




paper.addEventListener("click", playRound)
rock.addEventListener("click", playRound)
scissors.addEventListener("click", playRound)
restart.addEventListener("click", restartGame)

messageBox.textContent="Welcome to Rock Paper Scissors! Get ready to play!"

