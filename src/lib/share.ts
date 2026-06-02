import { messagesFor, type LocaleCode } from '../i18n/locales';

export type ShareInput = {
  dayKey: string;
  solved: boolean;
  moves: number;
  maxMoves: number;
  score: number;
  selectedPattern: boolean[];
};

export function buildShareText(input: ShareInput, locale: LocaleCode = 'en'): string {
  const messages = messagesFor(locale);
  const rows: string[] = [];
  for (let index = 0; index < input.selectedPattern.length; index += 4) {
    rows.push(input.selectedPattern.slice(index, index + 4).map((selected) => (selected ? '🟩' : '⬜')).join(''));
  }

  return [
    `Daily Loop Puzzle #${input.dayKey}`,
    messages.share.resultLine(input.solved, input.moves, input.maxMoves, input.score),
    ...rows,
  ].join('\n');
}

export async function shareOrCopy(text: string): Promise<'shared' | 'copied'> {
  if ('share' in navigator && typeof navigator.share === 'function') {
    try {
      await navigator.share({ text });
      return 'shared';
    } catch {
      // Some browsers expose Web Share but reject it outside supported contexts.
      // Keep the user's result recoverable by trying clipboard before the UI
      // falls back to the visible manual-copy text.
    }
  }

  if (!('clipboard' in navigator) || typeof navigator.clipboard?.writeText !== 'function') {
    throw new Error('Clipboard copy is unavailable');
  }

  await navigator.clipboard.writeText(text);
  return 'copied';
}
