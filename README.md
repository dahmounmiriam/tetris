# Web Tetris Game

This project provides a simple Tetris implementation playable in the browser. A small Flask server serves the HTML/JavaScript files.

## Features

- Classic Tetris gameplay on a 10x20 grid
- Piece rotation, hard drop, soft drop
- Hold piece ability
- Next piece preview
- Basic scoring

## Installation

1. (Optional) create a virtual environment:
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
