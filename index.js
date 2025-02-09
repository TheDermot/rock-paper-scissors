const welcomeScreen = document.querySelector(".welcome-screen");
const play = document.querySelector("#playBtn");
const knight = document.querySelector(".knight");
const necromancer = document.querySelector(".necromancer");

const knightTextBox = document.querySelector(".knight-text");
const necromancerTextBox = document.querySelector(".necromancer-text");
const attackBox = document.querySelector(".attacks");

play.addEventListener("click", () => {
  welcomeScreen.classList.remove("welcome-screen-entrance");
  welcomeScreen.classList.add("welcome-screen-hide");
  knight.classList.add("knight-entrance");

  setTimeout(() => {
    knightTextBox.classList.remove("hideItem");
    typeText(dialogues, () => {
      knightTextBox.classList.add("hideItem");
      necromancerTextBox.classList.add("hideItem");
      attackBox.classList.remove("hideItem");
    });

    setTimeout(() => {
      necromancer.classList.add("necromancer-entrance");

      setTimeout(() => {
        necromancerTextBox.classList.remove("hideItem");
      }, 3000);
    }, 1000);
  }, 3000);
});

const dialogues = [
  { speaker: "Knight", text: "Man, these are some nice trees" },
  { speaker: "Necromancer", text: "Who dare trespasses into my domain?" },
  // { speaker: "Knight", text: "What is a domain?" },
  // {
  //   speaker: "Necromancer",
  //   text: "Fool! None who enter leave alive. Wield your weapon now",
  // },
  // { speaker: "Knight", text: "Uhh....I don't have one." },
  // { speaker: "Knight", text: "Rock Paper Scissors?" },
  // { speaker: "Necromancer", text: "You dare insult me with childrens games." },
  // {
  //   speaker: "Knight",
  //   text: "Oh so you're just scared you'd lose to me in a childrens game",
  // },
  // {
  //   speaker: "Necromancer",
  //   text: "Silence, I was the master of Rock Paper Scissors in necromancy school.",
  // },
  // {
  //   speaker: "Knight",
  //   text: "Ooo, a master. Then we must play. First one to 3 wins. If I win you let me pass and I'll be on my merry way. If I lose, you may kill me",
  // },
  // {
  //   speaker: "Necromancer",
  //   text: "SSss, you intrique me human. Fine, I'll agree to these terms. Your death will be memorable",
  // },
  // { speaker: "Knight", text: "Ha, I'm sure it will be. Ok." },
  // { speaker: "Knight", text: "Rock" },
  // { speaker: "Knight", text: "Paper" },
  // { speaker: "Knight", text: "Scissors!" },
];

const knightTxt = document.querySelector(".knight-text p");
const necromancerTxt = document.querySelector(".necromancer-text p");

let dialogueIndex = 0;
let charIndex = 0;
let typingSpeed = 90;

const typeText = (dialogues, onComplete) => {
  let dialogueIndex = 0;
  let charIndex = 0;

  const type = () => {
    if (dialogueIndex >= dialogues.length) {
      if (onComplete) onComplete(); // Call the callback when dialogue ends
      return;
    }

    const currentDialogue = dialogues[dialogueIndex];
    const textBox =
      currentDialogue.speaker === "Knight" ? knightTxt : necromancerTxt;

    if (charIndex === 0) {
      textBox.textContent = "";
    }

    if (textBox.scrollHeight > textBox.clientHeight) {
      const lastSpaceIndex = textBox.textContent.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        const remainingText = textBox.textContent.slice(lastSpaceIndex + 1);
        textBox.textContent = remainingText;
      } else {
        textBox.textContent = "";
      }
    }

    if (charIndex < currentDialogue.text.length) {
      textBox.textContent += currentDialogue.text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      dialogueIndex++;
      charIndex = 0;

      if (dialogueIndex < dialogues.length) {
        setTimeout(type, 1000); // Pause before starting the next dialogue
      } else {
        if (onComplete) onComplete(); // Call the callback when dialogue ends
      }
    }
  };

  type(); // Start typing
};

const rock = "rock";
const paper = "paper";
const scissors = "scissors";

const attacks = document.querySelectorAll(".attacks div");
const startButton = document.querySelector(".attacks button");

let computerScore = 0;
let humanScore = 0;

const handleAttackChoice = (event) => {
  const humanChoice = event.target.classList[0]; // Gets "paper", "rock", or "scissors"
  console.log(`You chose: ${humanChoice}`);
  return humanChoice; // Return the choice
};

const getComputerChoice = () => {
  let computerChoice = Math.floor(Math.random() * 3) + 1;
  console.log(`Computer chose: ${computerChoice}`);
  if (computerChoice === 1) return rock;
  else if (computerChoice === 2) return paper;
  else if (computerChoice === 3) return scissors;
};

const tieDialogue = [{ speaker: "Knight", text: "Ha. We are Twins!!" }];

const playRound = (humanSelection, computerSelection) => {
  if (computerSelection === humanSelection) {
    console.log("Tie")
    knightTextBox.classList.remove("hideItem");
    typeText(tieDialogue, () => {
      setTimeout(() => {
        knightTextBox.classList.add("hideItem");
      }, 1000);
;
    });
  } else if (computerSelection === paper && humanSelection === rock) {
    console.log("Paper beats rock. Computer wins round");
    computerScore++;
    checkWinner(humanScore, computerScore);
  } else if (computerSelection === paper && humanSelection === scissors) {
    console.log("Scissors beats paper. Human wins round");
    humanScore++;
    checkWinner(humanScore, computerScore);
  } else if (computerSelection === rock && humanSelection === scissors) {
    console.log("Rock beats scissors. Computer wins round");
    computerScore++;
    checkWinner(humanScore, computerScore);
  } else if (computerSelection === rock && humanSelection === paper) {
    console.log("Paper beats rock. Human wins round");
    humanScore++;
    checkWinner(humanScore, computerScore);
  } else if (computerSelection === scissors && humanSelection === rock) {
    console.log("Rock beats scissors. Human wins round");
    humanScore++;
    checkWinner(humanScore, computerScore);
  } else if (computerSelection === scissors && humanSelection === paper) {
    console.log("Scissors beats paper. Computer wins round");
    computerScore++;
    checkWinner(humanScore, computerScore);
  }
};

const checkWinner = (humanScore, computerScore) => {
  if (computerScore === winsNeeded) {
    console.log(`Winner: Computer. Score: ${computerScore}`);
    endGame();
  } else if (humanScore === winsNeeded) {
    console.log(`Winner: Human. Score: ${humanScore}`);
    endGame();
  } else return;
};

const endGame = () => {
  attacks.forEach((attack) => {
    attack.removeEventListener("click", handleAttackClick);
  });
};

const winsNeeded = 3;

const handleAttackClick = (event) => {
  const humanChoice = handleAttackChoice(event);
  const computerChoice = getComputerChoice();
  if (computerScore < winsNeeded && humanScore < winsNeeded) {
    playRound(humanChoice, computerChoice);
    console.log(`Human: ${humanScore} , Computer: ${computerScore}`);
  } else {
  }
};

const playGame = (winsNeeded) => {
  attacks.forEach((attack) => {
    attack.addEventListener("click", handleAttackClick);
  });
};

startButton.addEventListener("click", () => {
  console.log("START");
  startButton.classList.add("hideItem");
  attacks.forEach((attack) => {
    attack.classList.remove("hideItem");
  });
  playGame(winsNeeded);
});
