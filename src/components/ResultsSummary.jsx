import React from 'react';
import { Trophy, TrendingUp, Target } from 'lucide-react';

export default function ResultsSummary({ lastResult, bestWPM }) {
  if (!lastResult) {
    return (
      <section className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-white/70">
        Complete a test to see your results summary here.
      </section>
    );
  }

  const { wpm, accuracy, charsTyped, correctChars, duration } = lastResult;

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-white">
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-white/80">
          <Trophy className="h-5 w-5 text-amber-400" />
          <span className="font-medium">Results</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          Best WPM: <span className="font-semibold text-white">{bestWPM}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card label="WPM" value={wpm} accent="text-emerald-400" />
        <Card label="Accuracy" value={`${accuracy}%`} accent="text-sky-400" />
        <Card label="Correct" value={correctChars} accent="text-amber-400" />
        <Card label="Time" value={`${duration}s`} accent="text-violet-400" />
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white/80">
        <div className="mb-2 inline-flex items-center gap-2 text-white">
          <Target className="h-4 w-4 text-emerald-400" />
          <span className="font-medium">Session details</span>
        </div>
        <p>
          You typed <strong className="text-white">{charsTyped}</strong> characters with{' '}
          <strong className="text-white">{accuracy}%</strong> accuracy. Keep practicing to push your best WPM higher!
        </p>
      </div>
    </section>
  );
}

function Card({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-wide text-white/50">{label}</div>
      <div className={`mt-1 text-2xl font-semibold text-white ${accent}`}>{value}</div>
    </div>
  );
}
