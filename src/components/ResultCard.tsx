import type { LocaleMessages } from '../i18n/types';

type ResultCardProps = {
  dayKey: string;
  solved: boolean;
  moves: number;
  maxMoves: number;
  score: number;
  selectedTotal?: number;
  shareText: string;
  shareStatus: string;
  lockedOfficial: boolean;
  messages: LocaleMessages['result'];
  onShare: () => void;
  onPractice: () => void;
};

export function ResultCard({
  dayKey,
  solved,
  moves,
  maxMoves,
  score,
  selectedTotal,
  shareText,
  shareStatus,
  lockedOfficial,
  messages,
  onShare,
  onPractice,
}: ResultCardProps) {
  return (
    <section className={`result-card ${solved ? 'win' : 'lose'}`} aria-live="polite">
      <p className="eyebrow">{messages.todayEyebrow(dayKey)}</p>
      <h2>{solved ? messages.solvedTitle : messages.failedTitle}</h2>
      <p className="result-line">
        {messages.resultLine(moves, maxMoves, score, selectedTotal)}
      </p>
      <p className="lock-copy">
        {lockedOfficial ? messages.lockedOfficial : messages.firstOfficial}
      </p>
      <div className="button-row">
        <button type="button" onClick={onShare}>{messages.shareCta}</button>
        <button type="button" className="secondary" onClick={onPractice}>{messages.practiceCta}</button>
      </div>
      {shareStatus ? <p className="share-status">{shareStatus}</p> : null}
      <pre aria-label="spoiler-free share text">{shareText}</pre>
    </section>
  );
}
