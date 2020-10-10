const cardBoard = document.querySelector('#cardboard')
let timer;
let elMoves = document.getElementById('NumMoves');
let elMin = document.getElementById('min');
let elSeg = document.getElementById('seg');

let elWinMin = document.getElementById('win-minutes');
let elWinseg = document.getElementById('win-seconds');
let elWinMoves = document.getElementById('win-moves');
let moves = 0;
let s = 1;
let m = 0;
mostraMoves();

const imgs = [
    "angular.svg",
    "aurelia.svg",
    "backbone.svg",
    "ember.svg",
    "react.svg",
    "vue.svg"
]

let cardHTML = ""


imgs.forEach(img => {
    cardHTML += 
    `<div class="memory-card" data-card="${img}">
        <img class="front-face" src="imagens/${img}">
        <img class="back-face" src="imagens/js-badge.svg">
    </div>`
})

cardBoard.innerHTML = cardHTML + cardHTML;

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function iniciarTimer() {

    timer = window.setInterval( () => {
        if (s === 60) {m++; s = 0;}
        elMin.innerText = `0${m}`; 
        if(s < 10) {
            elSeg.innerText = `0${s}`
        } else {
            elSeg.innerText = `${s}`
        }
        s++;
    }, 1000);
}

function mostraMoves (){
    console.log(moves);
    elMoves.innerHTML = `${moves}`;
    elMoves.innerHTML = `${moves}`;
    moves++;
}

function flipCard() { //this é referencia ao array em que essa funcao esta iterando / cards -> card
    if (lockCards) return false;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return false;
    }
    secondCard = this;
    mostraMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    !isMatch ? unFlipCards() : resetCards(isMatch);

}

function unFlipCards() {
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetCards();
    }, 500);
}

let qtdMatches = 0;
function resetCards(isMatch = false) {
    if (isMatch) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        qtdMatches++;
    }
    if (qtdMatches !== imgs.length) {
        [firstCard, secondCard, lockCards] = [null, null, false];
    } else {
        return endGame();
    }
}

cards.forEach( card => {
    card.addEventListener("click", flipCard);
    // card.addEventListener("click", mostraMoves);
});

const gameContainer = document.querySelector('div.game-board');
function endGame () {
    let win = document.querySelector('.win-dialog');
    gameContainer.setAttribute('style', 'display: none');
    win.setAttribute('style', 'display: flex');
    elWinMin.innerHTML = m;
    elWinseg.innerHTML = s;
    elWinMoves.innerHTML = moves;
}

function restart() {
    location.reload();
}

iniciarTimer();