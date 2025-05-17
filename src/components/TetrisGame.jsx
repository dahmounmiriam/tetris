import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useTetrisBoard } from '../hooks/useTetrisBoard';
import TetrisBoard from './TetrisBoard';
import TetrisPiece from './TetrisPiece';

const COLS = 10;
const ROWS = 20;

const TetrisGame = ({ updateGameState, gameState }) => {
  const { isPaused, isGameOver } = gameState;
  const gameRef = useRef();
  
  const {
    board,
    currentPiece,
    nextPiece,
    heldPiece,
    score,
    level,
    holdPiece,
    movePiece,
    rotatePiece,
    dropPiece,
    hardDrop,
    resetGame
  } = useTetrisBoard(COLS, ROWS);

  // Update parent component with game state
  useEffect(() => {
    updateGameState({
      score,
      level,
      nextPiece,
      heldPiece,
    });
  }, [score, level, nextPiece, heldPiece, updateGameState]);

  // Handle keyboard controls
  useKeyboardControls({
    onLeft: () => !isPaused && !isGameOver && movePiece(-1, 0),
    onRight: () => !isPaused && !isGameOver && movePiece(1, 0),
    onDown: () => !isPaused && !isGameOver && dropPiece(),
    onUp: () => !isPaused && !isGameOver && rotatePiece(),
    onSpace: () => !isPaused && !isGameOver && hardDrop(),
    onShift: () => !isPaused && !isGameOver && holdPiece(),
    onP: () => updateGameState({ isPaused: !isPaused }),
    onR: () => {
      resetGame();
      updateGameState({ isGameOver: false, isPaused: false });
    }
  });

  // Game loop
  useFrame((_, delta) => {
    if (isPaused || isGameOver) return;
    
    // Game logic will be handled in the useTetrisBoard hook
  });

  return (
    <group ref={gameRef}>
      <TetrisBoard board={board} />
      {currentPiece && (
        <TetrisPiece 
          shape={currentPiece.shape} 
          position={[currentPiece.x - COLS/2, 0, currentPiece.y - ROWS/2]} 
          color={currentPiece.color} 
        />
      )}
    </group>
  );
};

export default TetrisGame;
