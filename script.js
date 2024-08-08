const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');
const messages = [
    "Você é uma pessoa incrível!",
    "Voce me faz um bem do krl!",
    "Você tem um ótimo senso de humor!",
    "Os roles sem voce ja nao sao mais os mesmos!",
    "Adoro nossas conversas e risadas!",
    "Você é a melhor coisa que me aconteceu esse ano!",
    "Sempre posso contar com você, e voce comigo!",
    "Você faz qualquer dia parecer melhor!",
    "Espero nunca te perder <3!",
    "Amo nossas fofocas!"
];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Create the cards
function createCards() {
    cards = [];
    const cardMessages = [...messages, ...messages];
    cardMessages.sort(() => 0.5 - Math.random());
    cardMessages.forEach((msg, index) => {
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
            message.textContent = "Parabens, Ganhou um açai <3";
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
