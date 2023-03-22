
function getComputerChoice(){
   //Le doy las opciones
   let choices=["rock", "paper", "scissors"];
    //Creo la selección aleatoria de un numero entre 0 y 2 para que genere el nuemero correspondiente a alguno de los indices de las opciones
    let randomPick =  Math.floor(Math.random()*choices.length);
    //Como funciona:
    /*  Math.random(): Esta función genera un número decimal aleatorio en el rango de 0 (inclusive) a 1 (exclusivo). Por ejemplo, podría generar un número como 0.5684 o 0.9321.

        Math.random() * 3: Luego, multiplicamos el número decimal aleatorio generado en el paso anterior por 3. Esto expande el rango de posibles números decimales a entre 0 (inclusive) y 3 (exclusivo). Por ejemplo, si el número generado en el paso anterior fue 0.5684, entonces 0.5684 * 3 = 1.7052.

        Math.floor(...): Finalmente, utilizamos la función Math.floor() para redondear hacia abajo el número decimal obtenido en el paso anterior al número entero más cercano. En nuestro ejemplo, Math.floor(1.7052) se redondea hacia abajo a 1.
    */ 
    let choice = choices[randomPick]
    return choice
}
let playerScore=0;
let computerScore=0;
let tiesScore=0;

function playRound(playerPick, computerPick){ 
  
    let playerwin=`You won ${playerPick} beats ${computerPick} `
    let computerwin= `You loose ${computerPick} beats ${playerPick} `
    let tie=`Its a draw ${playerPick} and ${computerPick} can't beat each other`

    if ((playerPick === "rock" && computerPick === "scissors") ||
    (playerPick === "scissors" && computerPick === "paper") ||
    (playerPick === "paper" && computerPick === "rock")) {
    console.log(playerwin);
    playerScore++;
    } else if (playerPick === computerPick) {
        console.log(tie);
        tiesScore++;
    } else if ((computerPick === "rock" && playerPick === "scissors") ||
            (computerPick === "scissors" && playerPick === "paper") ||
            (computerPick === "paper" && playerPick === "rock")) {
        console.log(computerwin);
        computerScore++;
}   else{
        alert(`Ingrese una opción válida`)
        return -1;
    }
    
}
function updateScore(playerScore, computerScore){
    let finalScore=`Player: ${playerScore} Computer Score:${computerScore} Ties:${tiesScore}`;
    if (playerScore > computerScore && playerScore > tiesScore){
        console.log(`You win, the final score is: ${finalScore} `)
    }else if(playerScore<computerScore && computerScore > tiesScore){
        console.log(`You lost, the final score is: ${finalScore}`)
    }else{
        console.log(`Its a draw this is the final score: ${finalScore}`)
    }
}


function game(){
    for (let i = 0; i < 5;) { 
        let userPick = prompt("Pick an option btw:rock/paper/scissors: ");
        userPick = userPick.toLowerCase(); 
        let computerPick = getComputerChoice()
        let result = playRound(userPick, computerPick);
        if (result !== -1) {
            i++;
        }
    } 
}





    game()
    updateScore()
