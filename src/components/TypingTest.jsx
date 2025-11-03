import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Timer, RotateCcw, Target } from 'lucide-react';

const SAMPLE_TEXTS = [
  'The quick brown fox jumps over the lazy dog while the night sky shimmers with distant stars.',
  'Typing fast is not just about speed; it is about accuracy, rhythm, and maintaining your flow.',
  'Practice consistently and your words per minute will climb as your confidence grows each day.',
];

function useCountdown(active, seconds, onDone) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      onDone?.();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [active, timeLeft, onDone]);

  const reset = useCallback(() => setTimeLeft(seconds), [seconds]);
  return { timeLeft, reset };
}

function computeMetrics(reference, input, elapsedSeconds) {
  const charsTyped = input.length;
  const correctChars = input.split('').filter((ch, i) => ch === reference[i]).length;
  const accuracy = charsTyped === 0 ? 0 : Math.round((correctChars / charsTyped) * 100);
  const words = correctChars / 5; // standard WPM formula
  const minutes = Math.max(elapsedSeconds, 1) / 60; // avoid division by zero
  const wpm = Math.max(0, Math.round(words / minutes));
  return { charsTyped, correctChars, accuracy, wpm };
}

export default function TypingTest({ onComplete, onLive }) {
  const [textIndex, setTextIndex] = useState(0);
  const reference = useMemo(() => SAMPLE_TEXTS[textIndex], [textIndex]);

  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [duration, setDuration] = useState(30); // seconds

  const inputRef = useRef(null);
  const startTimeRef = useRef(null);

  const elapsedSeconds = useMemo(() => {
    if (!started) return 0;
    const now = Date.now();
    const elapsed = Math.floor((now - startTimeRef.current) / 1000);
    return Math.min(elapsed, duration);
  }, [started, duration, input, finished]);

  const { timeLeft, reset: resetTimer } = useCountdown(started && !finished, duration, () => {
    setFinished(true);
  });

  const metrics = useMemo(
    () => computeMetrics(reference, input, elapsedSeconds || 1),
    [reference, input, elapsedSeconds]
  );

  useEffect(() => {
    onLive?.({ ...metrics, timeLeft });
  }, [metrics, timeLeft, onLive]);

  useEffect(() => {
    if (finished) {
      onComplete?.({ ...metrics, reference, input, duration });
    }
  }, [finished]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (!started) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }
    if (val.length >= reference.length) {
      setFinished(true);
    }
    setInput(val);
  };

  const restart = () => {
    setInput('');
    setStarted(false);
    setFinished(false);
    resetTimer();
    startTimeRef.current = null;
    inputRef.current?.focus();
  };

  const nextText = () => {
    setTextIndex((i) => (i + 1) % SAMPLE_TEXTS.length);
    restart();
  };

  const changeDuration = (s) => {
    setDuration(s);
    restart();
  };

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5 rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-white/80">
          <Keyboard className="h-5 w-5 text-emerald-400" />
          <span className="font-medium">Typing Test</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </button>
          <button
            onClick={nextText}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            New Text
          </button>
          <div className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 text-sm text-white">
            {[15, 30, 60].map((s) => (
              <button
                key={s}
                onClick={() => changeDuration(s)}
                className={`rounded-md px-2 py-1 transition ${duration === s ? 'bg-emerald-500 text-white' : 'hover:bg-white/10'}`}
              >
                {s}s
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center gap-2 text-white/80">
          <Timer className="h-4 w-4 text-emerald-400" />
          <span className="text-sm">Time Left</span>
        </div>
        <div className="text-2xl font-semibold tabular-nums text-white">{timeLeft}s</div>
        <div className="hidden md:flex items-center gap-4">
          <Stat label="WPM" value={metrics.wpm} />
          <Stat label="Accuracy" value={`${metrics.accuracy}%`} />
          <Stat label="Chars" value={`${metrics.correctChars}/${metrics.charsTyped}`} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-white/80">
          {reference.split('').map((ch, i) => {
            const typed = input[i];
            let cls = 'text-white/50';
            if (typed != null) {
              cls = typed === ch ? 'text-emerald-400' : 'text-rose-400';
            }
            const isCaret = i === input.length && !finished;
            return (
              <span key={i} className={`relative ${cls}`}>
                {ch}
                {isCaret && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-3 animate-pulse rounded bg-emerald-400" />
                )}
              </span>
            );
          })}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          spellCheck={false}
          disabled={finished}
          placeholder="Start typing here..."
          className="h-28 w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 p-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>

      {finished && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-white">
          <div className="flex items-center gap-2 text-emerald-300">
            <Target className="h-5 w-5" />
            <span className="text-sm">Test finished</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/80">
            <span>WPM: <strong className="text-white">{metrics.wpm}</strong></span>
            <span>Accuracy: <strong className="text-white">{metrics.accuracy}%</strong></span>
            <button onClick={restart} className="rounded-lg bg-emerald-500 px-3 py-1.5 font-medium text-slate-950 hover:bg-emerald-400">
              Try Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-right">
      <div className="text-xs uppercase tracking-wide text-white/50">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
