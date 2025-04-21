const puzzle = document.getElementById("puzzle");
const moveCounter = document.getElementById("move-counter");
const status = document.getElementById("status");
let tiles = [];
let moves = 0;

function createPuzzle(imageUrl) {
    const numbers = [...Array(8).keys()].map(n => n + 1);
    numbers.push(""); // Empty tile (last position in solved state)
    tiles = numbers.map((num, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === "") {
            tile.classList.add("empty");
        } else {
            const row = Math.floor((num - 1) / 3);
            const col = (num - 1) % 3;
            tile.style.backgroundImage = `url(${imageUrl})`;
            tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        }
        tile.addEventListener("click", () => moveTile(index));
        return tile;
    });

    shufflePuzzle(10);
    renderPuzzle();
}

function renderPuzzle() {
    puzzle.innerHTML = "";
    tiles.forEach(tile => puzzle.appendChild(tile));
}

function moveTile(index) {
    const emptyIndex = tiles.findIndex(tile => tile.classList.contains("empty"));
    const validMoves = [
        emptyIndex - 3, emptyIndex + 3, // Up/Down
        emptyIndex - 1 * (emptyIndex % 3 !== 0), // Left
        emptyIndex + 1 * ((emptyIndex + 1) % 3 !== 0) // Right
    ];

    if (validMoves.includes(index)) {
        [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
        moves++;
        updateMoveCounter();
        renderPuzzle();

        if (checkWin()) {
            status.textContent = "Congratulations, you solved the puzzle!";
        } else if (moves >= 10) {
            status.textContent = "Game over! You ran out of moves.";
        }
    }
}

function shufflePuzzle(maxMoves) {
    for (let i = 0; i < maxMoves; i++) {
        const emptyIndex = tiles.findIndex(tile => tile.classList.contains("empty"));
        const validMoves = [
            emptyIndex - 3, emptyIndex + 3, // Up/Down
            emptyIndex - 1 * (emptyIndex % 3 !== 0), // Left
            emptyIndex + 1 * ((emptyIndex + 1) % 3 !== 0) // Right
        ].filter(index => index >= 0 && index < tiles.length);

        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        [tiles[emptyIndex], tiles[randomMove]] = [tiles[randomMove], tiles[emptyIndex]];
    }
}

function updateMoveCounter() {
    moveCounter.textContent = moves;
}

function checkWin() {
    const correctOrder = [...Array(8).keys()].map(n => n + 1).concat("");
    return tiles.map(tile => tile.textContent).join() === correctOrder.join();
}

const imageUrl = "YOUR_IMAGE_URL_HERE"; // Replace with an image link
createPuzzle(imageUrl);
