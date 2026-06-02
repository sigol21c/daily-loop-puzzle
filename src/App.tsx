import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ResultCard } from './components/ResultCard';
import { getInitialLocale, messagesFor, saveLocalePreference, supportedLocales, type LocaleCode, type LocaleMessages } from './i18n/locales';
import { getDayKey, hashSeed } from './lib/dateSeed';
import { loadOnboardingStatus, saveOnboardingStatus, type OnboardingStatus } from './lib/onboarding';
import { createPuzzle, evaluateSelection, isSelectionConnected, selectedTotal, toggleCell, type PuzzleResult } from './lib/puzzle';
import { buildShareText, shareOrCopy } from './lib/share';
import { loadStats, recordDailyResult, type DailyRecord, type PlayerStats } from './lib/storage';

type View = 'home' | 'today' | 'result' | 'stats' | 'howToPlay' | 'demo' | 'transition';
type TutorialStep = 0 | 1 | 2;
type DemoCell = { id: string; value: number; selected: boolean };

const DEMO_CELLS: DemoCell[] = [
  { id: 'demo-0', value: 2, selected: false },
  { id: 'demo-1', value: 5, selected: false },
  { id: 'demo-2', value: 4, selected: false },
  { id: 'demo-3', value: 1, selected: false },
];

function patternFromCells(cells: { selected: boolean }[]): boolean[] {
  return cells.map((cell) => cell.selected);
}

function fallbackPattern(record?: DailyRecord): boolean[] {
  return record?.selectedPattern ?? Array.from({ length: 16 }, () => false);
}

function didFinishOnboarding(status: OnboardingStatus): boolean {
  return status.completed || status.skipped;
}

function formatHomeSummary(template: string, record: DailyRecord, maxMoves: number): string {
  return template
    .replace('{result}', record.solved ? '✅ Solved' : '❌ Failed')
    .replace('{moves}', String(record.moves))
    .replace('{maxMoves}', String(maxMoves))
    .replace('{score}', String(record.score));
}

function LanguageSelector({ locale, messages, onChange }: { locale: LocaleCode; messages: LocaleMessages; onChange: (locale: LocaleCode) => void }) {
  return (
    <label className="language-selector">
      <span>{messages.language.label}</span>
      <select aria-label="Language" value={locale} onChange={(event) => onChange(event.target.value as LocaleCode)}>
        {Object.entries(supportedLocales).map(([code, config]) => (
          <option key={code} value={code}>{config.label}</option>
        ))}
      </select>
    </label>
  );
}

function FirstRunCard({ messages, onDemo, onSkip, onRules }: { messages: LocaleMessages; onDemo: () => void; onSkip: () => void; onRules: () => void }) {
  return (
    <section className="first-run-card">
      <h2>{messages.firstRun.headline}</h2>
      <p>{messages.firstRun.body}</p>
      <div className="demo-preview" aria-hidden="true">
        <span>{messages.demo.target} 7</span>
        <div>2</div><div>5</div><div>4</div><div>1</div>
      </div>
      <div className="button-row">
        <button type="button" onClick={onDemo}>{messages.firstRun.demoCta}</button>
        <button type="button" className="secondary" onClick={onSkip}>{messages.firstRun.skipCta}</button>
        <button type="button" className="secondary" onClick={onRules}>{messages.firstRun.rulesCta}</button>
      </div>
    </section>
  );
}

