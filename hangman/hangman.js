const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'interface', 'wizard'];

let selectedIndex = Math.round(Math.random() * word.length);
let selectedWord = word[selectedIndex];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter)}</span>`)}
    `
}
