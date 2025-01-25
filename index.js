console.log('hello dad');

//3 string choices for game

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

//Scores

let computerScore = '0';
let humanScore = '0';

const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * 3) + 1; //random number from 1 to 3
  if (choice === 1) return rock;
  else if (choice === 2) return paper;
  else if (choice === 3) return scissors;
};

//set variable to computer choice

const computerSelection = getComputerChoice();
console.log(getComputerChoice());

const getHumanChoice = () => {
  let humanChoice = prompt('Rock(1), Paper(2), or Scissors(3)? Please enter the corresponding number.');
  if (humanChoice === '1') return rock;
  else if (humanChoice === '2') return paper;
  else if (humanChoice === '3') return scissors;
};

//set variable to human choice

const humanSelection = getHumanChoice();
console.log(getHumanChoice());

//function to play round (best out of 3)
const playRound = () => {};
