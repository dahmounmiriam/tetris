# Advanced Tetris Game

This repository contains an implementation of an advanced Tetris game using Python and Pygame.

## Features

- Classic Tetris gameplay on a 10x20 grid
- Piece rotation, movement, soft drop, and hard drop
- Hold piece functionality
- Next piece preview
- Scoring system and level progression

## Installation

1. Create a virtual environment (optional):
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Game

```bash
python -m game.main
```

Use the arrow keys to move pieces, **Up** to rotate, **Space** to hard drop, and **Left Shift** to hold a piece.

## Project Structure

- `game/`: Source code for the game
  - `main.py`: Game loop and Pygame setup
  - `board.py`: Board state management
  - `piece.py`: Tetris pieces and rotation logic
  - `config.py`: Game configuration constants

## License

MIT
