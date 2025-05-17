from dataclasses import dataclass

# Screen dimensions
SCREEN_WIDTH = 400
SCREEN_HEIGHT = 500

GRID_WIDTH = 10
GRID_HEIGHT = 20
CELL_SIZE = 20

PLAY_WIDTH = GRID_WIDTH * CELL_SIZE
PLAY_HEIGHT = GRID_HEIGHT * CELL_SIZE

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (128, 128, 128)

COLORS = [
    (0, 255, 255),  # I
    (0, 0, 255),    # J
    (255, 165, 0),  # L
    (255, 255, 0),  # O
    (0, 255, 0),    # S
    (128, 0, 128),  # T
    (255, 0, 0)     # Z
]

@dataclass
class GameConfig:
    screen_width: int = SCREEN_WIDTH
    screen_height: int = SCREEN_HEIGHT
    grid_width: int = GRID_WIDTH
    grid_height: int = GRID_HEIGHT
    cell_size: int = CELL_SIZE

    @property
    def play_width(self):
        return self.grid_width * self.cell_size

    @property
    def play_height(self):
        return self.grid_height * self.cell_size
