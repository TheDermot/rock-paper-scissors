const welcomeScreen = document.querySelector(".welcome-screen");
const play = document.querySelector("#playBtn");
const knight = document.querySelector(".knight");
const necromancer = document.querySelector(".necromancer");

const knightTextBox = document.querySelector(".knight-text");
const necromancerTextBox = document.querySelector(".necromancer-text");
const attackBox = document.querySelector(".attacks");

const checkOrientation = () => {
  const rotateMessage = document.getElementById("rotate-message");
  const container = document.querySelector(".container");

  if (window.innerHeight > window.innerWidth) {
    // Portrait mode
    rotateMessage.classList.remove("hideItem");
    container.classList.add("hideItem");
  } else {
    // Landscape mode
    rotateMessage.classList.add("hideItem");
    container.classList.remove("hideItem");
  }
};

// Check orientation on load and resize
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

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
    text: "Ooo, a master. Then we must play. First one to 3 wins. If I win you let me pass and I'll be on my merry way. If I lose, you may kill me",
  },
  {
    speaker: "Necromancer",
    text: "SSss, you intrique me human. Fine, I'll agree to these terms. Your death will be memorable",
  },
  { speaker: "Knight", text: "Ha, I'm sure it will be. Ok." },
];

const knightTxt = document.querySelector(".knight-text p");
// const necromancerTxt = document.querySelector(".necromancer-text p");
let enemyTxt = "";

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
    else {
      enemyTxt = document.querySelector(
        `.${currentDialogue.speaker.toLowerCase()}-text p`
      );
      textBox = enemyTxt;
    }

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
        if (onComplete) {
          knightTxt.textContent = "";
          enemyTxt.textContent = "";
          onComplete();
        } // Call the callback when dialogue ends
      }
    }
  };

  type(); // Start typing
};



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
  if (computerChoice === 1) return "rock";
  else if (computerChoice === 2) return "paper";
  else if (computerChoice === 3) return "scissors";
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

//could make it a promise and do a loop with setTimeout

