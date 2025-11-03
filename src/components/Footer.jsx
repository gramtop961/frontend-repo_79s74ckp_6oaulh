import React from 'react';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-auto mt-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 p-5 text-white/70">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm">
          Built with <Heart className="inline h-4 w-4 text-rose-400" /> for fast, focused practice.
        </p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
        >
          <Github className="h-4 w-4" />
          Star project
        </a>
      </div>
    </footer>
  );
}
