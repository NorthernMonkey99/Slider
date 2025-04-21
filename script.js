const puzzle = document.getElementById("puzzle");
let tiles = [];

function createPuzzle(imageUrl) {
    const numbers = [...Array(8).keys()].map(n => n + 1);
    numbers.push(""); // Empty tile (last position)
    shuffle(numbers);

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
        [tiles[emptyIndex], tiles[index]] =
            [tiles[index], tiles[emptyIndex]];
        renderPuzzle();
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const imageUrl = "images/cyber-warrior.png"; // Replace with an image link
createPuzzle(imageUrl);
