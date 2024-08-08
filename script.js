const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');
const messages = [
    "Você é a coisa mais imortante nos ultimos tempo!",
    "Sempre me divirto muito com você!",
    "Nenhum role e o mesmo sem voce!",
    "A coisa que eu mais gosto sao nossas fofocas!",
    "Espero nunca te perder!"
];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Create the cards
function createCards() {
    cards = [];
    const cardMessages = [...messages, ...messages];
    cardMessages.sort(() => 0.5 - Math.random()).slice(0, 8); // Limitar a 8 cartas
    cardMessages.forEach((msg) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.message = msg;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

// Flip card
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    this.textContent = this.dataset.message;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.message === card2.dataset.message) {
        matchedPairs++;
        message.textContent = "Bom trabalho, você encontrou um par!";
        if (matchedPairs === messages.length) {
            message.textContent = "Espero que tenha se divertido, Ganhou um Açai!";
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Reset the game
function resetGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    createCards();
}

// Initialize the game
createCards();
resetButton.addEventListener('click', resetGame);
