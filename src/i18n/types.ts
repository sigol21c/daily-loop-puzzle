export type LocaleCode = 'en' | 'ko';

export type LocaleMessages = {
  meta: {
    appName: string;
    htmlLang: string;
  };
  language: {
    label: string;
  };
  nav: {
    home: string;
    today: string;
    stats: string;
    how: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  status: {
    today: string;
    target: string;
    streak: string;
    status: string;
    ready: string;
    solved: string;
    failed: string;
  };
  home: {
    readyTitle: string;
    readyBody: string;
    completeTitle: string;
    resultSummary: string;
    playCta: string;
    resultCta: string;
    howCta: string;
    replayDemoCta: string;
  };
  firstRun: {
    headline: string;
    body: string;
    demoCta: string;
    skipCta: string;
    rulesCta: string;
  };
  demo: {
    stepLabel: (step: number) => string;
    orientHeadline: string;
    orientInstruction: string;
    selectedHeadline: string;
    selectedInstruction: string;
    successHeadline: string;
    successRecap: string;
    correction: string;
    unselected: string;
    target: string;
    selected: string;
    moves: string;
    skip: string;
    startToday: string;
    replay: string;
    practiceNote: string;
  };
  transition: {
    title: string;
    body: string;
    cta: string;
    helper: string;
  };
  puzzle: {
    boardLabel: string;
    target: string;
    selected: string;
    moves: string;
    connectedHint: string;
    disconnectedHint: string;
    tileLabel: (value: number, selected: boolean) => string;
  };
  result: {
    todayEyebrow: (dayKey: string) => string;
    solvedTitle: string;
    failedTitle: string;
    resultLine: (moves: number, maxMoves: number, score: number, selectedTotal?: number) => string;
    lockedOfficial: string;
    firstOfficial: string;
    shareCta: string;
    practiceCta: string;
    shared: string;
    copied: string;
    copyFailed: string;
    noResultTitle: string;
    noResultBody: string;
  };
  stats: {
    title: string;
    played: string;
    solved: string;
    streak: string;
    best: string;
    localOnlyNotice: string;
  };
  howToPlay: {
    title: string;
    steps: string[];
    replayDemoCta: string;
  };
  help: {
    open: string;
    title: string;
    close: string;
    rules: string[];
    replayDemoCta: string;
  };
  share: {
    resultLine: (solved: boolean, moves: number, maxMoves: number, score: number) => string;
  };
};
