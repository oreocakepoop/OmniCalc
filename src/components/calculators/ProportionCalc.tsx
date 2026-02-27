import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

export function ProportionCalc() {
  const { themeClasses } = useTheme();
  const [a, setA] = useState('2');
  const [b, setB] = useState('4');
  const [c, setC] = useState('6');

  const valA = parseFloat(a);
  const valB = parseFloat(b);
  const valC = parseFloat(c);

  let result = '...';
  if (!isNaN(valA) && !isNaN(valB) && !isNaN(valC) && valA !== 0) {
    result = ((valB * valC) / valA).toPrecision(4).replace(/\.0+$/, '');
  }

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-12">
      <div className="text-center mb-12">
        <h3 className="text-xl font-medium text-zinc-200">Rule of Three</h3>
        <p className="text-zinc-500 text-sm mt-2">A is to B as C is to X</p>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-8 text-2xl font-mono">
        <div className="flex flex-col gap-4">
          <input type="number" value={a} onChange={(e) => setA(e.target.value)}
            className={`w-24 sm:w-32 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center focus:outline-none ${themeClasses.ring}`} placeholder="A" />
          <div className="h-px bg-zinc-700 w-full"></div>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)}
            className={`w-24 sm:w-32 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center focus:outline-none ${themeClasses.ring}`} placeholder="B" />
        </div>

        <div className="text-zinc-500">=</div>

        <div className="flex flex-col gap-4">
          <input type="number" value={c} onChange={(e) => setC(e.target.value)}
            className={`w-24 sm:w-32 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center focus:outline-none ${themeClasses.ring}`} placeholder="C" />
          <div className="h-px bg-zinc-700 w-full"></div>
          <div className={`w-24 sm:w-32 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-center ${themeClasses.text}`}>
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
