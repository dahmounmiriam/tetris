# Fix the import in board.py by changing from relative to absolute import
cat > tetris/game/board.py << 'EOF'
# Board class for Tetris
import pygame

# Changed from relative import to absolute import
from piece import Piece

class Board:
    def __init__(self):
        self.grid = [[0 for _ in range(10)] for _ in range(20)]
        self.current_piece = Piece()
        print("Board created")
EOF

# Show the updated file
cat tetris/game/board.py

# Try to run the main.py file to see if the import error is fixed
cd tetris/game/
python3 main.py