import { useState } from 'react';

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
    const [value, setValue] = useState('1');
  const [from, setFrom] = useState('Cups');
  const [to, setTo] = useState('Tablespoons');

  const val = parseFloat(value) || 0;
  const inMl = val * toMl[from];
  const result = inMl / toMl[to];

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1000000000) return num.toExponential(4);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(num);
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel rounded-3xl p-10 sm:p-12">
      <div className="space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Amount</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-4xl font-mono focus:outline-none focus-visible:ring-charcoal`} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-charcoal/50 mb-4 uppercase tracking-wider">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-4 py-5 text-xl text-charcoal focus:outline-none">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-charcoal/50 mb-4 uppercase tracking-wider">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-4 py-5 text-xl text-charcoal focus:outline-none">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className={`mt-12 p-10 rounded-2xl border border-charcoal bg-charcoal text-mustard border-2 border-charcoal/20 text-center`}>
          <div className="text-xl font-medium mb-4 opacity-80">Converted Amount</div>
          <div className="text-7xl font-light font-mono">{result ? formatNumber(result) : '0'}</div>
          <div className="text-xl mt-4 opacity-80">{to}</div>
        </div>
      </div>
    </div>
  );
}
