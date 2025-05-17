import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TetrisGame from './components/TetrisGame';
import GameControls from './components/GameControls';
import GameInfo from './components/GameInfo';
import './styles/App.css';

function App() {
  const [gameState, setGameState] = useState({
    score: 0,
    level: 1,
    nextPiece: null,
    heldPiece: null,
    isGameOver: false,
    isPaused: false
  });

  const updateGameState = (newState) => {
    setGameState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <div className="app-container">
      <div className="game-container">
        <Canvas className="game-canvas" camera={{ position: [0, 10, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} castShadow />
          <TetrisGame updateGameState={updateGameState} gameState={gameState} />
          <OrbitControls enableZoom={false} enablePan={false} />
          <gridHelper args={[20, 20, 0x888888, 0x444444]} />
        </Canvas>
        <GameControls gameState={gameState} updateGameState={updateGameState} />
      </div>
      <GameInfo gameState={gameState} />
    </div>
  );
}

export default App;
