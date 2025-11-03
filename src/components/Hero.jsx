import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-white/80 backdrop-blur">
          <Rocket className="h-3.5 w-3.5 text-emerald-400" />
          Level up your typing
        </div>
        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Test your typing speed in a modern, playful 3D space
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
          Practice, compete, and track your progress with live WPM and accuracy. Immersive 3D hero, crisp UI, and delightful interactions.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
    </section>
  );
}
