const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_CPU_WINS = 'CPU_WINS';

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ''
  ).toUpperCase();

  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    return getPlayerChoice();
  }

  return selection;
};

const getCPUChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getResult = (cChoice, pChoice) => {
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice == ROCK && pChoice == PAPER) ||
      (cChoice == PAPER && pChoice == SCISSORS) ||
      (cChoice == SCISSORS && pChoice == ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_CPU_WINS;
};

// const getResult = (cChoice, pChoice) => {
//   if (cChoice === pChoice) {
//     return RESULT_DRAW;
//   } else if (
//     (cChoice === ROCK && pChoice === PAPER) ||
//     (cChoice === PAPER && pChoice === SCISSORS) ||
//     (cChoice === SCISSORS && pChoice === ROCK)
//   ) {
//     return RESULT_PLAYER_WINS;
//   } else {
//     return RESULT_CPU_WINS;
//   }
// };

startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return;
  }

  gameIsRunning = true;

  console.log('Game is starting...');

  const playerChoice = getPlayerChoice();
  const cpuChoice = getCPUChoice();
  const result = getResult(cpuChoice, playerChoice);

  let message = `You picked ${playerChoice}, computer picked ${cpuChoice}, therefore you `;
  if (result === RESULT_DRAW) {
    message += 'had a draw.';
  } else if (result === RESULT_PLAYER_WINS) {
    message += 'won.';
  } else {
    message += 'lost.';
  }

  console.log(message);
  alert(message);

  gameIsRunning = false;
});
