import { useEffect } from 'react';

export const useKeyboardControls = ({
  onLeft,
  onRight,
  onDown,
  onUp,
  onSpace,
  onShift,
  onP,
  onR
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          onLeft && onLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onRight && onRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onDown && onDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onUp && onUp();
          break;
        case 'Space':
          event.preventDefault();
          onSpace && onSpace();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          event.preventDefault();
          onShift && onShift();
          break;
        case 'KeyP':
          event.preventDefault();
          onP && onP();
          break;
        case 'KeyR':
          event.preventDefault();
          onR && onR();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onLeft, onRight, onDown, onUp, onSpace, onShift, onP, onR]);
};
