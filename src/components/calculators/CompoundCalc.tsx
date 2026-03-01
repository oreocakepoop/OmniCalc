import { useState } from 'react';

export function CompoundCalc() {
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
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Initial Investment</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <div className="relative w-full">
              <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal transition-all`} />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {principal ? new Intl.NumberFormat('en-US').format(parseFloat(principal)) : '0'}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Monthly Contribution</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <div className="relative w-full">
              <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal transition-all`} />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {monthly ? new Intl.NumberFormat('en-US').format(parseFloat(monthly)) : '0'}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <label className="text-xl font-medium text-charcoal/70">Years to Grow</label>
            <span className={`font-mono text-2xl text-mustard`}>{years} yrs</span>
          </div>
          <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full accent-zinc-400 h-3" />
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <label className="text-xl font-medium text-charcoal/70">Estimated Annual Rate</label>
            <span className={`font-mono text-2xl text-mustard`}>{rate}%</span>
          </div>
          <input type="range" min="0" max="20" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full accent-zinc-400 h-3" />
        </div>
      </div>

      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2 glass-panel rounded-3xl p-12 flex flex-col justify-center items-center text-center">
          <div className="text-charcoal/70 text-xl font-medium mb-6 uppercase tracking-widest">Future Value</div>
          <div className={`text-7xl sm:text-9xl font-light font-mono text-mustard tracking-tight`}>
            ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(futureValue)}
          </div>
        </div>
        
        <div className="glass-panel rounded-3xl p-10 flex flex-col justify-center">
          <div className="text-charcoal/50 text-xl font-medium mb-4">Total Invested</div>
          <div className={`text-4xl font-mono text-mustard`}>
            ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(totalInvested)}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-10 flex flex-col justify-center">
          <div className="text-charcoal/50 text-xl font-medium mb-4">Total Interest Earned</div>
          <div className="text-4xl font-mono text-emerald-400">
            +${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(totalInterest)}
          </div>
        </div>
      </div>
    </div>
  );
}
