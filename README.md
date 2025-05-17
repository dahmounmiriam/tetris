# Enhanced 3D Tetris Game

A modern implementation of the classic Tetris game using React.js and Three.js for enhanced 3D visuals and user experience.

## Features

- 3D game board and tetromino pieces using Three.js
- Responsive design that works on various screen sizes
- Smooth animations and visual effects
- Hold piece functionality
- Next piece preview
- Score tracking and level progression
- Classic 2D mode still available

## Technologies Used

- React.js for the UI components
- Three.js for 3D rendering
- React Three Fiber for integrating Three.js with React
- Flask for the backend server

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8 or higher
- pip

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tetris.git
cd tetris
```

2. Install Python dependencies

```bash
python -m venv venv  # Optional: Create a virtual environment
source venv/bin/activate  # Optional: Activate the virtual environment
pip install -r requirements.txt
```

3. Install Node.js dependencies

```bash
npm install
# or
yarn install
```

4. Build the React application

```bash
npm run build
# or
yarn build
```

5. Start the Flask server

```bash
python app.py
```

6. Open your browser and navigate to `http://localhost:5000`

## Development

To run the application in development mode:

1. Start the Flask server

```bash
python app.py
```

2. In a separate terminal, start the React development server

```bash
npm run dev
# or
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Game Controls

- Arrow Left/Right: Move piece horizontally
- Arrow Down: Move piece down
- Arrow Up: Rotate piece
- Space: Hard drop
- Shift: Hold piece
- P: Pause game
- R: Reset game

## Project Structure

- `app.py` – Flask application serving both classic and enhanced versions
- `web/templates/index.html` – Classic 2D version HTML page
- `web/static/tetris.js` – Classic game logic in JavaScript
- `web/static/style.css` – Classic version styling
- `src/` – React application source code for the enhanced 3D version
- `game/` – Pygame implementation (can be run separately with `python -m game.main`)

## License

MIT
