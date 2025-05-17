import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const TetrisPiece = ({ shape, position, color, isGhost = false }) => {
  const groupRef = useRef();
  
  // Add subtle animation for the active piece
  useFrame((state) => {
    if (!isGhost && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 0.05;
    }
  });
  
  return (
    <group position={position} ref={groupRef}>
      {shape.map((row, y) => 
        row.map((cell, x) => {
          if (cell) {
            return (
              <Box 
                key={`${x}-${y}`}
                args={[0.95, 0.95, 0.95]}
                position={[x + 0.5, 0, y + 0.5]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial 
                  color={color} 
                  transparent={isGhost}
                  opacity={isGhost ? 0.3 : 1}
                  emissive={isGhost ? '#000000' : color}
                  emissiveIntensity={isGhost ? 0 : 0.2}
                />
              </Box>
            );
          }
          return null;
        })
      )}
    </group>
  );
};

export default TetrisPiece;
