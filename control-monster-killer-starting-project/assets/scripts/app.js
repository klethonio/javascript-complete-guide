const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAMER_OVER = 'GAME_OVER';

let battleLog = [];

function getMaxLifeValue(message = null) {
  
  const enteredValue = prompt(message || 'Maximum life for you and the monster:', '100');

  const parsedValue = parseInt(enteredValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    return getMaxLifeValue('Invalid user input: not a number');
  }

  return parsedValue;

  // code won't run, wasn't commented for readability (it's a course, come on!)
  // the code above doesn't throw an error but does the same thing.
  
  // let parsedValue; // this line needs to be uncommented for the code bellow to work

  try {
    const enteredValue = prompt(message || 'Maximum life for you and the monster:', '100');
    
    parsedValue = parseInt(enteredValue);
  
    if (isNaN(parsedValue) || parsedValue <= 0) {
      throw {message: 'Invalid user input: not a number'}
    }
  } catch (error) {
    return getMaxLifeValue(error.message);
  }

  return parsedValue;
}

const chosenMaxLife = getMaxLifeValue();

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:    
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    
    case LOG_EVENT_MONSTER_ATTACK:
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
      
    default:
      return;
  }

  // if (event === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = 'PLAYER';
  // } else if (event !== LOG_EVENT_GAMER_OVER) {
  //   return;
  // }

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);

  currentPlayerHealth -= playerDamage;

  writeToLog(
    LOG_EVENT_PLAYER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;

    removeBonusLife();

    currentPlayerHealth = initialPlayerHealth;

    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead, but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    writeToLog(
      LOG_EVENT_GAMER_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
    writeToLog(
      LOG_EVENT_GAMER_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAMER_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
    alert('You have a draw!');
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;

  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode == MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  } else {
    return;
  }

  const damage = dealMonsterDamage(maxDamage);

  currentMonsterHealth -= damage;

  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackHadler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHadler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHadler() {
  let healValue;

  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);

  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

let lastLoggedEntry;

function printLogHadler() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }

  // not the best way to do it, just to show the for statement
  let i = 0;
  for (const logEntry of battleLog) {
    if (lastLoggedEntry === undefined || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++
  }

  // prints everything
  // let i = 0;
  // for (const logEntry of battleLog) {
  //   console.log(`#${i++}`);
  //   for (const key in logEntry) {
  //     console.log(`${key}: ${logEntry[key]}`);
  //   }
  // }
}

attackBtn.addEventListener('click', attackHadler);
strongAttackBtn.addEventListener('click', strongAttackHadler);
healBtn.addEventListener('click', healPlayerHadler);
logBtn.addEventListener('click', printLogHadler);
