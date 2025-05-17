import React from 'react';
import '../styles/GameControls.css';

const GameControls = ({ gameState, updateGameState }) => {
  const { isPaused, isGameOver } = gameState;
  
  const handleStartPause = () => {
    updateGameState({ isPaused: !isPaused });
  };
  
  const handleReset = () => {
    updateGameState({ isGameOver: false, isPaused: false });
    // The actual game reset is handled in the TetrisGame component
  };
  
  return (
    <div className="game-controls">
      <button 
        className="control-button"
        onClick={handleStartPause}
        disabled={isGameOver}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      
      <button 
        className="control-button"
        onClick={handleReset}
      >
        New Game
      </button>
      
      <div className="controls-info">
        <h3>Controls:</h3>
        <p>← → : Move left/right</p>
        <p>↓ : Move down</p>
        <p>↑ : Rotate</p>
        <p>Space : Hard drop</p>
        <p>Shift : Hold piece</p>
        <p>P : Pause game</p>
        <p>R : Reset game</p>
      </div>
    </div>
  );
};

export default GameControls;
