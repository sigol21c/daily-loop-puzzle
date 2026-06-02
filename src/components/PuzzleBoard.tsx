import type { LocaleMessages } from '../i18n/types';
import type { Puzzle } from '../lib/puzzle';

type PuzzleBoardProps = {
  puzzle: Puzzle;
  selectedTotal: number;
  movesUsed: number;
  connected: boolean;
  disabled: boolean;
  messages: LocaleMessages['puzzle'];
  helperText?: string;
  onCellClick: (id: string) => void;
};

export function PuzzleBoard({ puzzle, selectedTotal, movesUsed, connected, disabled, messages, helperText, onCellClick }: PuzzleBoardProps) {
  const movesLeft = Math.max(0, puzzle.maxMoves - movesUsed);

  return (
    <section className="board-card" aria-label="today puzzle board">
      <div className="target-row">
        <div>
          <span>{messages.target}</span>
          <strong>{puzzle.target}</strong>
        </div>
        <div>
          <span>{messages.selected}</span>
          <strong>{selectedTotal}</strong>
        </div>
        <div>
          <span>{messages.moves}</span>
          <strong>{movesUsed}/{puzzle.maxMoves}</strong>
        </div>
      </div>

      <div className="board" role="grid" aria-label={messages.boardLabel}>
        {puzzle.cells.map((cell) => {
          const blockNewSelection = disabled || (!cell.selected && movesLeft <= 0);
          return (
            <button
              aria-label={messages.tileLabel(cell.value, cell.selected)}
              aria-pressed={cell.selected}
              className={`cell ${cell.selected ? 'selected' : ''} ${cell.hint}`}
              disabled={blockNewSelection}
              key={cell.id}
              onClick={() => onCellClick(cell.id)}
              role="gridcell"
              type="button"
            >
              {cell.value}
            </button>
          );
        })}
      </div>

      <p className="hint">
        {helperText ? `${helperText} ` : ''}{connected ? messages.connectedHint : messages.disconnectedHint} {messages.moves} {movesLeft}.
      </p>
    </section>
  );
}
