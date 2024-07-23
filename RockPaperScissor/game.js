const choices = document.querySelectorAll('.choice');
const userScoreElement = document.getElementById('user-score');
const compScoreElement = document.getElementById('comp-score');
const msgElement = document.getElementById('msg');
const roundsPlayedElement = document.getElementById('rounds-played');
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById('start-btn');
const roundsSelect = document.getElementById('rounds');
const choicesContainer = document.querySelector('.choices');
const scoreBoard = document.querySelector('.score-board');
const roundsContainer = document.querySelector('.rounds');
const msgContainer = document.querySelector('.msg-container');
const resetContainer = document.querySelector('.reset-container');

let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;
let totalRounds = 3; // default to 3 rounds

choices.forEach(choice => choice.addEventListener('click', game));
resetBtn.addEventListener('click', resetGame);
startBtn.addEventListener('click', startGame);

function startGame() {
    totalRounds = parseInt(roundsSelect.value);
    resetGame();
    choicesContainer.style.display = 'flex';
    scoreBoard.style.display = 'flex';
    roundsContainer.style.display = 'flex';
    msgContainer.style.display = 'block';
    resetContainer.style.display = 'flex';
    startBtn.disabled = true;
}

function game(event) {
    if (roundsPlayed < totalRounds) {
        const userChoice = event.target.closest('.choice').id;
        const compChoice = getCompChoice();
        const winner = getWinner(userChoice, compChoice);

        updateScores(winner);
        showResult(userChoice, compChoice, winner);
        roundsPlayed++;
        roundsPlayedElement.textContent = roundsPlayed;

        if (roundsPlayed === totalRounds) {
            declareOverallWinner();
            choices.forEach(choice => choice.removeEventListener('click', game));
        }
    }
}

function getCompChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(user, comp) {
    if (user === comp) {
        return 'draw';
    }
    if (
        (user === 'rock' && comp === 'scissors') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissors' && comp === 'paper')
    ) {
        return 'user';
    } else {
        return 'comp';
    }
}

function updateScores(winner) {
    if (winner === 'user') {
        userScore++;
        userScoreElement.textContent = userScore;
    } else if (winner === 'comp') {
        compScore++;
        compScoreElement.textContent = compScore;
    }
}

function showResult(userChoice, compChoice, winner) {
    if (winner === 'user') {
        msgElement.textContent = `You Win! ${capitalize(userChoice)} beats ${compChoice}.`;
        msgElement.style.backgroundColor = '#379634';
    } else if (winner === 'comp') {
        msgElement.textContent = `You Lose! ${capitalize(compChoice)} beats ${userChoice}.`;
        msgElement.style.backgroundColor = '#d32f2f';
    } else {
        msgElement.textContent = `It's a draw! You both chose ${userChoice}.`;
        msgElement.style.backgroundColor = '#ffa000';
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function declareOverallWinner() {
    if (userScore > compScore) {
        msgElement.textContent = 'Congratulations! You won the series!';
        msgElement.style.backgroundColor = '#379634';
    } else if (userScore < compScore) {
        msgElement.textContent = 'You lost the series. Better luck next time!';
        msgElement.style.backgroundColor = '#d32f2f';
    } else {
        msgElement.textContent = 'The series is a draw!';
        msgElement.style.backgroundColor = '#ffa000';
    }
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    roundsPlayed = 0;
    userScoreElement.textContent = userScore;
    compScoreElement.textContent = compScore;
    roundsPlayedElement.textContent = roundsPlayed;
    msgElement.textContent = 'Your Turn';
    msgElement.style.backgroundColor = '#379634';
    choices.forEach(choice => choice.addEventListener('click', game));
    startBtn.disabled = false;
    choicesContainer.style.display = 'none';
    scoreBoard.style.display = 'none';
    roundsContainer.style.display = 'none';
    msgContainer.style.display = 'none';
    resetContainer.style.display = 'none';
}
