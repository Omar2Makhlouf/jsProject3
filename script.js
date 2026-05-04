'use strict';
const dice = document.querySelector('.dice');
const newG = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const roll = document.querySelector('.btn--roll');
const scr1 = document.querySelector('#score--0');
const scr2 = document.querySelector('#score--1');
const cur1 = document.querySelector('#current--0');
const cur2 = document.querySelector('#current--1');
const plr1 = document.querySelector('.player--0');
const plr2 = document.querySelector('.player--1');
let playing = true;
let player = 0;
scr1.textContent = 0;
scr2.textContent = 0;
dice.classList.add('hidden');
roll.addEventListener('click', function () {
  if (playing) {
    const newD = Math.trunc(Math.random() * 6 + 1);
    console.log(newD);
    dice.classList.remove('hidden');
    let name = `dice-${newD}.png`;
    dice.src = name;
    let curr;

    if (player === 0) {
      if (newD > 1) {
        cur1.textContent = Number(cur1.textContent) + newD;
      } else {
        cur1.textContent = 0;
        playerR();
      }
    } else {
      if (newD > 1) cur2.textContent = Number(cur2.textContent) + newD;
      else {
        cur2.textContent = 0;
        playerR();
      }
    }
  }
});
const playerR = function () {
  if (player === 0) {
    plr1.classList.remove('player--active');
    plr2.classList.add('player--active');
    player++;
  } else {
    plr2.classList.remove('player--active');
    plr1.classList.add('player--active');
    player--;
  }
};
const checkWinner = function () {
  if (Number(document.getElementById(`score--${player}`).textContent) >= 10) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${player}`)
      .classList.remove('player--active');
    playing = false;
    dice.classList.remove('hidden');
    return 1;
  }
  return 0;
};
const holder = function () {
  if (playing) {
    if (player === 0) {
      scr1.textContent = Number(scr1.textContent) + Number(cur1.textContent);
      cur1.textContent = 0;
    } else {
      scr2.textContent = Number(scr2.textContent) + Number(cur2.textContent);
      cur2.textContent = 0;
    }
    if (checkWinner() === 0) playerR();
  }
};

hold.addEventListener('click', holder);
newG.addEventListener('click', function () {
  playing = true;
  player = 0;
  plr1.classList.remove('player--winner');
  plr1.classList.add('player--active');
  plr2.classList.remove('player--winner');
  scr1.textContent = 0;
  scr2.textContent = 0;
});
