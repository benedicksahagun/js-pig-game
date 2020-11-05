'use strict';

//html elements
const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const player1Current = document.querySelector('#current--0');
const player2Current = document.querySelector('#current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Intial Game State
let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let playing = true;

//Events
btnRoll.addEventListener('click', function () {
	if (playing) {
		let dice = Math.trunc(Math.random() * 6) + 1;
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		if (dice !== 1) {
			current += dice;
			document.querySelector(`#current--${activePlayer}`).textContent = current;
		} else {
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (playing) {
		scores[activePlayer] += current;
		document.querySelector(`#score--${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			endGame();
		} else {
			switchPlayer();
		}
	}
});

//Functions
const switchPlayer = function () {
	current = 0;
	document.querySelector(`#current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;

	player1El.classList.toggle('player--active');
	player2El.classList.toggle('player--active');
};

const endGame = function () {
	playing = false;
	diceEl.classList.add('hidden');
};

const init = function () {
	player1Score.textContent = 0;
	player1Current.textContent = 0;
	player2Score.textContent = 0;
	player2Current.textContent = 0;

	diceEl.classList.add('hidden');
	player1El.classList.remove('player--winner', 'player--active');
	player2El.classList.remove('player--winner', 'player--active');
	player1El.classList.add('player--active');
	scores = [0, 0];
	playing = true;
	current = 0;
};

init();

btnNew.addEventListener('click', init);
