import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildShareText, shareOrCopy } from './share';

describe('share text', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds spoiler-free share text with day, result, moves, score, and grid', () => {
    const text = buildShareText({
      dayKey: '2026-05-31',
      solved: true,
      moves: 4,
      maxMoves: 6,
      score: 840,
      selectedPattern: [true, false, true, false, false, true, false, true],
    });
    expect(text).toContain('Daily Loop Puzzle #2026-05-31');
    expect(text).toContain('✅ 4/6 moves · 840 pts');
    expect(text).toContain('🟩⬜🟩⬜');
    expect(text).not.toContain('target');
  });

  it('builds localized Korean share text while keeping the brand/date stable', () => {
    const text = buildShareText({
      dayKey: '2026-05-31',
      solved: true,
      moves: 4,
      maxMoves: 6,
      score: 840,
      selectedPattern: [true, false, true, false],
    }, 'ko');

    expect(text).toContain('Daily Loop Puzzle #2026-05-31');
    expect(text).toContain('✅ 4/6 moves · 840점');
  });

  it('uses native Web Share when available', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share });

    await expect(shareOrCopy('result text')).resolves.toBe('shared');
    expect(share).toHaveBeenCalledWith({ text: 'result text' });
  });

  it('falls back to clipboard copy when native Web Share is unavailable', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await expect(shareOrCopy('result text')).resolves.toBe('copied');
    expect(writeText).toHaveBeenCalledWith('result text');
  });

  it('falls back to clipboard copy when native Web Share rejects', async () => {
    const share = vi.fn().mockRejectedValue(new Error('share unavailable'));
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { share, clipboard: { writeText } });

    await expect(shareOrCopy('result text')).resolves.toBe('copied');
    expect(share).toHaveBeenCalledWith({ text: 'result text' });
    expect(writeText).toHaveBeenCalledWith('result text');
  });

  it('rejects when clipboard fallback fails so the UI can show manual copy text', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('clipboard blocked'));
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await expect(shareOrCopy('result text')).rejects.toThrow('clipboard blocked');
    expect(writeText).toHaveBeenCalledWith('result text');
  });

  it('rejects when both share and clipboard copy are unavailable so the UI can show manual copy text', async () => {
    vi.stubGlobal('navigator', {});

    await expect(shareOrCopy('result text')).rejects.toThrow('Clipboard copy is unavailable');
  });
});
