
# Web Tetris Game

## Features

- Classic Tetris gameplay on a 10x20 grid

- Piece rotation, hard drop, soft drop
- Hold piece ability
- Next piece preview
- Basic scoring

## Installation

1. (Optional) create a virtual environment:
=======
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

2. Install the dependency:


   ```bash
   pip install -r requirements.txt
   ```

## Running the Game

```bash
python app.py
```

Open `http://localhost:5000` in your browser and use the arrow keys to play.

## Project Structure

- `app.py` – Flask application serving the game
- `web/templates/index.html` – main HTML page
- `web/static/tetris.js` – game logic implemented in JavaScript
- `web/static/style.css` – styling
- Legacy Pygame files remain in `game/` but are no longer used.

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

