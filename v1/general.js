localStorage.getItem('score') || localStorage.setItem('score', JSON.stringify({wins: 0, losses: 0, ties: 0}));
        
function playGame(playerMove) {
    const score = JSON.parse(localStorage.getItem('score'));
    const computerMove = Math.random();
    let result;
    let computerMoveString;
    if (computerMove < 1/3) {
        if (playerMove === 'rock') result = 'Tie';
        else if (playerMove === 'paper') result = 'Winner';
        else result = 'Losser';
        computerMoveString = 'rock';
    }
    else if (computerMove >= 1/3 && computerMove < 2/3) {
        if (playerMove === 'rock') result = 'Losser';
        else if (playerMove === 'paper') result = 'Tie';
        else result = 'Winner';
        computerMoveString = 'paper';

    }
    else {
        if (playerMove === 'rock') result = 'Winner';
        else if (playerMove === 'paper') result = 'Losser';
        else result = 'Tie';
        computerMoveString = 'scissors';
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