import { useState } from 'react';

export function MortgageCalc() {
  const [principal, setPrincipal] = useState('300000');
  const [rate, setRate] = useState('5.5');
  const [years, setYears] = useState('30');

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  let monthlyPayment = 0;
  if (p > 0 && r > 0 && n > 0) {
    monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (p > 0 && n > 0) {
    monthlyPayment = p / n;
  }

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - p;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Interest Rate (Annual)</label>
          <div className="relative">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Loan Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="text-zinc-400 text-sm font-medium mb-2">Estimated Monthly Payment</div>
          <div className="text-5xl font-light font-mono text-violet-400">
            ${monthlyPayment.toFixed(2)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-zinc-950 rounded-xl border border-zinc-800/50">
            <span className="text-sm text-zinc-400">Principal Amount</span>
            <span className="font-mono text-zinc-200">${p.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-zinc-950 rounded-xl border border-zinc-800/50">
            <span className="text-sm text-zinc-400">Total Interest</span>
            <span className="font-mono text-zinc-200">${totalInterest > 0 ? totalInterest.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-violet-950/30 rounded-xl border border-violet-500/20">
            <span className="text-sm font-medium text-violet-300">Total Cost of Loan</span>
            <span className="font-mono font-medium text-violet-300">${totalPayment > 0 ? totalPayment.toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
