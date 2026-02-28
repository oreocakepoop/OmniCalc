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
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-zinc-900 rounded-3xl p-10 sm:p-12 border border-zinc-800 space-y-8">
        <div>
          <label className="block text-lg font-medium text-zinc-400 mb-4">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 text-2xl">$</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-lg font-medium text-zinc-400">Tip Percentage</label>
            <span className="text-violet-400 font-mono text-xl">{tipPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full accent-violet-500 h-3"
          />
          <div className="flex justify-between mt-6 gap-3">
            {[10, 15, 18, 20, 25].map(pct => (
              <button
                key={pct}
                onClick={() => setTipPercent(String(pct))}
                className={`flex-1 py-3 rounded-lg text-lg font-medium transition-colors ${tipPercent === String(pct) ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-zinc-400 mb-4">Number of People</label>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setPeople(String(Math.max(1, numPeople - 1)))}
              className="w-16 h-16 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center text-3xl"
            >-</button>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-6 py-5 text-center text-2xl focus:outline-none focus:border-violet-500 transition-colors"
              min="1"
            />
            <button 
              onClick={() => setPeople(String(numPeople + 1))}
              className="w-16 h-16 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center text-3xl"
            >+</button>
          </div>
        </div>
      </div>

      <div className="bg-violet-600 rounded-3xl p-10 sm:p-12 flex flex-col justify-center space-y-12 text-white">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-violet-200 text-xl font-medium">Tip Amount</div>
            <div className="text-violet-300 text-base">/ person</div>
          </div>
          <div className="text-6xl font-light font-mono tracking-tight">
            ${perPersonTip.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-violet-200 text-xl font-medium">Total</div>
            <div className="text-violet-300 text-base">/ person</div>
          </div>
          <div className="text-7xl font-light font-mono tracking-tight">
            ${perPersonTotal.toFixed(2)}
          </div>
        </div>

        <div className="pt-8 border-t border-violet-500/50 flex justify-between items-center text-violet-200">
          <span className="text-lg">Total Bill + Tip</span>
          <span className="font-mono text-3xl">${totalAmt.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
