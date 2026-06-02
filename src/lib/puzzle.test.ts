import { describe, expect, it } from 'vitest';
import { createPuzzle, evaluateSelection, isSelectionConnected, toggleCell } from './puzzle';

describe('puzzle engine', () => {
  it('creates the same puzzle for the same day key and seed', () => {
    const first = createPuzzle('2026-05-31', 12345);
    const second = createPuzzle('2026-05-31', 12345);
    expect(first).toEqual(second);
    expect(first.cells).toHaveLength(16);
    expect(first.maxMoves).toBe(6);
  });

  it('keeps a golden deterministic board for the 2026-06-01 MVP smoke date', () => {
    const puzzle = createPuzzle('2026-06-01', 2560141822);

    expect(puzzle.target).toBe(27);
    expect(puzzle.solutionIds).toEqual(['cell-11', 'cell-13', 'cell-14', 'cell-15']);
    expect(puzzle.cells.map((cell) => cell.value)).toEqual([2, 6, 6, 6, 5, 3, 4, 6, 5, 4, 6, 8, 7, 9, 2, 8]);
  });

  it('selects and unselects cells without mutating the original puzzle', () => {
    const puzzle = createPuzzle('2026-05-31', 12345);
    const selected = toggleCell(puzzle, puzzle.cells[0].id);
    expect(selected.cells[0].selected).toBe(true);
    expect(puzzle.cells[0].selected).toBe(false);

    const unselected = toggleCell(selected, puzzle.cells[0].id);
    expect(unselected.cells[0].selected).toBe(false);
  });

  it('creates a connected official solution for the daily puzzle', () => {
    const puzzle = createPuzzle('2026-05-31', 12345);
    const selectedPuzzle = puzzle.solutionIds.reduce((next, id) => toggleCell(next, id), puzzle);
    expect(isSelectionConnected(selectedPuzzle)).toBe(true);
  });

  it('evaluates solved state only when selected values match the target and form one connected path', () => {
    const puzzle = createPuzzle('2026-05-31', 12345);
    const selectedPuzzle = puzzle.solutionIds.reduce((next, id) => toggleCell(next, id), puzzle);
    const result = evaluateSelection(selectedPuzzle, 4);
    expect(result.solved).toBe(true);
    expect(result.score).toBeGreaterThan(0);
    expect(result.moves).toBe(4);

    const disconnectedPuzzle = {
      ...puzzle,
      target: puzzle.cells[0].value + puzzle.cells[15].value,
      cells: puzzle.cells.map((cell, index) => ({ ...cell, selected: index === 0 || index === 15 })),
    };
    expect(isSelectionConnected(disconnectedPuzzle)).toBe(false);
    expect(evaluateSelection(disconnectedPuzzle, 2).solved).toBe(false);
  });
});
