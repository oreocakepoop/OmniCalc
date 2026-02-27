import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

export function CompoundCalc() {
  const { themeClasses } = useTheme();
  const [principal, setPrincipal] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [years, setYears] = useState('10');
  const [rate, setRate] = useState('7');

  const p = parseFloat(principal) || 0;
  const m = parseFloat(monthly) || 0;
  const y = parseFloat(years) || 0;
  const r = (parseFloat(rate) || 0) / 100;

  // Compound interest formula with monthly contributions
  const totalMonths = y * 12;
  const monthlyRate = r / 12;
  
  let futureValue = p * Math.pow(1 + monthlyRate, totalMonths);
  if (monthlyRate > 0) {
    futureValue += m * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    futureValue += m * totalMonths;
  }

  const totalInvested = p + (m * totalMonths);
  const totalInterest = futureValue - totalInvested;

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Initial Investment</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none ${themeClasses.ring} transition-all`} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Monthly Contribution</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none ${themeClasses.ring} transition-all`} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400">Years to Grow</label>
            <span className={`font-mono ${themeClasses.text}`}>{years} yrs</span>
          </div>
          <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full accent-zinc-400" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400">Estimated Annual Rate</label>
            <span className={`font-mono ${themeClasses.text}`}>{rate}%</span>
          </div>
          <input type="range" min="0" max="20" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full accent-zinc-400" />
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-center items-center text-center">
          <div className="text-zinc-400 text-sm font-medium mb-3 uppercase tracking-widest">Future Value</div>
          <div className={`text-5xl sm:text-7xl font-light font-mono ${themeClasses.text} tracking-tight`}>
            ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(futureValue)}
          </div>
        </div>
        
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center">
          <div className="text-zinc-500 text-sm font-medium mb-2">Total Invested</div>
          <div className="text-2xl font-mono text-zinc-200">
            ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(totalInvested)}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center">
          <div className="text-zinc-500 text-sm font-medium mb-2">Total Interest Earned</div>
          <div className="text-2xl font-mono text-emerald-400">
            +${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(totalInterest)}
          </div>
        </div>
      </div>
    </div>
  );
}
