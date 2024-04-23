const screens = document.querySelectorAll('.screen');
const chooseInsectButtons = document.querySelectorAll('.choose-insect-btn');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-btn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
let seconds = 0;
let score = 0;
let selectedInsect = {};

startButton.addEventListener('click', () => {
    screens[0].classList.add('up');
});

chooseInsectButtons.forEach(chooseInsectButton => {
    chooseInsectButton.addEventListener('click', () => {
        const img = chooseInsectButton.querySelector('img');
        const alt = img.getAttribute('alt');
        const src = img.getAttribute('src');
        screens[1].classList.add('up');
        selectedInsect = {src, alt};
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    if (m < 10) m = `0${m}`;
    if (s < 10) s = `0${s}`;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)">`;
    gameContainer.appendChild(insect);
    insect.addEventListener('click', catchInsect);
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

function increaseScore() {
    score++;
    if (score > 19) message.classList.add('visible');
    if (score > 59 && seconds < 30) message.innerHTML = 'Congratulations!<br>You beat the game!';
    scoreEl.innerHTML = `Score: ${score}`;
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}
