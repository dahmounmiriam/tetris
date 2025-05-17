from dataclasses import dataclass
from typing import List, Tuple
import random

from game.config import COLORS

SHAPES = [
    [[".....",
      ".....",
      "..O..",
      "..O..",
      "..O.."],
     [".....",
      ".....",
      "OOOO.",
      ".....",
      "....."]],

    [[".....",
      "..O..",
      "..O..",
      "..OO.",
      "....."],
     [".....",
      ".....",
      "OOO..",
      "O....",
      "....."],
     [".....",
      "..OO.",
      "..O..",
      "..O..",
      "....."],
     [".....",
      "...O.",
      "OOO..",
      ".....",
      "....."]],

    [[".....",
      "..O..",
      "..O..",
      "OO...",
      "....."],
     [".....",
      "O....",
      "OOO..",
      ".....",
      "....."],
     [".....",
      "..O..",
      "..O..",
      ".OO..",
      "....."],
     [".....",
      ".....",
      "OOO..",
      "..O..",
      "....."]],

    [[".....",
      ".....",
      "OO...",
      "OO...",
      "....."]],

    [[".....",
      ".....",
      ".OO..",
      "OO...",
      "....."],
     [".....",
      "O....",
      "OO...",
      ".O...",
      "....."]],

    [[".....",
      "..O..",
      "OOO..",
      ".....",
      "....."],
     [".....",
      "..O..",
      "..OO.",
      "..O..",
      "....."],
     [".....",
      ".....",
      "OOO..",
      "..O..",
      "....."],
     [".....",
      "..O..",
      "OO...",
      "..O..",
      "....."]],

    [[".....",
      ".....",
      "OO...",
      ".OO..",
      "....."],
     [".....",
      "..O..",
      "OO...",
      "O....",
      "....."]]
]

@dataclass
class Piece:
    x: int
    y: int
    shape: List[List[str]]
    color: Tuple[int, int, int]
    rotation: int = 0

    @staticmethod
    def random(x: int, y: int):
        index = random.randrange(len(SHAPES))
        return Piece(x, y, SHAPES[index], COLORS[index])

    def image(self) -> List[str]:
        return self.shape[self.rotation % len(self.shape)]

    def rotate(self):
        self.rotation = (self.rotation + 1) % len(self.shape)
