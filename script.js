const puzzle = document.getElementById("puzzle");
let tiles = [];

function createPuzzle() {
    let numbers = [...Array(8).keys()].map(n => n + 1);
    numbers.push(""); // Empty tile
    shuffle(numbers);

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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

createPuzzle();
