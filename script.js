// get elements form HTML
const letterContainer = document.getElementById('letters-container');
const guessedArea = document.getElementById('guessedArea');
const hangManPic = document.getElementById("hangmanPic");
const categories = document.getElementById('categories');
const playAgain = document.getElementById('new-game-button');

// words object
let categoriesArr = {
  fruits: [
    'apple',
    'blueberry',
    'orange',
    'pineapple',
    'banana',
    'watermelon',
  ],
  animals: [
    'lion',
    'monkey',
    'squirrel',
    'tiger',
    'kangaroo',
    'zebra'],
  sports: [
    'basketball',
    'hockey',
    'baseball',
    'socar',
    'football',
    'volleyball',
  ],
  tech: [
    'java',
    'ruby',
    'nodeJS',
    'javascript',
    'python',
    'typescript',
  ],
};

// declare a variable that will be the answer
let answer = '';
// declare a variable that will represent max wrong answers
let maxWrong = 6;
// declare a variable to store mistakes
let mistakes = 0;
// declare an array called guessed to store guessed letters
let guessed = [];
// declare a variable called wordStatus that will reprsent the guessed area

// display categories button
const displayCategories = () => {
  for (let value in categoriesArr) {
    categories.innerHTML += `<button class="category-btn" id='category-btn' onclick="wordGenerator('${value}')">${value}</button>`;
  }
};

// call the display categories function 
displayCategories();

// declare a function called wordGenerator that will generate a random word from the words array
const wordGenerator = () => {
  // declare a variable that will represent a single button in categories
  let optionsButtons = document.querySelectorAll('#category-btn');
  // declare a function disableButtons that will disable all buttons which will be used later
  const disableButtons = () => {
    optionsButtons.forEach((button) => {
      button.classList.add('category-btn-disabled');
      button.disabled = true;
    });
  };

  optionsButtons.forEach((button) => {
    // first remove any class called category btn disabled and selected and also set button disabled to false
    button.classList.remove('category-btn-disabled');
    button.classList.remove('category-btn-selected');
    button.disabled = false;

    // add click event listener
    button.addEventListener('click', (event) => {
      // prevent the event from propagating so that it wont click multiple times
      event.stopImmediatePropagation();
      // create a variable and acces the value  objects's array and get the buttons inner text and change it to lower case
      const optionArray = categoriesArr[button.innerText.toLowerCase()];
      // Chosse a random word and assign it to answer
      answer = optionArray[Math.floor(Math.random() * optionArray.length)];
      console.log(answer);
      //add class of active to the selected button
      button.classList.add('category-btn-selected');
      // disable all the buttons
      disableButtons();
    });
  });
};

// generate the letters
// declare a function called generateButtons
const generateButtons = () => {
  let lettersHTML = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(
      (letter) =>
        `
    <button 
    class = 'letter btn'
    id = '` +
        letter +
        `'
      onClick = "handleGuess('` +
        letter +
        `')"
    >
    ` +
        letter +
        `
    </button>
    `
    )
    .join('');
  // set the html of letter container to letterButtons
  letterContainer.innerHTML = lettersHTML;
};

// handle selecting letter
// declare a function called handleGuess with one parameter
const handleGuess = (choosenLetter) => {
  // if choosen letter doesn't exist in the guessed array
  if (guessed.indexOf(choosenLetter) === -1) guessed.push(choosenLetter);
  // grab the id of the letter and set it's attribute to disabled
  document.getElementById(choosenLetter).setAttribute('disabled', true);
  // if the choosen letter exists in the answer word then run guessedLetters func
  // else increament mistakes by one

  if (answer.indexOf(choosenLetter) >= 0) {
    guessedLetters();
    gameWon();
    // check if game won
  } else {
    mistakes++;
    //check if game lost
    gameLost();
    //update the hangman picture
    updatePic();
  }
};

// guessed word/letter by the useer
// declare a function called guessedLetters to work on the guessed letters area
const guessedLetters = () => {
  wordStatus = answer
    .split('')
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');
  // set the guessed area HTML to wordStatus
  guessedArea.innerHTML = wordStatus;
};

//update picture
const updatePic = () => {
  hangManPic.src = './images/' + mistakes + '.jpg';
};

// check if game won
// declare a function gameWon that will check if the game is won
const gameWon = () => {
  console.log(wordStatus);
  console.log(answer);
  if (wordStatus === answer) letterContainer.innerHTML = 'YOU WIN!!!';
};

// check if game lost
// declare a function gameLost that will check if the game is lost
const gameLost = () => {
  if (mistakes === 6) {
    guessedArea.innerHTML = 'The answer was: ' + answer;
    letterContainer.innerHTML = 'YOU LOST!!!';
  }
};

// reset the whole game
// create a function called initializer to reset all the necessary variables and states
const initializer = () => {
  mistakes = 0;
  guessed = [];
  hangManPic.src = './images/0.jpg';
  wordGenerator();
  guessedLetters();
  // enableButtons();
  generateButtons();
};

// add event listner to the playAgain button and use the initializer function
playAgain.addEventListener('click', initializer);
// run the initializer function on window load, when the window is first opened
window.onload = initializer;
