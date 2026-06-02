import { seededRandom } from './dateSeed';

export type PuzzleCell = {
  id: string;
  value: number;
  selected: boolean;
  hint: 'low' | 'mid' | 'high';
};

export type Puzzle = {
  dayKey: string;
  target: number;
  cells: PuzzleCell[];
  maxMoves: number;
  solutionIds: string[];
};

export type PuzzleResult = {
  solved: boolean;
  moves: number;
  score: number;
  selectedTotal: number;
  connected: boolean;
};

const BOARD_SIZE = 4;
const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;
const SOLUTION_LENGTH = 4;

function hintForValue(value: number): PuzzleCell['hint'] {
  if (value <= 3) return 'low';
  if (value <= 6) return 'mid';
  return 'high';
}

function idForIndex(index: number): string {
  return `cell-${index}`;
}

function indexForId(id: string): number {
  return Number(id.replace('cell-', ''));
}

function neighbors(index: number): number[] {
  const row = Math.floor(index / BOARD_SIZE);
  const col = index % BOARD_SIZE;
  const result: number[] = [];
  if (row > 0) result.push(index - BOARD_SIZE);
  if (row < BOARD_SIZE - 1) result.push(index + BOARD_SIZE);
  if (col > 0) result.push(index - 1);
  if (col < BOARD_SIZE - 1) result.push(index + 1);
  return result;
}

function shuffled<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildConnectedSolution(random: () => number): number[] {
  for (let attempt = 0; attempt < 32; attempt += 1) {
    const path = [Math.floor(random() * CELL_COUNT)];

    while (path.length < SOLUTION_LENGTH) {
      const frontier = shuffled(
        [...new Set(path.flatMap((index) => neighbors(index)).filter((index) => !path.includes(index)))],
        random,
      );
      const next = frontier[0];
      if (next === undefined) break;
      path.push(next);
    }

    if (path.length === SOLUTION_LENGTH) {
      return [...path].sort((a, b) => a - b);
    }
  }

  // Deterministic fallback: first row is always connected.
  return [0, 1, 2, 3];
}

export function createPuzzle(dayKey: string, seed: number): Puzzle {
  const random = seededRandom(seed);
  const values = Array.from({ length: CELL_COUNT }, () => 1 + Math.floor(random() * 9));
  const solutionIndexes = buildConnectedSolution(random);
  const solutionIds = solutionIndexes.map(idForIndex);
  const target = solutionIndexes.reduce((sum, index) => sum + values[index], 0);

  return {
    dayKey,
    target,
    maxMoves: 6,
    solutionIds,
    cells: values.map((value, index) => ({
      id: idForIndex(index),
      value,
      selected: false,
      hint: hintForValue(value),
    })),
  };
}

export function toggleCell(puzzle: Puzzle, id: string): Puzzle {
  return {
    ...puzzle,
    cells: puzzle.cells.map((cell) => (cell.id === id ? { ...cell, selected: !cell.selected } : cell)),
  };
}

export function selectedTotal(puzzle: Puzzle): number {
  return puzzle.cells.filter((cell) => cell.selected).reduce((sum, cell) => sum + cell.value, 0);
}

export function isSelectionConnected(puzzle: Puzzle): boolean {
  const selectedIndexes = puzzle.cells.filter((cell) => cell.selected).map((cell) => indexForId(cell.id));
  if (selectedIndexes.length === 0) return false;

  const selectedSet = new Set(selectedIndexes);
  const visited = new Set<number>();
  const queue = [selectedIndexes[0]];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined || visited.has(current)) continue;
    visited.add(current);
    for (const next of neighbors(current)) {
      if (selectedSet.has(next) && !visited.has(next)) {
        queue.push(next);
      }
    }
  }

  return visited.size === selectedIndexes.length;
}

export function evaluateSelection(puzzle: Puzzle, moves: number): PuzzleResult {
  const total = selectedTotal(puzzle);
  const connected = isSelectionConnected(puzzle);
  // MVP v1 uses the UX-approved fallback: orthogonally connected selected tiles + target sum.
  // This preserves the "loop" feel visually without overbuilding full loop graph validation.
  const solved = total === puzzle.target && connected;
  const selectedCount = puzzle.cells.filter((cell) => cell.selected).length;
  const distancePenalty = Math.abs(puzzle.target - total) * 20;
  const movePenalty = Math.max(0, moves - 1) * 80;
  const countBonus = selectedCount === puzzle.solutionIds.length ? 120 : 0;
  const score = Math.max(0, 1000 - distancePenalty - movePenalty + (solved ? 250 : 0) + countBonus);

  return {
    solved,
    moves,
    score,
    selectedTotal: total,
    connected,
  };
}
