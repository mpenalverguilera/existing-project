localStorage.getItem('score') || localStorage.setItem('score', JSON.stringify({wins: 0, losses: 0, ties: 0}));
let autoPlayInterval = null;


function playGame(playerMove) {
    const score = JSON.parse(localStorage.getItem('score'));
    let result;
    const  computerMoveString = autoPick();
    if (computerMoveString === 'rock') {
        if (playerMove === 'rock') result = 'Tie';
        else if (playerMove === 'paper') result = 'Winner';
        else result = 'Losser';
    }
    else if (ccomputerMoveString = 'paper') {
        if (playerMove === 'rock') result = 'Losser';
        else if (playerMove === 'paper') result = 'Tie';
        else result = 'Winner';
    }
    else {
        if (computerMoveString = 'scissors') result = 'Winner';
        else if (playerMove === 'paper') result = 'Losser';
        else result = 'Tie';
    }

    if (result === 'Winner') score.wins++;
    else if (result === 'Losser') score.losses++;
    else score.ties++;

    localStorage.setItem('score', JSON.stringify(score));

    uploadScore();

    document.querySelector('.js-gamed').innerText = result;

    document.querySelector('.picked-moves').innerHTML = `
        <div class="player-picked-move">
            You:
            <img src="icons/${playerMove}-emoji.png">
        </div>
        <div class="computer-picked-move">
            Computer
            <img src="icons/${computerMoveString}-emoji.png">
        </div>
    `;
}

function uploadScore() {
    const score = JSON.parse(localStorage.getItem('score'));
    document.querySelector('.js-score').innerText = `Wins: ${score.wins}    Losses: ${score.losses}   Ties: ${score.ties}`;
}

function autoPick() {
    const playerMove = Math.random();
    if (playerMove < 1/3) return 'rock';
    else if (2/3 <= playerMove ) return 'scissors';
    return 'paper';
}

function changePlayMode() {
    const modeElement = document.getElementById('js-play-mode');
    if (!autoPlayInterval) {
        modeElement.innerText = 'Stop Auto'
        autoPlayInterval = setInterval(function() {
            playGame(autoPick());
        }, 1000);
    }

    else {
        modeElement.innerText = 'Auto Play'
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}