function TutorialDemo({ messages, onComplete, onSkip }: { messages: LocaleMessages; onComplete: () => void; onSkip: () => void }) {
  const [step, setStep] = useState<TutorialStep>(0);
  const [cells, setCells] = useState<DemoCell[]>(DEMO_CELLS);
  const [hint, setHint] = useState('');
  const selected = cells.filter((cell) => cell.selected);
  const selectedSum = selected.reduce((sum, cell) => sum + cell.value, 0);
  const nextId = step === 0 ? 'demo-0' : step === 1 ? 'demo-1' : undefined;
  const headline = step === 0 ? messages.demo.orientHeadline : step === 1 ? messages.demo.selectedHeadline : messages.demo.successHeadline;
  const instruction = step === 0 ? messages.demo.orientInstruction : step === 1 ? messages.demo.selectedInstruction : messages.demo.successRecap;

  function resetDemo() {
    setStep(0);
    setCells(DEMO_CELLS);
    setHint('');
  }

  function handleDemoTap(id: string) {
    setHint('');
    if (step === 2) return;
    if (step === 0 && id !== 'demo-0') {
      setHint(messages.demo.correction);
      return;
    }
    if (step === 1 && id === 'demo-0') {
      setCells(DEMO_CELLS);
      setStep(0);
      setHint(messages.demo.unselected);
      return;
    }
    if (step === 1 && id !== 'demo-1') {
      setHint(messages.demo.correction);
      return;
    }
    const nextCells = cells.map((cell) => (cell.id === id ? { ...cell, selected: true } : cell));
    setCells(nextCells);
    setStep(id === 'demo-0' ? 1 : 2);
  }

  return (
    <section className="demo-card" aria-labelledby="demo-title">
      <p className="eyebrow">{messages.demo.stepLabel(step + 1)}</p>
      <h2 id="demo-title">{headline}</h2>
      <div className="demo-status-row">
        <div><span>{messages.demo.target}</span><strong>7</strong></div>
        <div><span>{messages.demo.selected}</span><strong>{selectedSum}</strong></div>
        <div><span>{messages.demo.moves}</span><strong>{selected.length}/2</strong></div>
      </div>
      <div className="demo-board" role="grid" aria-label="2 by 2 demo puzzle">
        {cells.map((cell) => (
          <button
            aria-label={`Tile ${cell.value}`}
            aria-pressed={cell.selected}
            className={`demo-cell ${cell.selected ? 'selected' : ''} ${cell.id === nextId ? 'next' : ''}`}
            key={cell.id}
            onClick={() => handleDemoTap(cell.id)}
            role="gridcell"
            type="button"
          >
            {cell.value}{cell.selected ? ' ✓' : ''}
          </button>
        ))}
      </div>
      <p className="demo-instruction" aria-live="polite">{hint || instruction}</p>
      {step === 2 ? <p className="demo-success">{messages.demo.practiceNote}</p> : null}
      <div className="button-row">
        {step === 2 ? <button type="button" onClick={onComplete}>{messages.demo.startToday}</button> : <button type="button" className="secondary" onClick={onSkip}>{messages.demo.skip}</button>}
        <button type="button" className="secondary" onClick={resetDemo}>{messages.demo.replay}</button>
      </div>
    </section>
  );
}

function TransitionCard({ messages, onStart }: { messages: LocaleMessages; onStart: () => void }) {
  return (
    <section className="transition-card">
      <h2>{messages.transition.title}</h2>
      <p>{messages.transition.body}</p>
      <button type="button" onClick={onStart}>{messages.transition.cta}</button>
    </section>
  );
}

function HelpOverlay({ messages, onClose, onReplay }: { messages: LocaleMessages; onClose: () => void; onReplay: () => void }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="help-overlay" role="presentation">
      <section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <div className="help-heading-row">
          <h2 id="help-title">{messages.help.title}</h2>
          <button type="button" className="secondary" onClick={onClose}>{messages.help.close}</button>
        </div>
        <ol className="help-rule-list">
          {messages.help.rules.map((rule) => <li key={rule}>{rule}</li>)}
        </ol>
        <div className="demo-preview" aria-label="Mini example: 2 plus 5 equals 7">
          <span>{messages.demo.target} 7</span>
          <div className="selected">2</div><div className="selected">5</div><div>4</div><div>1</div>
        </div>
        <button type="button" onClick={onReplay}>{messages.help.replayDemoCta}</button>
      </section>
    </div>
  );
}

