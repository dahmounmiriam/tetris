import React from 'react';
import { Box } from '@react-three/drei';

const TetrisBoard = ({ board }) => {
  const COLS = board[0].length;
  const ROWS = board.length;
  
  return (
    <group position={[-COLS/2, -0.5, -ROWS/2]}>
      {/* Board background */}
      <Box args={[COLS, 1, ROWS]} position={[COLS/2, -0.5, ROWS/2]}>
        <meshStandardMaterial color="#222" />
      </Box>
      
      {/* Render filled cells */}
      {board.map((row, y) => 
        row.map((cell, x) => {
          if (cell) {
            return (
              <group key={`${x}-${y}`} position={[x, 0, y]}>
                <Box 
                  args={[0.95, 0.95, 0.95]} 
                  position={[0.5, 0, 0.5]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial color={getColorFromValue(cell)} />
                </Box>
              </group>
            );
          }
          return null;
        })
      )}
      
      {/* Grid lines */}
      {Array.from({ length: COLS + 1 }).map((_, i) => (
        <line 
          key={`vertical-${i}`}
          points={[
            [i, 0, 0],
            [i, 0, ROWS]
          ]}
        >
          <lineBasicMaterial color="#444" />
        </line>
      ))}
      
      {Array.from({ length: ROWS + 1 }).map((_, i) => (
        <line 
          key={`horizontal-${i}`}
          points={[
            [0, 0, i],
            [COLS, 0, i]
          ]}
        >
          <lineBasicMaterial color="#444" />
        </line>
      ))}
    </group>
  );
};

// Helper function to get color from cell value
const getColorFromValue = (value) => {
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
  
  return COLORS[value] || '#FFFFFF';
};

export default TetrisBoard;
