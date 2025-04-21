const puzzle = document.getElementById("puzzle");
let tiles = [];

function createPuzzle() {
    const numbers = [...Array(8).keys()].map(n => n + 1);
    numbers.push(""); // Empty tile (last position in the solved state)
    tiles = numbers.map((num, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === "") tile.classList.add("empty");
        tile.textContent = num;
        tile.addEventListener("click", () => moveTile(index));
        return tile;
    });

    // Randomize the puzzle with up to 10 moves
    shufflePuzzle(10);
    renderPuzzle();
}

function renderPuzzle() {
    puzzle.innerHTML = "";
    tiles.forEach(tile => puzzle.appendChild(tile));
}

function moveTile(index) {
    const emptyIndex = tiles.findIndex(tile => tile.textContent === "");
    const validMoves = [
        emptyIndex - 3, emptyIndex + 3, // Up/Down
        emptyIndex - 1 * (emptyIndex % 3 !== 0), // Left
        emptyIndex + 1 * ((emptyIndex + 1) % 3 !== 0) // Right
    ];

    if (validMoves.includes(index)) {
        [tiles[emptyIndex].textContent, tiles[index].textContent] =
            [tiles[index].textContent, tiles[emptyIndex].textContent];
        tiles[emptyIndex].classList.toggle("empty");
        tiles[index].classList.toggle("empty");
        renderPuzzle();
    }
}

function shufflePuzzle(moves) {
    for (let i = 0; i < moves; i++) {
        const emptyIndex = tiles.findIndex(tile => tile.textContent === "");
        const validMoves = [
            emptyIndex - 3, emptyIndex + 3, // Up/Down
            emptyIndex - 1 * (emptyIndex % 3 !== 0), // Left
            emptyIndex + 1 * ((emptyIndex + 1) % 3 !== 0) // Right
        ].filter(index => index >= 0 && index < tiles.length);

        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        [tiles[emptyIndex].textContent, tiles[randomMove].textContent] =
            [tiles[randomMove].textContent, tiles[emptyIndex].textContent];
        tiles[emptyIndex].classList.toggle("empty");
        tiles[randomMove].classList.toggle("empty");
    }
}

createPuzzle();
