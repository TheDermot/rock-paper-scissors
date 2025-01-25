console.log('hello dad');

//3 string choices for game

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

//Scores

let computerScore = '0';
let humanScore = '0';

//rounds

const rounds = 5;

//choice func

const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * 3) + 1; //random number from 1 to 3
  if (choice === 1) return rock;
  else if (choice === 2) return paper;
  else if (choice === 3) return scissors;
};

const getHumanChoice = () => {
  let humanChoice = prompt('Rock(1), Paper(2), or Scissors(3)? Please enter the corresponding number.');
  if (humanChoice === '1') return rock;
  else if (humanChoice === '2') return paper;
  else if (humanChoice === '3') return scissors;
};

//function to play round
const playRound = () => {
  //set variable to human choice

  const humanSelection = getHumanChoice();
  console.log(humanSelection);

  //set variable to computer choice

  const computerSelection = getComputerChoice();
  console.log(computerSelection);

  //Determine winner or tie

  if (computerSelection === humanSelection) {
    console.log('Tie');
  } else if (computerSelection === paper && humanSelection === rock) {
    console.log('Paper beats rock. Computer wins round');
    return computerScore++;
  } else if (computerSelection === paper && humanSelection === scissors) {
    console.log('Scissors beats paper. Human wins round');
    return humanScore++;
  } else if (computerSelection === rock && humanSelection === scissors) {
    console.log('Rock beats scissors. Computer wins round');
    return computerScore++;
  } else if (computerSelection === rock && humanSelection === paper) {
    console.log('Paper beats rock. Human wins round');
    return humanScore++;
  } else if (computerSelection === scissors && humanSelection === rock) {
    console.log('Rock beats scissors. Human wins round');
    return humanScore++;
  } else if (computerSelection === scissors && humanSelection === paper) {
    console.log('Scissors beats paper. Computer wins round');
    return computerScore++;
  }
};

const playGame = rounds => {
  let round = 1;
  while (round <= rounds) {
    playRound();
    console.log(`Round ${round}: Human: ${humanScore} Computer: ${computerScore}`);
    round++;
  }
  console.log(`Game Over: Human: ${humanScore} Computer: ${computerScore}`);
};

playGame(rounds);
