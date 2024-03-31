const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

    function updateScoreElement() {
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }
    updateScoreElement();

    let isAutoPlaying = false;
    let intervalID;

    // const autoPLay = () => {
    // };

    function autoPlay() {
      if (!isAutoPlaying) {
        intervalID = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);
        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Stop Playing';
        isAutoPlaying = true;
      } else {
        clearInterval(intervalID);
        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Auto Play';
        isAutoPlaying = false;
      }
    }

    document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock'); 
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper'); 
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors'); 
    });

    document.querySelector('.js-reset-score')
    .addEventListener('click', () => {
      showResetScore();
    });

    function showResetScore() {
      document.querySelector('.js-reset')
      .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
    document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });

    document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
    }

    

    function hideResetConfirmation() {
      document.querySelector('.js-reset')
      .innerHTML = '';
    }

    function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
    }

    document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
      autoPlay();
    });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      } else if (event.key === 'a') {
        autoPlay();
      } else if (event.key === 'Enter') {
        resetScore();
      }
    });

    function playGame(userMove) {
      const computerMove = pickComputerMove();
      let result = '';

      if (computerMove === 'rock') {
        if (userMove === 'rock') {
          result = 'tie';
        } else if (userMove === 'paper') {
          result = 'win';
        } else if (userMove === 'scissors') {
          result = 'lose';
        }
      } else if (computerMove === 'paper') {
        if (userMove === 'paper') {
          result = 'tie';
        } else if (userMove === 'rock') {
          result = 'lose';
        } else if (userMove === 'scissors') {
          result = 'win';
        }
      } else if (computerMove === 'scissors') {
        if (userMove === 'rock') {
          result = 'lose';
        } else if (userMove === 'paper') {
          result = 'win';
        } else if (userMove === 'scissors') {
          result = 'tie';
        }
      }

      if (result === 'win') {
        score.wins++;
      } else if (result === 'tie') {
        score.ties++;
      } else if (result === 'lose') {
        score.losses++;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();
      document.querySelector('.js-result')
        .innerHTML = result;

      document.querySelector('.js-moves')
      .innerHTML = `You <img src="${userMove}-emoji.png" class="image-button"> <img src="${computerMove}-emoji.png" class="image-button"> Computer`;
    }

    function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
      }
      else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
      }
      return computerMove;
    }

