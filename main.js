let cardBoard = document.querySelector('#cardboard')

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

cardBoard.innerHTML = cardHTML
cardBoard.innerHTML += cardHTML

const cards = document.querySelectorAll('.memory-card')
let firstCard, secondCard

function flipCard () {
    this.classList.add('flip')
    if (!firstCard) {
        firstCard = this

        return false //para sair da funçao
    }

    secondCard = this
    
    checkForMatch()
}

function checkForMatch () {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card

    !isMatch ? disableCards(): true
}

function disableCards () {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
}

cards.forEach(card => card.addEventListener('click', flipCard))
