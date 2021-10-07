const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreasseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreasseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет:<span class="primary"> ${score} </span></h1>`;
}

function createRandomCircle() {
  const size = getRandomNumber(10, 60);
  const circle = document.createElement('div');
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
