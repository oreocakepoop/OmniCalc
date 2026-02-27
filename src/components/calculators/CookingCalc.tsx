import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

const units = ['Cups', 'Tablespoons', 'Teaspoons', 'Milliliters', 'Fluid Ounces'];
// Base unit: ml
const toMl: Record<string, number> = {
  'Cups': 236.588,
  'Tablespoons': 14.7868,
  'Teaspoons': 4.92892,
  'Milliliters': 1,
  'Fluid Ounces': 29.5735
};

export function CookingCalc() {
  const { themeClasses } = useTheme();
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('Cups');
  const [to, setTo] = useState('Tablespoons');

  const val = parseFloat(value) || 0;
  const inMl = val * toMl[from];
  const result = inMl / toMl[to];

  return (
    <div className="w-full max-w-md mx-auto glass-panel rounded-3xl p-6 sm:p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
            className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-2xl font-mono focus:outline-none ${themeClasses.ring}`} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-3 py-3 text-zinc-300 focus:outline-none">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-3 py-3 text-zinc-300 focus:outline-none">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className={`mt-8 p-6 rounded-2xl border ${themeClasses.border} ${themeClasses.muted} text-center`}>
          <div className="text-sm font-medium mb-2 opacity-80">Converted Amount</div>
          <div className="text-5xl font-light font-mono">{result ? parseFloat(result.toPrecision(4)) : '0'}</div>
          <div className="text-sm mt-2 opacity-80">{to}</div>
        </div>
      </div>
    </div>
  );
}
