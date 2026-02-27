import { useState } from 'react';

export function TipCalc() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');

  const billAmt = parseFloat(bill) || 0;
  const tipAmt = billAmt * (parseFloat(tipPercent) / 100);
  const totalAmt = billAmt + tipAmt;
  const numPeople = parseInt(people) || 1;

  const perPersonTip = tipAmt / numPeople;
  const perPersonTotal = totalAmt / numPeople;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400">Tip Percentage</label>
            <span className="text-violet-400 font-mono">{tipPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full accent-violet-500"
          />
          <div className="flex justify-between mt-3 gap-2">
            {[10, 15, 18, 20, 25].map(pct => (
              <button
                key={pct}
                onClick={() => setTipPercent(String(pct))}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${tipPercent === String(pct) ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Number of People</label>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPeople(String(Math.max(1, numPeople - 1)))}
              className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center text-xl"
            >-</button>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center text-lg focus:outline-none focus:border-violet-500 transition-colors"
              min="1"
            />
            <button 
              onClick={() => setPeople(String(numPeople + 1))}
              className="w-12 h-12 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center text-xl"
            >+</button>
          </div>
        </div>
      </div>

      <div className="bg-violet-600 rounded-3xl p-6 sm:p-8 flex flex-col justify-center space-y-8 text-white">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-violet-200 text-sm font-medium">Tip Amount</div>
            <div className="text-violet-300 text-xs">/ person</div>
          </div>
          <div className="text-4xl font-light font-mono tracking-tight">
            ${perPersonTip.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-violet-200 text-sm font-medium">Total</div>
            <div className="text-violet-300 text-xs">/ person</div>
          </div>
          <div className="text-5xl font-light font-mono tracking-tight">
            ${perPersonTotal.toFixed(2)}
          </div>
        </div>

        <div className="pt-6 border-t border-violet-500/50 flex justify-between items-center text-violet-200">
          <span className="text-sm">Total Bill + Tip</span>
          <span className="font-mono text-xl">${totalAmt.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
