console.log('hello dad');

//3 string choices for game

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

//Scores

let computerScore = 0;
let humanScore = 0;

//number of rounds to play

const rounds = 5;

//functions

const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * 3) + 1; //random number from 1 to 3
  if (choice === 1) return rock;
  else if (choice === 2) return paper;
  else if (choice === 3) return scissors;
};

const getHumanChoice = () => {
  let humanChoice = prompt(
    'Rock(1), Paper(2), or Scissors(3)? Please enter the corresponding number.'
  );
  if (humanChoice === '1') return rock;
  else if (humanChoice === '2') return paper;
  else if (humanChoice === '3') return scissors;
  else {
    alert(
      'Invalid input. Please enter 1 for Rock, 2 for Paper, or 3 for Scissors.'
    );
    return getHumanChoice(); // Retrys input if invalid
  }
};

const playRound = () => {
  const humanSelection = getHumanChoice();
  console.log(humanSelection);

  const computerSelection = getComputerChoice();
  console.log(computerSelection);

  //Determine winner or tie though else if statements and then iterates score

  if (computerSelection === humanSelection) {
    console.log('Tie');
  } else if (computerSelection === paper && humanSelection === rock) {
    console.log('Paper beats rock. Computer wins round');
    computerScore++;
  } else if (computerSelection === paper && humanSelection === scissors) {
    console.log('Scissors beats paper. Human wins round');
    humanScore++;
  } else if (computerSelection === rock && humanSelection === scissors) {
    console.log('Rock beats scissors. Computer wins round');
    computerScore++;
  } else if (computerSelection === rock && humanSelection === paper) {
    console.log('Paper beats rock. Human wins round');
    humanScore++;
  } else if (computerSelection === scissors && humanSelection === rock) {
    console.log('Rock beats scissors. Human wins round');
    humanScore++;
  } else if (computerSelection === scissors && humanSelection === paper) {
    console.log('Scissors beats paper. Computer wins round');
    computerScore++;
  }
};

const wannaPlay = () => {
  let playChoice = prompt('Do you want to play? Enter 1 for YES or 2 for NO');
  if (playChoice === '1') return true;
  else if (playChoice === '2') return false;
  else {
    alert('Invalid Entry, Please refresh to try again');
    return wannaPlay(); // Retrys input if invalid
  }
};

//First checks if user wants to play then loops 5 rounds
const playGame = rounds => {
  let playChoice = wannaPlay();
  if (!playChoice) return;
  let round = 1;
  while (round <= rounds) {
    playRound();
    console.log(
      `Round ${round}: Human: ${humanScore} Computer: ${computerScore}`
    );
    round++;
  }
  console.log(`Game Over: Human: ${humanScore} Computer: ${computerScore}`);
};

playGame(rounds);
