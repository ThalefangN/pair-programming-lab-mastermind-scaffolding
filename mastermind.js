// Tlhalefang Ntshilane && Topo Morolong
// https://jsdoc.app

/**
 * @function checkGuess
 * Compares a guess against the solution in the "mastermind" game.
 *
 * @param {string} guess - The guessed string.
 * @param {string} solution - The correct solution string.
 * @returns {string} A string in the format "x-y", where:
 *   - x = number of correct digits in the correct position
 *   - y = number of correct digits in the wrong position
 *
 * @example
 * checkGuess('1532', '1234') // returns '2-1'
 */
function checkGuess(guess, solution) {
  let exactMatches = 0;
  let partialMatches = 0;

  const guessArr = guess.split('');
  const solutionArr = solution.split('');
  const guessUsed = Array(guess.length).fill(false);
  const solutionUsed = Array(solution.length).fill(false);

  // Step 1: Count exact matches
  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === solutionArr[i]) {
      exactMatches++;
      guessUsed[i] = true;
      solutionUsed[i] = true;
    }
  }

  // Step 2: Count partial matches
  for (let i = 0; i < guessArr.length; i++) {
    if (guessUsed[i]) continue;

    for (let j = 0; j < solutionArr.length; j++) {
      if (!solutionUsed[j] && guessArr[i] === solutionArr[j]) {
        partialMatches++;
        solutionUsed[j] = true;
        break;
      }
    }
  }

  return `${exactMatches}-${partialMatches}`;
}

/**
 * @function processInput
 * Processes multiple guesses against a solution in the "mastermind" game.
 *
 * @param {string} solution - The correct solution string.
 * @param {string[]} guesses - Array of guess strings.
 * @returns {string[]} An array of result strings for each guess.
 *
 * @example
 * processInput('1234', ['1532', '8793']) // returns ['2-1', '0-1']
 */
function processInput(solution, guesses) {
  return guesses.map(guess => checkGuess(guess, solution));
}

// -------- Main Program -------- //

const [solution, guessCount, ...guesses] = process.argv.slice(2);

// Input validation
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `Error: Expected ${guessCount} guesses but received ${guesses.length}.`
  );
  process.exit(1);
}

// Compute and display the results
const results = processInput(solution, guesses);
console.log(results.join(' '));
