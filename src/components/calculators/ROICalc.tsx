import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

export function ROICalc() {
  const { themeClasses } = useTheme();
  const [invested, setInvested] = useState('10000');
  const [returned, setReturned] = useState('12500');
  const [years, setYears] = useState('2');

  const inv = parseFloat(invested) || 0;
  const ret = parseFloat(returned) || 0;
  const y = parseFloat(years) || 0;

  const profit = ret - inv;
  const roi = inv > 0 ? (profit / inv) * 100 : 0;
  const annualized = (inv > 0 && y > 0) ? (Math.pow(ret / inv, 1 / y) - 1) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Amount Invested</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input type="number" value={invested} onChange={(e) => setInvested(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none ${themeClasses.ring}`} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Amount Returned</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input type="number" value={returned} onChange={(e) => setReturned(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none ${themeClasses.ring}`} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Investment Length (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none ${themeClasses.ring}`} />
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-center space-y-6">
        <div className="text-center mb-4">
          <div className="text-zinc-400 text-sm font-medium mb-2 uppercase tracking-widest">Return on Investment</div>
          <div className={`text-6xl font-light font-mono ${roi >= 0 ? themeClasses.text : 'text-red-400'}`}>
            {roi > 0 ? '+' : ''}{roi.toFixed(2)}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 text-center">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Net Profit</div>
            <div className={`text-xl font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${Math.abs(profit).toFixed(2)}
            </div>
          </div>
          <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 text-center">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Annualized ROI</div>
            <div className={`text-xl font-mono ${annualized >= 0 ? themeClasses.text : 'text-red-400'}`}>
              {annualized.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
