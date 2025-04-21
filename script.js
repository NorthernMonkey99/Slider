const puzzle = document.getElementById("puzzle");
let tiles = [];

function createPuzzle() {
    // Predefined solvable state requiring no more than 10 moves
    const numbers = [1, 2, 3, 4, 5, 6, 7, "", 8];

    tiles = numbers.map((num, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        if (num === "") tile.classList.add("empty");
        tile.textContent = num;
        tile.addEventListener("click", () => moveTile(index));
        return tile;
    });

    renderPuzzle();
}

function renderPuzzle() {
    puzzle.innerHTML = "";
    tiles.forEach(tile => puzzle.appendChild(tile));
}

function moveTile(index) {
    const emptyIndex = tiles.findIndex(tile => tile.textContent === "");
    const validMoves = [
        emptyIndex - 3, emptyIndex + 3,
        emptyIndex - 1 * (emptyIndex % 3 !== 0),
        emptyIndex + 1 * ((emptyIndex + 1) % 3 !== 0)
    ];

    if (validMoves.includes(index)) {
        [tiles[emptyIndex].textContent, tiles[index].textContent] =
            [tiles[index].textContent, tiles[emptyIndex].textContent];
        tiles[emptyIndex].classList.toggle("empty");
        tiles[index].classList.toggle("empty");
        renderPuzzle();
    }
}

// Initial puzzle state avoids random shuffling for controlled solvability
createPuzzle();
