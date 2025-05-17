const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
ctx.scale(BLOCK, BLOCK);

const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');
nextCtx.scale(BLOCK / 2, BLOCK / 2);

const holdCanvas = document.getElementById('hold');
const holdCtx = holdCanvas.getContext('2d');
holdCtx.scale(BLOCK / 2, BLOCK / 2);

const scoreEl = document.getElementById('score');

const COLORS = [
    null,
    'cyan',    // I
    'blue',    // J
    'orange',  // L
    'yellow',  // O
    'green',   // S
    'purple',  // T
    'red'      // Z
];

const SHAPES = [
    [],
    [[1,1,1,1]],
    [[2,0,0],[2,2,2]],
    [[0,0,3],[3,3,3]],
    [[4,4],[4,4]],
    [[0,5,5],[5,5,0]],
    [[0,6,0],[6,6,6]],
    [[7,7,0],[0,7,7]]
];

class Matrix {
    constructor(rows, cols) {
        this.data = Array.from({length: rows}, () => Array(cols).fill(0));
    }
    clear() {
        this.data.forEach(row => row.fill(0));
    }
}

class Player {
    constructor(board) {
        this.board = board;
        this.reset();
        this.score = 0;
        this.next = createPiece();
        this.hold = null;
        this.holdUsed = false;
    }

    drop() {
        this.pos.y++;
        if (this.collide()) {
            this.pos.y--;
            this.merge();
            const cleared = this.boardSweep();
            this.score += cleared * 100;
            this.spawn();
        }
        this.dropCounter = 0;
    }

    move(dir) {
        this.pos.x += dir;
        if (this.collide()) {
            this.pos.x -= dir;
        }
    }

    rotate() {
        const p = this.matrix;
        for (let y = 0; y < p.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p[x][y], p[y][x]] = [p[y][x], p[x][y]];
            }
        }
        p.forEach(row => row.reverse());
        if (this.collide()) {
            p.forEach(row => row.reverse());
            for (let y = 0; y < p.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [p[x][y], p[y][x]] = [p[y][x], p[x][y]];
                }
            }
        }
    }

    holdPiece() {
        if (this.holdUsed) return;
        if (this.hold) {
            [this.hold, this.matrix] = [this.matrix, this.hold];
            this.pos = {x: 3, y: 0};
        } else {
            this.hold = this.matrix;
            this.matrix = this.next;
            this.next = createPiece();
            this.pos = {x: 3, y: 0};
        }
        this.holdUsed = true;
        drawPreview(holdCtx, this.hold);
    }

    spawn() {
        this.matrix = this.next;
        this.next = createPiece();
        this.pos = {x: 3, y: 0};
        this.holdUsed = false;
        if (this.collide()) {
            this.board.matrix.clear();
            this.score = 0;
        }
        drawPreview(nextCtx, this.next);
    }

    reset() {
        this.matrix = createPiece();
        this.pos = {x: 3, y: 0};
        this.dropCounter = 0;
        this.dropInterval = 1000;
    }

    collide() {
        const m = this.matrix;
        const o = this.pos;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (this.board.matrix.data[y + o.y] &&
                     this.board.matrix.data[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    merge() {
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.board.matrix.data[y + this.pos.y][x + this.pos.x] = value;
                }
            });
        });
    }

    boardSweep() {
        let rowCount = 0;
        outer: for (let y = this.board.matrix.data.length - 1; y >= 0; --y) {
            if (this.board.matrix.data[y].every(value => value !== 0)) {
                const row = this.board.matrix.data.splice(y, 1)[0].fill(0);
                this.board.matrix.data.unshift(row);
                ++rowCount;
                ++y;
            }
        }
        return rowCount;
    }
}

class Board {
    constructor() {
        this.matrix = new Matrix(ROWS, COLS);
    }

    draw() {
        this.matrix.data.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = COLORS[value];
                    ctx.fillRect(x, y, 1, 1);
                } else {
                    ctx.fillStyle = '#111';
                    ctx.fillRect(x, y, 1, 1);
                    ctx.strokeStyle = '#222';
                    ctx.strokeRect(x, y, 1, 1);
                }
            });
        });
    }
}

function createPiece() {
    const index = (Math.random() * (SHAPES.length - 1) + 1) | 0;
    return SHAPES[index].map(row => row.slice());
}

function drawPreview(context, matrix) {
    context.clearRect(0, 0, 4, 4);
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x, y, 1, 1);
            }
        });
    });
}

const board = new Board();
const player = new Player(board);

let lastTime = 0;
function update(time = 0) {
    const delta = time - lastTime;
    lastTime = time;
    player.dropCounter += delta;
    if (player.dropCounter > player.dropInterval) {
        player.drop();
    }
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, COLS, ROWS);
    board.draw();
    drawMatrix(player.matrix, player.pos, ctx);
    scoreEl.textContent = 'Score: ' + player.score;
}

function drawMatrix(matrix, offset, context) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const keys = {
    ArrowLeft: () => player.move(-1),
    ArrowRight: () => player.move(1),
    ArrowDown: () => player.drop(),
    ArrowUp: () => player.rotate(),
    Space: () => { while (!player.collide()) { player.pos.y++; } player.pos.y--; player.merge(); player.boardSweep(); player.spawn(); },
    ShiftLeft: () => player.holdPiece()
};

document.addEventListener('keydown', event => {
    const handler = keys[event.code];
    if (handler) {
        event.preventDefault();
        handler();
    }
});

player.spawn();
update();
