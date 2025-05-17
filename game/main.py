import pygame
from .config import GameConfig, BLACK, WHITE, GRID_WIDTH
from .board import Board
from .piece import Piece


def draw_window(surface: pygame.Surface, board: Board, current_piece: Piece, next_piece: Piece, held_piece: Piece | None, config: GameConfig):
    surface.fill(BLACK)
    board.draw(surface)

    # Draw current piece
    for x, y in board._convert_piece_format(current_piece):
        if y > -1:
            rect = pygame.Rect(x*config.cell_size, y*config.cell_size, config.cell_size, config.cell_size)
            pygame.draw.rect(surface, current_piece.color, rect)
    
    # Draw next piece preview
    font = pygame.font.SysFont('Arial', 18)
    label = font.render('Next', True, WHITE)
    surface.blit(label, (config.play_width + 20, 20))
    for i, line in enumerate(next_piece.image()):
        for j, ch in enumerate(line):
            if ch == 'O':
                rect = pygame.Rect(config.play_width + 20 + j*config.cell_size, 40 + i*config.cell_size, config.cell_size, config.cell_size)
                pygame.draw.rect(surface, next_piece.color, rect)

    # Draw held piece
    if held_piece:
        label = font.render('Hold', True, WHITE)
        surface.blit(label, (config.play_width + 20, 120))
        for i, line in enumerate(held_piece.image()):
            for j, ch in enumerate(line):
                if ch == 'O':
                    rect = pygame.Rect(config.play_width + 20 + j*config.cell_size, 140 + i*config.cell_size, config.cell_size, config.cell_size)
                    pygame.draw.rect(surface, held_piece.color, rect)
    
    # Score
    score_label = font.render(f'Score: {board.score}', True, WHITE)
    level_label = font.render(f'Level: {board.level}', True, WHITE)
    surface.blit(score_label, (config.play_width + 20, 220))
    surface.blit(level_label, (config.play_width + 20, 240))
    
    pygame.display.update()


def main():
    pygame.init()
    config = GameConfig()
    surface = pygame.display.set_mode((config.screen_width, config.screen_height))
    pygame.display.set_caption('Advanced Tetris')
    clock = pygame.time.Clock()

    board = Board()
    current_piece = Piece.random(GRID_WIDTH // 2, 0)
    next_piece = Piece.random(GRID_WIDTH // 2, 0)
    held_piece = None
    hold_used = False

    running = True
    fall_time = 0
    fall_speed = 0.5

    while running:
        fall_time += clock.get_rawtime()
        clock.tick()

        if fall_time / 1000 >= max(0.1, fall_speed - (board.level - 1) * 0.02):
            fall_time = 0
            if board.valid_space(current_piece, (0, 1)):
                current_piece.y += 1
            else:
                board.add_piece(current_piece)
                board.clear_lines()
                current_piece = next_piece
                next_piece = Piece.random(GRID_WIDTH // 2, 0)
                hold_used = False
                if not board.valid_space(current_piece):
                    running = False

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and board.valid_space(current_piece, (-1, 0)):
                    current_piece.x -= 1
                if event.key == pygame.K_RIGHT and board.valid_space(current_piece, (1, 0)):
                    current_piece.x += 1
                if event.key == pygame.K_DOWN and board.valid_space(current_piece, (0, 1)):
                    current_piece.y += 1
                if event.key == pygame.K_UP:
                    rotated = Piece(current_piece.x, current_piece.y, current_piece.shape, current_piece.color, current_piece.rotation)
                    rotated.rotate()
                    if board.valid_space(rotated):
                        current_piece.rotate()
                if event.key == pygame.K_SPACE:
                    while board.valid_space(current_piece, (0, 1)):
                        current_piece.y += 1
                    board.add_piece(current_piece)
                    board.clear_lines()
                    current_piece = next_piece
                    next_piece = Piece.random(GRID_WIDTH // 2, 0)
                    hold_used = False
                if event.key == pygame.K_LSHIFT and not hold_used:
                    if held_piece is None:
                        held_piece = Piece(GRID_WIDTH // 2, 0, current_piece.shape, current_piece.color)
                        current_piece = next_piece
                        next_piece = Piece.random(GRID_WIDTH // 2, 0)
                    else:
                        held_piece, current_piece = Piece(GRID_WIDTH // 2, 0, current_piece.shape, current_piece.color), Piece(GRID_WIDTH // 2, 0, held_piece.shape, held_piece.color)
                    hold_used = True
        draw_window(surface, board, current_piece, next_piece, held_piece, config)

    pygame.quit()


if __name__ == '__main__':
    main()
