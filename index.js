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
// const necromancerTxt = document.querySelector(".necromancer-text p");

let dialogueIndex = 0;
let charIndex = 0;
let typingSpeed = 90;

const typeText = (dialogues, onComplete) => {
  let dialogueIndex = 0;
  let charIndex = 0;

  const speakers = new Set();
  dialogues.forEach((dialogue) => {
    speakers.add(dialogue.speaker.toLowerCase());
  });

  console.log(speakers);

  const type = () => {
    let textBox = "";
    const currentDialogue = dialogues[dialogueIndex];
    if (currentDialogue.speaker === "Knight") textBox = knightTxt;
    else
      textBox = document.querySelector(
        `.${currentDialogue.speaker.toLowerCase()}-text p`
      );

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
        console.log(dialogueIndex, dialogues.length);
        console.log("timeout type");
        setTimeout(type, 1000); // Pause before starting the next dialogue
      } else {
        console.log("ccccc");
        speakers.forEach((speaker) => {
          let removeTextBox = document.querySelector(`.${speaker}-text`);
          setTimeout(() => {
            removeTextBox.classList.add("hideItem");
          }, 1000);
        });
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

// Define dialogues for different enemies
const tieDialogues = {
  Knight: [{ speaker: "Knight", text: "Ha. We are Twins!!" }],
  Necromancer: [{ speaker: "Necromancer", text: "A tie? How dull." }],
  // Add more enemies here
};

const winDialogues = {
  Knight: [{ speaker: "Knight", text: "I win this round!" }],
  Necromancer: [{ speaker: "Necromancer", text: "Your death is imminent" }],
  // Add more enemies here
};

const loseDialogues = {
  Knight: [{ speaker: "Knight", text: "I'll get you next time!" }],
  Necromancer: [{ speaker: "Necromancer", text: "Ah, you damn knight" }],
  // Add more enemies here
};

const playRound = (humanSelection, computerSelection, enemy) => {
  // Dynamically reference the enemy's text box
  const enemyTextBox = document.querySelector(`.${enemy.toLowerCase()}-text`);
  const enemyTxt = document.querySelector(`.${enemy.toLowerCase()}-text p`);

  //hide attack items, have it say ROCK PAPER SCISSORS SHOOT
  disableAttacks();
  setTimeout(() => {
    attackBox.textContent = "ROCK";
    setTimeout(() => {
      attackBox.textContent = "PAPER";
      setTimeout(() => {
        attackBox.textContent = "SCISSORS";
        setTimeout(() => {
          attackBox.textContent = "SHOOT";
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);

  //hide attack box
  attackBox.classList.add("hideItem");
  //show selection made with icons

  console.log(humanSelection, computerSelection);
  const knightAttackIcon = document.createElement("div");
  const computerAttackIcon = document.createElement("div");

  knightAttackIcon.classList.add(`${humanSelection}-attack`, `knight-attack-position`);
  knightTextBox.insertAdjacentElement("afterend", knightAttackIcon);

  computerAttackIcon.classList.add(`${computerSelection}-attack`, `${enemy.toLowerCase()}-attack-position`);
  enemyTextBox.insertAdjacentElement("afterend", computerAttackIcon);
  return;
  //dialogue

  if (computerSelection === humanSelection) {
    console.log("Tie");
    disableAttacks();
    knightTextBox.classList.remove("hideItem"); // Show Knight's text box for tie
    typeText(tieDialogues.Knight, () => {
      // Use Knight's tie dialogue
      setTimeout(() => {
        enableAttacks();
      }, 1000);
    });
  } else if (computerSelection === paper && humanSelection === rock) {
    console.log("Paper beats rock. Computer wins round");
    disableAttacks();
    computerScore++;
    enemyTextBox.classList.remove("hideItem"); // Show enemy's text box
    typeText(winDialogues[enemy], () => {
      // Use enemy's lose dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  } else if (computerSelection === paper && humanSelection === scissors) {
    console.log("Scissors beats paper. Human wins round");
    disableAttacks();
    humanScore++;
    knightTextBox.classList.remove("hideItem"); // Show Knight's text box
    typeText(winDialogues.Knight, () => {
      // Use Knight's win dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  } else if (computerSelection === rock && humanSelection === scissors) {
    console.log("Rock beats scissors. Computer wins round");
    disableAttacks();
    computerScore++;
    enemyTextBox.classList.remove("hideItem"); // Show enemy's text box
    typeText(winDialogues[enemy], () => {
      // Use enemy's lose dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  } else if (computerSelection === rock && humanSelection === paper) {
    console.log("Paper beats rock. Human wins round");
    disableAttacks();
    humanScore++;
    knightTextBox.classList.remove("hideItem"); // Show Knight's text box
    typeText(winDialogues.Knight, () => {
      // Use Knight's win dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  } else if (computerSelection === scissors && humanSelection === rock) {
    console.log("Rock beats scissors. Human wins round");
    disableAttacks();
    humanScore++;
    knightTextBox.classList.remove("hideItem"); // Show Knight's text box
    typeText(winDialogues.Knight, () => {
      // Use Knight's win dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  } else if (computerSelection === scissors && humanSelection === paper) {
    console.log("Scissors beats paper. Computer wins round");
    disableAttacks();
    computerScore++;
    enemyTextBox.classList.remove("hideItem"); // Show enemy's text box
    typeText(winDialogues[enemy], () => {
      // Use enemy's lose dialogue
      setTimeout(() => {
        enableAttacks();
        checkWinner(humanScore, computerScore, enemy);
      }, 1000);
    });
  }
};

const checkWinner = (humanScore, computerScore, enemy) => {
  if (computerScore === winsNeeded) {
    console.log(`Winner: ${enemy}. Score: ${computerScore}`);
    let winner = enemy.toLowerCase();
    endGame(winner);
  } else if (humanScore === winsNeeded) {
    console.log(`Winner: Knight. Score: ${humanScore}`);
    let winner = "knight";
    endGame(winner);
  } else return;
};

const disableAttacks = () => {
  attacks.forEach((attack) => {
    attack.removeEventListener("click", handleAttackClick);
    attack.classList.add("hideItem");
  });
};
const enableAttacks = () => {
  attacks.forEach((attack) => {
    attack.addEventListener("click", handleAttackClick);
    attack.classList.remove("hideItem");
  });
};

const endingKnightDialogue = [
  { speaker: "Knight", text: "AHHHH you are deeeeeeead socuk" },
];
const endingNecromancerDialogue = [
  { speaker: "Necromancer", text: "Boom shacka lacka" },
];

const endGame = (winner) => {
  disableAttacks();
  attackBox.classList.add("hideItem");
  if (winner === "necromancer") {
    necromancerTextBox.classList.remove("hideItem");
    console.log(endingNecromancerDialogue);
    typeText(endingNecromancerDialogue, () => {
      console.log("Necro");
    });
  } else {
    console.log(endingKnightDialogue);
    knightTextBox.classList.remove("hideItem");
    typeText(endingKnightDialogue, () => {
      console.log("knight");
    });
  }
};

const winsNeeded = 1;

const handleAttackClick = (enemy, event) => {
  console.log(enemy);
  const humanChoice = handleAttackChoice(event);
  const computerChoice = getComputerChoice();
  if (computerScore < winsNeeded && humanScore < winsNeeded) {
    playRound(humanChoice, computerChoice, enemy);
    console.log(`Knight: ${humanScore} , ${enemy}: ${computerScore}`);
  }
};

const enemies = ["Necromancer"]; //hold enemy names
let enemyNum = -1;

startButton.addEventListener("click", () => {
  enemyNum++;

  console.log("START");
  startButton.classList.add("hideItem");
  console.log(enemies, enemies[enemyNum]);
  attacks.forEach((attack) => {
    attack.classList.remove("hideItem");
    attack.addEventListener("click", (event) => {
      handleAttackClick(enemies[enemyNum], event);
    });
  });
});
