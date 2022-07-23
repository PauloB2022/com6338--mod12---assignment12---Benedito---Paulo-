const words = [
  "bananas",
  "grapes",
  "carousel",
  "milkshake",
  "javascript",
  "limousine",
  "chocolate",
  "programming",
  "meatloaf",
  "ukulele",
  "mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    const correctLetter = this.word.includes(letter);
    if (correctLetter) {
      // Update displayWord with the correct letter wherever it shows up. _e__ (test) "t" => te_t
      const newWord = [];
      for (let i = 0; i < this.word.length; i++) {
        const wordLetter = this.word[i];
        if (wordLetter === letter) {
          newWord.push(wordLetter);
        } else {
          newWord.push(this.displayWord[i]);
        }
      }
      this.displayWord = newWord.join("");
      // Add the letter to the correctLetters array.
      this.correctLetters.push(letter);
    } else {
      this.remainingGuesses--;
      this.incorrectLetters.push(letter);
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    document.querySelector("#remaining-guesses").innerText =
      this.remainingGuesses;
    document.querySelector("#incorrect-letters").innerText =
      this.incorrectLetters;
    document.querySelector("#word-to-guess").innerText = this.displayWord;
  }

  // implement the isGameOver function:
  isGameOver() {
    return this.remainingGuesses <= 0 || this.word === this.displayWord;
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.word === this.displayWord && this.remainingGuesses > 0) {
      return "win";
    } else if (this.word !== this.displayWord && this.remainingGuesses <= 0) {
      return "loss";
    } else {
      return null;
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  currentWord = new Word(randomWord);
  currentWord.updateScreen();
}

document.onkeyup = function (e) {
  const pressedKey = e.key.toLowerCase();
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return;

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey);
  // allow word obj to update screen
  currentWord.updateScreen();

  // check if game is over
  const gameOver = currentWord.isGameOver();

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById("previous-word");
    const winDisplay = document.getElementById("wins");
    const lossDisplay = document.getElementById("losses");
    previousWord.textContent = currentWord.word;
    const result = currentWord.getWinOrLoss();
    if (result === "win") {
      wins++;
      winDisplay.textContent = wins;
    } else if (result === "loss") {
      losses++;
      lossDisplay.textContent = losses;
    }
    newGame();
  }
};

newGame();
