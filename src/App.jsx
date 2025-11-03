import React, { useState } from 'react';
import Hero from './components/Hero';
import TypingTest from './components/TypingTest';
import ResultsSummary from './components/ResultsSummary';
import Footer from './components/Footer';

function App() {
  const [lastResult, setLastResult] = useState(null);
  const [bestWPM, setBestWPM] = useState(0);

  const handleComplete = (result) => {
    setLastResult(result);
    if (result.wpm > bestWPM) setBestWPM(result.wpm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <Hero />
        <TypingTest onComplete={handleComplete} />
        <ResultsSummary lastResult={lastResult} bestWPM={bestWPM} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
