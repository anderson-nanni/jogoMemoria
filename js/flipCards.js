const cardBoard = document.querySelector('#cardboard')

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

function flipCard() { //this é referencia ao array em que essa funcao esta iterando / cards -> card
    if (lockCards) return false;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return false;
    }
    secondCard = this;

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
    if (qtdMatches !== cards.length/2) {
        [firstCard, secondCard, lockCards] = [null, null, false];
    } else {
        return endGame();
    }
    console.log(cards.length)
}

cards.forEach( card => {
        card.addEventListener("click", flipCard);
});


function endGame () {
    console.log("acabou")
}