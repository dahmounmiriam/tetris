import React from 'react';
import { Canvas } from '@react-three/fiber';
import TetrisPiece from './TetrisPiece';
import '../styles/GameInfo.css';

const GameInfo = ({ gameState }) => {
  const { score, level, nextPiece, heldPiece, isGameOver } = gameState;
  
  return (
    <div className="game-info">
      <div className="info-panel">
        <h2>Score: {score}</h2>
        <h3>Level: {level}</h3>
        
        {isGameOver && (
          <div className="game-over">
            <h2>Game Over</h2>
            <p>Press 'New Game' to play again</p>
          </div>
        )}
      </div>
      
      <div className="preview-panels">
        <div className="preview-panel">
          <h3>Next Piece</h3>
          <div className="preview-canvas">
            {nextPiece && (
              <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <TetrisPiece 
                  shape={nextPiece.shape} 
                  position={[0, 0, 0]} 
                  color={nextPiece.color} 
                />
              </Canvas>
            )}
          </div>
        </div>
        
        <div className="preview-panel">
          <h3>Held Piece</h3>
          <div className="preview-canvas">
            {heldPiece && (
              <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <TetrisPiece 
                  shape={heldPiece.shape} 
                  position={[0, 0, 0]} 
                  color={heldPiece.color} 
                />
              </Canvas>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
