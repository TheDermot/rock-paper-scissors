//3 string choices for game

const rock = "rock";
const paper = "paper";
const scissors = "scissors";

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
    "Rock(1), Paper(2), or Scissors(3)? Please enter the corresponding number."
  );
  if (humanChoice === "1") return rock;
  else if (humanChoice === "2") return paper;
  else if (humanChoice === "3") return scissors;
  else {
    alert(
      "Invalid input. Please enter 1 for Rock, 2 for Paper, or 3 for Scissors."
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
    console.log("Tie");
  } else if (computerSelection === paper && humanSelection === rock) {
    console.log("Paper beats rock. Computer wins round");
    computerScore++;
  } else if (computerSelection === paper && humanSelection === scissors) {
    console.log("Scissors beats paper. Human wins round");
    humanScore++;
  } else if (computerSelection === rock && humanSelection === scissors) {
    console.log("Rock beats scissors. Computer wins round");
    computerScore++;
  } else if (computerSelection === rock && humanSelection === paper) {
    console.log("Paper beats rock. Human wins round");
    humanScore++;
  } else if (computerSelection === scissors && humanSelection === rock) {
    console.log("Rock beats scissors. Human wins round");
    humanScore++;
  } else if (computerSelection === scissors && humanSelection === paper) {
    console.log("Scissors beats paper. Computer wins round");
    computerScore++;
  }
};

const wannaPlay = () => {
  let playChoice = prompt("Do you want to play? Enter 1 for YES or 2 for NO");
  if (playChoice === "1") return true;
  else if (playChoice === "2") return false;
  else {
    alert("Invalid Entry, Please refresh to try again");
    return wannaPlay(); // Retrys input if invalid
  }
};

//First checks if user wants to play then loops 5 rounds
// const playGame = rounds => {
//   let playChoice = wannaPlay();
//   if (!playChoice) return;
//   let round = 1;
//   while (round <= rounds) {
//     playRound();
//     console.log(
//       `Round ${round}: Human: ${humanScore} Computer: ${computerScore}`
//     );
//     round++;
//   }
//   console.log(`Game Over: Human: ${humanScore} Computer: ${computerScore}`);
// };

// playGame(rounds);

//Dom Man

const welcomeScreen = document.querySelector(".welcome-screen");
console.log(welcomeScreen);
const play = document.querySelector("#playBtn");
const knight = document.querySelector(".knight");
const necromancer = document.querySelector(".necromancer");

const knightText = document.querySelector(".knight-text");
const necromancerText = document.querySelector(".necromancer-text");

play.addEventListener("click", () => {
  console.log("e");
  welcomeScreen.classList.remove("welcome-screen-entrance");
  welcomeScreen.classList.add("welcome-screen-hide");
  knight.classList.add("knight-entrance");

  // First timeout: 2 seconds
  setTimeout(() => {
    knightText.classList.remove("hideItem");
    startNextDialogue(); // Start the dialogue

    // Second timeout: 2 seconds after the first (total 4 seconds)
    setTimeout(() => {
      necromancer.classList.add("necromancer-entrance");

      // Third timeout: 0 seconds after the second (total 4 seconds)
      setTimeout(() => {
        necromancerText.classList.remove("hideItem");
      }, 2000);
    }, 1000);
  }, 3000);
});

//dialogue

const dialogues = [
  {
    speaker: "Knight",
    text: "Man, these are some nice trees",
  },
  { speaker: "Necromancer", text: "Who dare trespasses into my domain?" },
  { speaker: "Knight", text: "What is a domain?" },
  {
    speaker: "Necromancer",
    text: "Fool! None who enter leave alive. Wield your weapon now",
  },
  { speaker: "Knight", text: "Uhh....I don't have one." },
  { speaker: "Knight", text: "Rock Paper Scissors?" },
  { speaker: "Necromancer", text: "You dare insult me with childrens games." },
  {
    speaker: "Knight",
    text: "Oh so you're just scared you'd lose to me in a childrens game",
  },
  {
    speaker: "Necromancer",
    text: "Silence, I was the master of Rock Paper Scissors in necromancy school.",
  },
  {
    speaker: "Knight",
    text: "Ooo, a master. Then we must play. 3 rounds. If I win you let me pass and I'll be on my merry way. If I lose, you may kill me",
  },
  {
    speaker: "Necromancer",
    text: "SSss, you intrique me human. Fine, I'll agree to these terms. Your death will be memorable",
  },
  { speaker: "Knight", text: "Ha, I'm sure it will be. Ok." },
  { speaker: "Knight", text: "Rock" },
  { speaker: "Knight", text: "Paper" },
  { speaker: "Knight", text: "Scissors!" },
];

const knightTextBox = document.querySelector(".knight-text p");
const necromancerTextBox = document.querySelector(".necromancer-text p");

let dialogueIndex = 0;
let charIndex = 0;
let typingSpeed = 60; //50ms paause between each char
let isTyping = false;

//typewriter like typing, uses recursion w SetTimeout to loop until nomore char are left
//secpmd setTimeout calls the function again to move to next dialogue

const typeText = () => {
  if (dialogueIndex >= dialogues.length) return;
  const currentDialogue = dialogues[dialogueIndex];
  if (currentDialogue.speaker === "Knight") {
    textBox = knightTextBox;
  } else {
    textBox = necromancerTextBox;
  }

  if (charIndex === 0) {
    textBox.textContent = "";
  }
  // Check if the text box has overflowed vertically
  if (textBox.scrollHeight > textBox.clientHeight) {
    // Find the last space in the text to avoid splitting words
    const lastSpaceIndex = textBox.textContent.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      // Save the remaining text (after the last space)
      const remainingText = textBox.textContent.slice(lastSpaceIndex + 1);

      // Clear the text box and add the remaining text
      textBox.textContent = remainingText;
    } else {
      // If there's no space (e.g., a very long word), clear the text box
      textBox.textContent = "";
    }
  }

  if (charIndex < currentDialogue.text.length) {
    textBox.textContent += currentDialogue.text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    isTyping = false;
    dialogueIndex++;
    charIndex = 0;

    if (dialogueIndex < dialogues.length) {
      setTimeout(startNextDialogue, 1000);
    }
  }
};

const startNextDialogue = () => {
  if (!isTyping) {
    isTyping = true;
    typeText();
  }
};

// knight.addEventListener("animationend", () => {
//   startNextDialogue();
//   necromancer.classList.add("necromancer-entrance");
// });