function App() {
  const dayKey = getDayKey();
  const seed = hashSeed(`daily-loop:${dayKey}`);
  const initialPuzzle = useMemo(() => createPuzzle(dayKey, seed), [dayKey, seed]);
  const [locale, setLocale] = useState<LocaleCode>(() => getInitialLocale());
  const messages = messagesFor(locale);
  const [view, setView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  const [helpOpen, setHelpOpen] = useState(false);
  const [onboarding, setOnboarding] = useState<OnboardingStatus>(() => loadOnboardingStatus());
  const [puzzle, setPuzzle] = useState(initialPuzzle);
  const [moves, setMoves] = useState(0);
  const [result, setResult] = useState<PuzzleResult | null>(null);
  const [stats, setStats] = useState<PlayerStats>(() => loadStats());
  const [shareStatus, setShareStatus] = useState('');

  useEffect(() => {
    document.documentElement.lang = messages.meta.htmlLang;
  }, [messages.meta.htmlLang]);

  const todayRecord = stats.records.find((record) => record.dayKey === dayKey);
  const total = selectedTotal(puzzle);
  const connected = isSelectionConnected(puzzle);
  const officialLocked = Boolean(todayRecord);
  const visibleResult = result ?? todayRecord ?? null;
  const selectedPattern = result ? patternFromCells(puzzle.cells) : fallbackPattern(todayRecord);
  const shareText = visibleResult
    ? buildShareText({
        dayKey,
        solved: visibleResult.solved,
        moves: visibleResult.moves,
        maxMoves: puzzle.maxMoves,
        score: visibleResult.score,
        selectedPattern,
      }, locale)
    : '';

  function persistOnboarding(next: OnboardingStatus) {
    setOnboarding(saveOnboardingStatus({ ...onboarding, ...next, locale }));
  }

  function handleLocaleChange(nextLocale: LocaleCode) {
    setLocale(nextLocale);
    saveLocalePreference(nextLocale);
  }

  function startPuzzle(practice = false) {
    setPuzzle(createPuzzle(dayKey, seed));
    setMoves(0);
    setResult(null);
    setShareStatus('');
    setView(practice || !todayRecord ? 'today' : 'result');
  }

  function skipOnboarding() {
    persistOnboarding({ completed: onboarding.completed, skipped: true, skippedAt: new Date().toISOString() });
    startPuzzle(false);
  }

  function completeOnboarding() {
    persistOnboarding({ completed: true, skipped: onboarding.skipped, completedAt: new Date().toISOString() });
    setView('transition');
  }

  function openDemo() {
    setPreviousView(view);
    setView('demo');
  }

  function closeReplayDemo() {
    setView(previousView === 'demo' ? 'home' : previousView);
  }

  function handleCellClick(id: string) {
    if (result) return;
    const clicked = puzzle.cells.find((cell) => cell.id === id);
    if (!clicked) return;
    const movesLeft = puzzle.maxMoves - moves;
    if (!clicked.selected && movesLeft <= 0) return;

    const nextPuzzle = toggleCell(puzzle, id);
    const nextMoves = moves + 1;
    const nextResult = evaluateSelection(nextPuzzle, nextMoves);
    setPuzzle(nextPuzzle);
    setMoves(nextMoves);

    if (nextResult.solved || nextMoves >= puzzle.maxMoves) {
      setResult(nextResult);
      setStats(
        recordDailyResult({
          dayKey,
          solved: nextResult.solved,
          score: nextResult.score,
          moves: nextMoves,
          playedAt: new Date().toISOString(),
          selectedPattern: patternFromCells(nextPuzzle.cells),
        }),
      );
      setView('result');
    }
  }

  async function handleShare() {
    if (!shareText) return;
    try {
      const mode = await shareOrCopy(shareText);
      setShareStatus(mode === 'shared' ? messages.result.shared : messages.result.copied);
    } catch {
      setShareStatus(messages.result.copyFailed);
    }
  }

  const showFirstRun = view === 'home' && !didFinishOnboarding(onboarding) && !todayRecord;
  const isFirstRunOnboardingDemo = !didFinishOnboarding(onboarding) && previousView === 'home' && !todayRecord;

  return (
    <main className="app-shell">
      <header className="hero-card" aria-labelledby="game-title">
        <div className="top-row">
          <p className="eyebrow">{messages.hero.eyebrow}</p>
          <LanguageSelector locale={locale} messages={messages} onChange={handleLocaleChange} />
        </div>
        <h1 id="game-title">{messages.hero.title}</h1>
        <p className="subtitle">{messages.hero.subtitle}</p>
      </header>

      <nav className="nav-tabs" aria-label="main views">
        <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')} type="button">{messages.nav.home}</button>
        <button className={view === 'today' ? 'active' : ''} onClick={() => startPuzzle(false)} type="button">{messages.nav.today}</button>
        <button className={view === 'stats' ? 'active' : ''} onClick={() => setView('stats')} type="button">{messages.nav.stats}</button>
        <button className={view === 'howToPlay' ? 'active' : ''} onClick={() => setView('howToPlay')} type="button">{messages.nav.how}</button>
      </nav>

      <section className="status-grid" aria-label="today puzzle status">
        <div><span>{messages.status.today}</span><strong>{dayKey}</strong></div>
        <div><span>{messages.status.target}</span><strong>{puzzle.target}</strong></div>
        <div><span>{messages.status.streak}</span><strong>{stats.currentStreak}</strong></div>
        <div><span>{messages.status.status}</span><strong>{todayRecord ? (todayRecord.solved ? messages.status.solved : messages.status.failed) : messages.status.ready}</strong></div>
      </section>

      {showFirstRun ? <FirstRunCard messages={messages} onDemo={openDemo} onSkip={skipOnboarding} onRules={() => setView('howToPlay')} /> : null}

      {view === 'home' && !showFirstRun ? (
        <section className="panel-card">
          <h2>{todayRecord ? messages.home.completeTitle : messages.home.readyTitle}</h2>
          <p>{todayRecord ? formatHomeSummary(messages.home.resultSummary, todayRecord, puzzle.maxMoves) : messages.home.readyBody}</p>
          <div className="button-row">
            <button type="button" onClick={() => startPuzzle(false)}>{todayRecord ? messages.home.resultCta : messages.home.playCta}</button>
            <button type="button" className="secondary" onClick={openDemo}>{messages.home.replayDemoCta}</button>
            <button type="button" className="secondary" onClick={() => setView('howToPlay')}>{messages.home.howCta}</button>
          </div>
        </section>
      ) : null}

      {view === 'demo' ? (
        <TutorialDemo
          messages={messages}
          onComplete={isFirstRunOnboardingDemo ? completeOnboarding : closeReplayDemo}
          onSkip={isFirstRunOnboardingDemo ? skipOnboarding : closeReplayDemo}
        />
      ) : null}

      {view === 'transition' ? <TransitionCard messages={messages} onStart={() => startPuzzle(false)} /> : null}

      {view === 'today' ? (
        <>
          <button type="button" className="help-button secondary" onClick={() => setHelpOpen(true)}>{messages.help.open}</button>
          <PuzzleBoard
            connected={connected}
            disabled={Boolean(result)}
            helperText={didFinishOnboarding(onboarding) ? messages.transition.helper : undefined}
            messages={messages.puzzle}
            movesUsed={moves}
            onCellClick={handleCellClick}
            puzzle={puzzle}
            selectedTotal={total}
          />
        </>
      ) : null}

      {view === 'result' && visibleResult ? (
        <ResultCard
          dayKey={dayKey}
          lockedOfficial={officialLocked}
          maxMoves={puzzle.maxMoves}
          messages={messages.result}
          moves={visibleResult.moves}
          onPractice={() => startPuzzle(true)}
          onShare={handleShare}
          score={visibleResult.score}
          selectedTotal={'selectedTotal' in visibleResult ? visibleResult.selectedTotal : undefined}
          shareStatus={shareStatus}
          shareText={shareText}
          solved={visibleResult.solved}
        />
      ) : null}

      {view === 'result' && !visibleResult ? (
        <section className="panel-card">
          <h2>{messages.result.noResultTitle}</h2>
          <p>{messages.result.noResultBody}</p>
          <button type="button" onClick={() => startPuzzle(false)}>{messages.home.playCta}</button>
        </section>
      ) : null}

      {view === 'stats' ? (
        <section className="stats-card" aria-label="local stats">
          <h2>{messages.stats.title}</h2>
          <div className="stats-row">
            <span>{messages.stats.played} <strong>{stats.gamesPlayed}</strong></span>
            <span>{messages.stats.solved} <strong>{stats.gamesSolved}</strong></span>
            <span>{messages.stats.streak} <strong>{stats.currentStreak}</strong></span>
            <span>{messages.stats.best} <strong>{stats.bestScore}</strong></span>
          </div>
          <p>{messages.stats.localOnlyNotice}</p>
        </section>
      ) : null}

      {view === 'howToPlay' ? (
        <section className="rules-card">
          <h2>{messages.howToPlay.title}</h2>
          <ol>
            {messages.howToPlay.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <button type="button" onClick={openDemo}>{messages.howToPlay.replayDemoCta}</button>
        </section>
      ) : null}

      {helpOpen ? <HelpOverlay messages={messages} onClose={() => setHelpOpen(false)} onReplay={() => { setHelpOpen(false); openDemo(); }} /> : null}
    </main>
  );
}

export default App;
