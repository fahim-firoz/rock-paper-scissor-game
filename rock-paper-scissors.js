let score = JSON.parse(localStorage.getItem('score'));

if(score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
let buttonElement = document.querySelector('.js-auto-play-button');
function autoPlay()
{
  if(isAutoPlaying === false)
  {
    intervalId = setInterval(function ()
    {
     const playerMove = pickComputerMove();
     playGame(playerMove);
    },1000);
    buttonElement.innerHTML = 'Stop play';
    isAutoPlaying = true;
  }
  else 
  {
    clearInterval(intervalId);
    buttonElement.innerHTML = 'Auto play';
    isAutoPlaying = false;
  }
   
}

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r')
  {
    playGame('rock');
  }
  if(event.key === 'p')
  {
    playGame('paper');
  }
  if(event.key === 's')
  {
    playGame('scissors');
  }
});


function pickComputerMove() 
{
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber>=0 && randomNumber<1/3) {
  computerMove = 'rock';
}
else if(randomNumber>=1/3 && randomNumber<2/3) {
  computerMove = 'paper';
}
else {
  computerMove = 'scissors';
}
return computerMove;
}  

function updateScoreElement() 
{
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}  Losses: ${score.losses}  Ties: ${score.ties}`;
}

function playGame(playerMove) 
{
let result = '';
let computerMove = pickComputerMove();

if(playerMove === 'rock') {
  if(computerMove === 'rock') {
    result = 'Tie';
  }
  if(computerMove === 'paper') {
    result = 'You lose';
  }
  if(computerMove === 'scissors') {
    result = 'You win';
  }
}

if(playerMove === 'paper') {
  if(computerMove === 'rock') {
    result = 'You win';
  }
  if(computerMove === 'paper') {
    result = 'Tie';
  }
  if(computerMove === 'scissors') {
    result = 'You lose';
  }
}

if(playerMove === 'scissors') {
  if(computerMove === 'rock') {
    result = 'You lose';
  }
  if(computerMove === 'paper') {
    result = 'You win';
  }
  if(computerMove === 'scissors') {
    result = 'Tie';
  }
}

if(result === 'You win') {
  score.wins++;
}
else if(result === 'You lose') {
  score.losses++;
}
else if(result === 'Tie') {
  score.ties++;
}

localStorage.setItem('score', JSON.stringify(score)); // saves an item into localStorage

 
updateScoreElement();

document.querySelector('.js-result')
.innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png"> <img src="images/${computerMove}-emoji.png"> Computer`;





}