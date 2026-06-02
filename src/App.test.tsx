import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, beforeEach } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('App onboarding and language behavior', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('shows a first-run demo invitation and lets the user skip into today without being forced again', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /learn with a 20-second example/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /skip and play today/i }));

    expect(screen.getByRole('grid', { name: /4 by 4 number puzzle/i })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('daily-loop-puzzle:onboarding:v1') ?? '{}')).toMatchObject({ skipped: true });

    fireEvent.click(screen.getByRole('button', { name: /home/i }));
    expect(screen.queryByRole('heading', { name: /learn with a 20-second example/i })).not.toBeInTheDocument();
  });

  it('teaches the rule through the 2 + 5 = 7 demo before starting the real puzzle', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /try the 20-second demo/i }));
    expect(screen.getByText(/the goal is target 7/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('gridcell', { name: /tile 2/i }));
    expect(screen.getByText(/selected is now 2/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('gridcell', { name: /tile 5/i }));
    expect(screen.getByRole('heading', { name: /success! 2 \+ 5 = 7/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start today/i }));
    expect(JSON.parse(localStorage.getItem('daily-loop-puzzle:onboarding:v1') ?? '{}')).toMatchObject({ completed: true });
    expect(screen.getByRole('heading', { name: /now try today’s 4x4 puzzle/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^start$/i }));
    expect(screen.getByRole('grid', { name: /4 by 4 number puzzle/i })).toBeInTheDocument();
  });

  it('switches language locally without resetting puzzle state', () => {
    localStorage.setItem('daily-loop-puzzle:onboarding:v1', JSON.stringify({ completed: true, skipped: false }));
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Today' }));
    const firstTile = screen.getAllByRole('gridcell')[0];
    fireEvent.click(firstTile);
    expect(screen.getByText(/1\/6/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/language/i), { target: { value: 'ko' } });

    expect(screen.getByRole('button', { name: '홈' })).toBeInTheDocument();
    expect(screen.getByText(/1\/6/)).toBeInTheDocument();
    expect(localStorage.getItem('daily-loop-puzzle:locale:v1')).toBe('ko');
  });

  it('replays the demo from an in-progress puzzle without resetting moves or onboarding metadata', () => {
    localStorage.setItem('daily-loop-puzzle:onboarding:v1', JSON.stringify({ completed: true, skipped: false, locale: 'en' }));
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Today' }));
    const todayGrid = screen.getByRole('grid', { name: /4 by 4 number puzzle/i });
    const firstTile = within(todayGrid).getAllByRole('gridcell')[0];
    fireEvent.click(firstTile);

    expect(firstTile).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/1\/6/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /help/i }));
    fireEvent.click(screen.getByRole('button', { name: /show the example again/i }));
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));

    const returnedGrid = screen.getByRole('grid', { name: /4 by 4 number puzzle/i });
    expect(within(returnedGrid).getAllByRole('gridcell')[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/1\/6/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('daily-loop-puzzle:onboarding:v1') ?? '{}')).toEqual({
      completed: true,
      skipped: false,
      locale: 'en',
    });
  });

  it('keeps replay demo Skip inside rules instead of treating it like first-run onboarding skip', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /read the rules/i }));
    expect(screen.getByRole('heading', { name: /how to play/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /show the example again/i }));
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));

    expect(screen.getByRole('heading', { name: /how to play/i })).toBeInTheDocument();
    expect(screen.queryByRole('grid', { name: /4 by 4 number puzzle/i })).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('daily-loop-puzzle:onboarding:v1') ?? '{}')).toEqual({});
  });
});
