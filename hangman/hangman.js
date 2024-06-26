const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'interface', 'wizard'];

let selectedIndex = Math.floor(Math.random() * word.length);
let selectedWord = word[selectedIndex];
let gameOver = false;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
        gameOver = true;
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

function displayWrong() {
    wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}${wrongLetters.map(letter => `<span>${letter}</span>`)}`;
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length >= figureParts.length) {
        finalMessage.innerText = `The word was: ${selectedWord}`;
        popup.style.display = 'flex';
        gameOver = true;
    }
}

playAgainBtn.addEventListener('click', () => {
    wrongLetters.length = 0;
    correctLetters.length = 0;
    selectedWord = word[Math.floor(Math.random() * word.length)];
    popup.style.display = 'none';
    figureParts.forEach(part => {
        part.style.display = 'none';
    })
    wrongLettersEl.innerText = '';
    gameOver = false;

    displayWord();
})

window.addEventListener('keydown', e => {
    if (gameOver) return;
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            displayWrong();
        }
    }
})

displayWord();
