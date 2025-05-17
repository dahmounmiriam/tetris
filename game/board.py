from typing import List, Tuple, Optional
import pygame

from piece import Piece
from config import GRID_WIDTH, GRID_HEIGHT, CELL_SIZE, COLORS, BLACK, GRAY


Position = Tuple[int, int]

class Board:
    def __init__(self):
        self.grid: List[List[Optional[Tuple[int, int, int]]]] = [
            [None for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)
        ]
        self.locked_positions: dict[Position, Tuple[int, int, int]] = {}
        self.score = 0
        self.level = 1

    def valid_space(self, piece: Piece, offset: Position=(0,0)) -> bool:
        accepted_positions = [
            (j, i) for i in range(GRID_HEIGHT) for j in range(GRID_WIDTH)
            if self.grid[i][j] is None
        ]
        formatted = self._convert_piece_format(piece, offset)
        for pos in formatted:
            if pos not in accepted_positions:
                if pos[1] > -1:
                    return False
        return True

    def _convert_piece_format(self, piece: Piece, offset: Position=(0,0)) -> List[Position]:
        positions: List[Position] = []
        pattern = piece.image()
        for i, line in enumerate(pattern):
            row = list(line)
            for j, column in enumerate(row):
                if column == 'O':
                    positions.append((piece.x + j + offset[0] - 2, piece.y + i + offset[1] - 4))
        return positions

    def add_piece(self, piece: Piece):
        for pos in self._convert_piece_format(piece):
            x, y = pos
            if y > -1:
                self.locked_positions[(x, y)] = piece.color

    def clear_lines(self) -> int:
        lines_cleared = 0
        for i in range(GRID_HEIGHT-1, -1, -1):
            row = [self.locked_positions.get((j, i)) for j in range(GRID_WIDTH)]
            if None not in row:
                lines_cleared += 1
                for j in range(GRID_WIDTH):
                    try:
                        del self.locked_positions[(j, i)]
                    except KeyError:
                        pass
                for y in sorted([y for (_, y) in self.locked_positions.keys() if y < i], reverse=True):
                    for x in range(GRID_WIDTH):
                        if (x, y) in self.locked_positions:
                            self.locked_positions[(x, y+1)] = self.locked_positions.pop((x, y))
        self.score += lines_cleared ** 2 * 100
        self.level = 1 + self.score // 1000
        return lines_cleared

    def draw(self, surface: pygame.Surface):
        for i in range(GRID_HEIGHT):
            for j in range(GRID_WIDTH):
                rect = pygame.Rect(j*CELL_SIZE, i*CELL_SIZE, CELL_SIZE, CELL_SIZE)
                color = self.locked_positions.get((j, i), BLACK)
                pygame.draw.rect(surface, color, rect)
                pygame.draw.rect(surface, GRAY, rect, 1)
