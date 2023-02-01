import Card from './card.js';

const container = document.getElementById('game-container');
const mainContainer = document.querySelector('.container');
const settingForm = document.createElement('form');
const settingBlock = document.createElement('div');
const settingTitle = document.createElement('span');
const settingInput = document.createElement('input');
const buttonStart = document.createElement('button');
const buttonReplay = document.createElement('button');
let cardsCount;

settingForm.classList.add('setting-form');
settingBlock.classList.add('setting-block');
settingTitle.classList.add('setting-title');
settingInput.classList.add('setting-input');
buttonStart.classList.add('btn-replay', 'setting-btn');
buttonReplay.classList.add('btn-replay');

settingTitle.textContent = 'Количество карточек';
buttonStart.textContent = 'Начать игру';
buttonReplay.textContent = 'Сыграть ещё раз';


mainContainer.append(settingForm);
settingForm.append(settingBlock, buttonStart);
settingBlock.append(settingTitle, settingInput);

let minute = 0;
let second = 60;
let count = document.getElementById('counter');
let timeInterval;

buttonStart.addEventListener('click', (e) => {
  e.preventDefault();
  settingForm.remove(settingForm);

  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
  
  newGame(container, cardsCount);
  
  minute = 0;
  second = 60;
  count.innerHTML = '1:00';
  timeInterval = setInterval(timer, 1000);

  if(count.classList.contains('timer-game-over')) {
    count.classList.remove('timer-game-over')
  };
});

buttonReplay.addEventListener('click', (e) => {

  e.currentTarget.remove(buttonReplay);
  container.innerHTML = ''
  settingInput.value = ''
  mainContainer.append(settingForm);
  
  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
});

function timer() {
  if( minute == 0 && second == 1) {
    stopInterval();
    count.innerHTML = 'Время вышло!';
    count.classList.add('timer-game-over');
    let disableCard = document.querySelectorAll('.card');
    
    disableCard.forEach((el) => {
      el.classList.add('disable')
    });

    mainContainer.append(buttonReplay);
    
  } else {
    second--;
    if(second == 0) {
      minute--;
      second = 60;
      
      if(minute == 0) {
        minute = minute;
      }
    }
    if(second.toString(). length == 1) {
      second = '0' + second;
    }
    
    count.innerHTML = minute + ':' + second;
  }
};

function stopInterval() {
  clearInterval(timeInterval);
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
};

function newGame(container, cardsCount) {

  cardsCount = settingInput.value;
  cardsCount = parseInt(cardsCount);

  if(cardsCount % 2 === 0 && cardsCount >=2 && cardsCount <= 10) {
    cardsCount = settingInput.value;
  } else {
    cardsCount = 4
  };

  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for(let i=1; i<=cardsCount/2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  
    shuffle(cardsNumberArray);
  };

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip))
  };

  function flip(card) {

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.cardOpen = false;
        secondCard.cardOpen = false;
        firstCard = null;
        secondCard = null;
      }
    };

    if(firstCard == null) {
      firstCard = card
    } else if(secondCard == null) {
      secondCard = card
    };

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.cardMatched = true;
        secondCard.cardMatched = true;
        firstCard = null;
        secondCard = null;
      }
    };

    if(document.querySelectorAll('.card.matched').length == cardsNumberArray.length) {
      stopInterval();
      count.textContent = 'Игра окончена!';
      count.classList.add('timer-game-over');

      mainContainer.append(buttonReplay);
    };
  };
};








