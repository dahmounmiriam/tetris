import { useState, useEffect, useCallback, useRef } from 'react';

// Tetromino shapes
const SHAPES = [
  [], // Empty for 1-based indexing
  [
    [1, 1, 1, 1] // I
  ],
  [
    [2, 0, 0],
    [2, 2, 2]    // J
  ],
  [
    [0, 0, 3],
    [3, 3, 3]    // L
  ],
  [
    [4, 4],
    [4, 4]       // O
  ],
  [
    [0, 5, 5],
    [5, 5, 0]    // S
  ],
  [
    [0, 6, 0],
    [6, 6, 6]    // T
  ],
  [
    [7, 7, 0],
    [0, 7, 7]    // Z
  ]
];

// Colors for each tetromino
const COLORS = [
  null,
  '#00FFFF', // I - Cyan
  '#0000FF', // J - Blue
  '#FFA500', // L - Orange
  '#FFFF00', // O - Yellow
  '#00FF00', // S - Green
  '#800080', // T - Purple
  '#FF0000'  // Z - Red
];

export const useTetrisBoard = (cols, rows) => {
  // Create empty board
  const createEmptyBoard = () => Array(rows).fill().map(() => Array(cols).fill(0));
  
  // Game state
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [heldPiece, setHeldPiece] = useState(null);
  const [holdUsed, setHoldUsed] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  
  // Refs for game loop
  const dropCounter = useRef(0);
  const dropInterval = useRef(1000);
  const lastTime = useRef(0);
  
  // Create a random piece
  const createRandomPiece = useCallback(() => {
    const shapeIndex = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
    const shape = SHAPES[shapeIndex].map(row => [...row]);
    return {
      shape,
      x: Math.floor(cols / 2) - Math.floor(shape[0].length / 2),
      y: 0,
      color: COLORS[shapeIndex]
    };
  }, [cols]);
  
  // Initialize game
  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createRandomPiece());
    }
    if (!nextPiece) {
      setNextPiece(createRandomPiece());
    }
  }, [currentPiece, nextPiece, createRandomPiece]);
  
  // Check if piece collides with board
  const checkCollision = useCallback((piece, offsetX = 0, offsetY = 0) => {
    if (!piece) return true;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const newX = piece.x + x + offsetX;
          const newY = piece.y + y + offsetY;
          
          // Check boundaries
          if (newX < 0 || newX >= cols || newY >= rows) {
            return true;
          }
          
          // Check if cell is already filled
          if (newY >= 0 && board[newY][newX] !== 0) {
            return true;
          }
        }
      }
    }
    
    return false;
  }, [board, cols, rows]);
  
  // Move piece
  const movePiece = useCallback((x, y) => {
    if (!currentPiece || gameOver) return false;
    
    if (!checkCollision(currentPiece, x, y)) {
      setCurrentPiece(prev => ({
        ...prev,
        x: prev.x + x,
        y: prev.y + y
      }));
      return true;
    }
    
    return false;
  }, [currentPiece, checkCollision, gameOver]);
  
  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    // Create a copy of the current piece
    const newPiece = {
      ...currentPiece,
      shape: currentPiece.shape.map(row => [...row])
    };
    
    // Transpose the matrix
    for (let y = 0; y < newPiece.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [newPiece.shape[x][y], newPiece.shape[y][x]] = 
        [newPiece.shape[y][x], newPiece.shape[x][y]];
      }
    }
    
    // Reverse each row
    newPiece.shape.forEach(row => row.reverse());
    
    // Check if rotation is valid
    if (!checkCollision(newPiece)) {
      setCurrentPiece(newPiece);
    } else {
      // Try wall kicks (offset the piece if rotation near wall)
      for (const offset of [-1, 1, -2, 2]) {
        const kickedPiece = { ...newPiece, x: newPiece.x + offset };
        if (!checkCollision(kickedPiece)) {
          setCurrentPiece(kickedPiece);
          return;
        }
      }
    }
  }, [currentPiece, checkCollision, gameOver]);
  
  // Merge piece with board
  const mergePiece = useCallback(() => {
    if (!currentPiece) return;
    
    const newBoard = [...board.map(row => [...row])];
    
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + currentPiece.y;
          const boardX = x + currentPiece.x;
          
          if (boardY >= 0 && boardY < rows && boardX >= 0 && boardX < cols) {
            newBoard[boardY][boardX] = value;
          }
        }
      });
    });
    
    setBoard(newBoard);
  }, [currentPiece, board, cols, rows]);
  
  // Clear completed lines
  const clearLines = useCallback(() => {
    let linesCleared = 0;
    
    const newBoard = board.filter(row => {
      const isRowFull = row.every(cell => cell !== 0);
      if (isRowFull) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    // Add new empty rows at the top
    while (newBoard.length < rows) {
      newBoard.unshift(Array(cols).fill(0));
    }
    
    if (linesCleared > 0) {
      // Update score based on lines cleared
      const points = [0, 100, 300, 500, 800][linesCleared] * level;
      setScore(prev => prev + points);
      
      // Update level every 10 lines
      const totalLines = Math.floor(score / 100) + linesCleared;
      const newLevel = Math.floor(totalLines / 10) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // Increase speed with level
        dropInterval.current = Math.max(100, 1000 - (newLevel - 1) * 100);
      }
      
      setBoard(newBoard);
    }
    
    return linesCleared;
  }, [board, level, score, cols, rows]);
  
  // Spawn next piece
  const spawnNextPiece = useCallback(() => {
    setCurrentPiece(nextPiece);
    setNextPiece(createRandomPiece());
    setHoldUsed(false);
    
    // Check if game is over (collision on spawn)
    if (checkCollision(nextPiece)) {
      setGameOver(true);
    }
  }, [nextPiece, createRandomPiece, checkCollision]);
  
  // Drop piece one step
  const dropPiece = useCallback(() => {
    if (!movePiece(0, 1)) {
      // Piece has landed
      mergePiece();
      clearLines();
      spawnNextPiece();
      return false;
    }
    return true;
  }, [movePiece, mergePiece, clearLines, spawnNextPiece]);
  
  // Hard drop
  const hardDrop = useCallback(() => {
    while (movePiece(0, 1)) {
      // Keep moving down until collision
    }
    mergePiece();
    clearLines();
    spawnNextPiece();
  }, [movePiece, mergePiece, clearLines, spawnNextPiece]);
  
  // Hold piece
  const holdPiece = useCallback(() => {
    if (holdUsed || !currentPiece) return;
    
    if (heldPiece) {
      // Swap current and held pieces
      const shape = SHAPES[heldPiece.shape[0].find(val => val !== 0) || heldPiece.shape[1].find(val => val !== 0)];
      const newCurrentPiece = {
        shape: shape.map(row => [...row]),
        x: Math.floor(cols / 2) - Math.floor(shape[0].length / 2),
        y: 0,
        color: heldPiece.color
      };
      
      setHeldPiece({
        shape: currentPiece.shape,
        color: currentPiece.color
      });
      setCurrentPiece(newCurrentPiece);
    } else {
      // Store current piece and get next piece
      setHeldPiece({
        shape: currentPiece.shape,
        color: currentPiece.color
      });
      spawnNextPiece();
    }
    
    setHoldUsed(true);
  }, [currentPiece, heldPiece, holdUsed, spawnNextPiece, cols]);
  
  // Reset game
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(createRandomPiece());
    setNextPiece(createRandomPiece());
    setHeldPiece(null);
    setHoldUsed(false);
    setScore(0);
    setLevel(1);
    setGameOver(false);
    dropInterval.current = 1000;
  }, [createRandomPiece]);
  
  // Game loop
  useEffect(() => {
    const update = (time = 0) => {
      if (gameOver) return;
      
      const deltaTime = time - lastTime.current;
      lastTime.current = time;
      
      dropCounter.current += deltaTime;
      if (dropCounter.current > dropInterval.current) {
        dropPiece();
        dropCounter.current = 0;
      }
      
      requestAnimationFrame(update);
    };
    
    const animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [dropPiece, gameOver]);
  
  return {
    board,
    currentPiece,
    nextPiece,
    heldPiece,
    score,
    level,
    gameOver,
    holdPiece,
    movePiece,
    rotatePiece,
    dropPiece,
    hardDrop,
    resetGame
  };
};