const animateCountdown = () => {
  return new Promise((resolve) => {
    disableAttacks();
    let countdownDiv = document.createElement("div");
    countdownDiv.classList.add("display-countdown");
    attackBox.append(countdownDiv);
    setTimeout(() => {
      countdownDiv.textContent = "ROCK";
      setTimeout(() => {
        countdownDiv.textContent = "PAPER";
        setTimeout(() => {
          countdownDiv.textContent = "SCISSORS";
          setTimeout(() => {
            countdownDiv.textContent = "SHOOT";
            setTimeout(() => {
              countdownDiv.textContent = "";
              countdownDiv.remove();
              attackBox.classList.add("hideItem");
              resolve(); // Resolve the promise after the countdown
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    });
  });
};

const displayAttackIcons = (humanSelection, computerSelection, enemy) => {
  return new Promise((resolve) => {
    const enemyTextBox = document.querySelector(`.${enemy.toLowerCase()}-text`);
    const knightAttackIcon = document.createElement("div");
    const computerAttackIcon = document.createElement("div");

    knightAttackIcon.classList.add(
      `${humanSelection}-attack`,
      `knight-attack-position`
    );
    knightTextBox.insertAdjacentElement("afterend", knightAttackIcon);

    computerAttackIcon.classList.add(
      `${computerSelection}-attack`,
      `${enemy.toLowerCase()}-attack-position`
    );
    enemyTextBox.insertAdjacentElement("afterend", computerAttackIcon);

    setTimeout(() => {
      knightAttackIcon.remove();
      computerAttackIcon.remove();
      resolve(); // Resolve the promise after icons are removed
    }, 3000);
  });
};

const knightScoreDisplay = document.querySelector(".knight-score");
const enemyScoreDisplay = document.querySelector(".enemy-score");

const updateScoreDisplay = () => {
  knightScoreDisplay.textContent = `${humanScore}`;
  enemyScoreDisplay.textContent = `${computerScore}`;
};
const CHOICES = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors",
};

const OUTCOMES = {
  TIE: "tie",
  COMPUTER: "computer",
  HUMAN: "human",
};

const WINNING_RULES = {
  [CHOICES.ROCK]: CHOICES.SCISSORS, // Rock beats Scissors
  [CHOICES.PAPER]: CHOICES.ROCK, // Paper beats Rock
  [CHOICES.SCISSORS]: CHOICES.PAPER, // Scissors beats Paper
};
const determineOutcome = (humanSelection, computerSelection) => {
  const validChoices = Object.values(CHOICES);
  if (
    !validChoices.includes(humanSelection) ||
    !validChoices.includes(computerSelection)
  ) {
    throw new Error("Invalid selection");
  }

  if (humanSelection === computerSelection) {
    return OUTCOMES.TIE;
  }
  if (WINNING_RULES[humanSelection] === computerSelection) {
    return OUTCOMES.HUMAN;
  }
  return OUTCOMES.COMPUTER;
};
const playRound = async (humanSelection, computerSelection, enemy) => {
  const enemyTextBox = document.querySelector(`.${enemy.toLowerCase()}-text`);

  // Hide attack items and show countdown
  await animateCountdown();

  // Display attack icons
  await displayAttackIcons(humanSelection, computerSelection, enemy);

  // Determine the outcome
  const outcome = determineOutcome(humanSelection, computerSelection);

  // Handle the outcome
  switch (outcome) {
    case OUTCOMES.TIE:
      console.log("Tie");
      disableAttacks();
      knightTextBox.classList.remove("hideItem");
      typeText(tieDialogues.Knight, () => {
        setTimeout(() => {
          checkWinner(humanScore, computerScore, enemy);
        }, 1000);
      });
      break;

    case OUTCOMES.HUMAN:
      console.log("Human wins round");
      disableAttacks();
      humanScore++;
      updateScoreDisplay();
      knightTextBox.classList.remove("hideItem");
      typeText(winDialogues.Knight, () => {
        setTimeout(() => {
          checkWinner(humanScore, computerScore, enemy);
        }, 1000);
      });
      break;

    case OUTCOMES.COMPUTER:
      console.log("Computer wins round");
      disableAttacks();
      computerScore++;
      updateScoreDisplay();
      enemyTextBox.classList.remove("hideItem");
      typeText(winDialogues[enemy], () => {
        setTimeout(() => {
          checkWinner(humanScore, computerScore, enemy); 
        }, 1000);
      });
      break;

    default:
      throw new Error("Invalid outcome");
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
  } else {
    attackBox.classList.remove("hideItem");
    enableAttacks();
    return;
  }
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
  { speaker: "Knight", text: "Ha I win. You lost, your domain is mine now" },
  {
    speaker: "Necromancer",
    text: "What foolishness go now before I curse you",
  },
  {
    speaker: "Knight",
    text: "I'm not joking. Everyone knows when you lose a game of Rock, Paper, Scissors that you fortfiet your domain",
  },
  {
    speaker: "Necromancer",
    text: "WHAT! Your sniveling tongue shall now lead to your death",
  },
  {
    speaker: "Knight",
    text: "Leave now before my domain crushes you",
  },
  {
    speaker: "Necromancer",
    text: "Dieeeea",
  },
];
const endingKnightDialogueTwo = [
  { speaker: "Knight", text: "That won't work on me" },
  {
    speaker: "Necromancer",
    text: "No no no What is happening AHHHHhhh",
  },
];
const endingNecromancerDialogue = [
  {
    speaker: "Necromancer",
    text: "You may die now",
  },
  { speaker: "Knight", text: "Not if I have anything to say about it!" },
  { speaker: "Necromancer", text: "You cannot stop me!" },
  { speaker: "Knight", text: "We'll see about that." },
  { speaker: "Necromancer", text: "Dieeee" },
];

const endGame = (winner) => {
  disableAttacks();
  attackBox.classList.add("hideItem");
  knightScoreDisplay.classList.add("hideItem");
  knightScoreDisplay.textContent = "0";
  enemyScoreDisplay.classList.add("hideItem");
  enemyScoreDisplay.textContent = "0";

  if (winner === "necromancer") {
    knightTextBox.classList.remove("hideItem");
    necromancerTextBox.classList.remove("hideItem");
    typeText(endingNecromancerDialogue, () => {
      console.log("Necro");
      setTimeout(() => {
        necromancer.classList.add("necro-attack");
        setTimeout(() => {
          knight.classList.add("knight-hurt");
          setTimeout(() => {
            knight.classList.add("knight-die");
          });
        }, 1000);
      }, 1000);
    });
  } else {
    knightTextBox.classList.remove("hideItem");
    necromancerTextBox.classList.remove("hideItem");
    typeText(endingKnightDialogue, () => {
      console.log("knight");

      // Trigger animations after the dialogue
      setTimeout(() => {
        // Necromancer attack Knight
        necromancer.classList.add("necro-attack");
        knight.classList.add("knight-grow");

        // After, Necromancer gets hurt and dies
        setTimeout(() => {
          necromancer.classList.add("necro-hurt");
          setTimeout(() => {
            necromancer.classList.add("necro-death");
            typeText(endingKnightDialogueTwo, () => {
              console.log("part 2");
            });
          }, 3000);
        }, 1000);
      }, 1000); // Delay before starting animations
    });
  }
};

const winsNeeded = 3;

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
  knightScoreDisplay.classList.remove("hideItem");
  enemyScoreDisplay.classList.remove("hideItem");
  console.log(enemies, enemies[enemyNum]);
  attacks.forEach((attack) => {
    attack.classList.remove("hideItem");
    attack.addEventListener("click", (event) => {
      handleAttackClick(enemies[enemyNum], event);
    });
  });
});
