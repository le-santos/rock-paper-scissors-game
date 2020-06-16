
let userTotalPoints = 0;
let computerTotalPoints = 0;
let roundWinner = '';
const maxGamePoints = 5;
const winnerCombinations = [
  { winner: 'paper', loser: 'rock' },
  { winner: 'rock', loser: 'scissors' },
  { winner: 'scissors', loser: 'paper' }
]

function computerRandomChoice() {
  let random = Math.random() * 10;

  if (random < 3.4) {
    return "rock";
  } else if (random < 6.7) {
    return "paper";
  } else {
    return "scissors"
  }
}

function getPlayerChoice(event) {
  if (event.target.textContent != "") {
    return document.getElementById(event.target.textContent).innerText
  }
}

function isWinnerCombination(winnerChoice, loserChoice) {
  return winnerCombinations.some(function(combination) {
    return combination.winner === winnerChoice && combination.loser === loserChoice
  })
}

function didAnyoneWin() {
  return userTotalPoints == maxGamePoints || computerTotalPoints == maxGamePoints
}

function newGame() {
  userTotalPoints = 0;
  computerTotalPoints = 0;
  roundWinner = '';
  document.getElementById("final-score").innerHTML = '';
  document.getElementById("final-score").style.display = "none";
  document.getElementById("result-message").innerHTML = '';
  document.getElementById("user-total-points").innerHTML = '';
  document.getElementById("computer-total-points").innerHTML = '';
  document.getElementById("span-max-game-points").textContent = maxGamePoints;
  document.getElementById("rock").disabled = false;
  document.getElementById("paper").disabled = false;
  document.getElementById("scissors").disabled = false;
}

function addWinnerPoint(winner) {
  if (winner === 'human') {
    userTotalPoints++
  } else if (winner === 'computer') {
    computerTotalPoints++
  }
}

function getRoundResult(humanPlayerChoice, computerPlayerChoice) {
  if (humanPlayerChoice == computerPlayerChoice) {
    roundWinner = ''
  } else if (isWinnerCombination(humanPlayerChoice, computerPlayerChoice)) {
    roundWinner = "human"
  } else {
    roundWinner = "computer"
  }
}

function getResultMessage(winner, human, computer) {
  if (winner === '') {
    return "Draw. No winner..."
  } else if (winner === 'human') {
    return "You win: " + human + " beats " + computer
  } else {
    return "You lose: " + computer + " beats " + human
  }
}

function didAnyoneWin() {
  return userTotalPoints == maxGamePoints || computerTotalPoints == maxGamePoints
}

function endGame() {
  document.getElementById("rock").disabled = true;
  document.getElementById("paper").disabled = true;
  document.getElementById("scissors").disabled = true;
}

function displayGameResult() {
  if (userTotalPoints == maxGamePoints) {
    document.getElementById("final-score").innerHTML = "You WIN!!";
    document.getElementById("final-score").style.display = "block";
    document.getElementById("final-score").style.backgroundColor = "lightseagreen";
  } else if (computerTotalPoints == maxGamePoints) {
    document.getElementById("final-score").innerHTML = "L-O-S-E-R!";
    document.getElementById("final-score").style.display = "block";
    document.getElementById("final-score").style.backgroundColor = "crimson";
  }
}

function playRound() {
  const humanPlayerChoice = getPlayerChoice(event)
  const computerPlayerChoice = computerRandomChoice()
  const roundResult = getRoundResult(humanPlayerChoice, computerPlayerChoice)
  const resultMessage = getResultMessage(roundWinner, humanPlayerChoice, computerPlayerChoice)
  
  addWinnerPoint(roundWinner)
  
  document.getElementById("result-message").innerHTML = resultMessage;
  document.getElementById("user-total-points").innerHTML = "You: " + userTotalPoints;
  document.getElementById("computer-total-points").innerHTML = "CPU: " + computerTotalPoints;

  if (didAnyoneWin()) {
    displayGameResult()
    endGame()
  }
}

window.addEventListener('load', newGame)

document.getElementById('rock').addEventListener("click", playRound);
document.getElementById("paper").addEventListener("click", playRound);
document.getElementById("scissors").addEventListener("click", playRound);
document.getElementById("new-game").addEventListener("click", newGame);

