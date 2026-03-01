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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel  p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20  pl-12 pr-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-xl font-medium text-charcoal/70">Tip Percentage</label>
            <span className={`font-mono text-2xl text-mustard`}>{tipPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full accent-zinc-400 h-3"
          />
          <div className="flex justify-between mt-6 gap-3">
            {[10, 15, 18, 20, 25].map(pct => (
              <button
                key={pct}
                onClick={() => setTipPercent(String(pct))}
                className={`flex-1 py-4  text-lg font-medium transition-colors border border-transparent hover:border-charcoal ${tipPercent === String(pct) ? 'bg-charcoal' + ' text-white shadow-sm' : 'bg-transparent text-charcoal/70 hover:text-charcoal border-charcoal/20'}`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Number of People</label>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setPeople(String(Math.max(1, numPeople - 1)))}
              className="w-16 h-16  bg-transparent border border-charcoal/20 text-charcoal hover:bg-yellow-400 flex items-center justify-center text-3xl transition-colors"
            >-</button>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className={`flex-1 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-center text-2xl focus:outline-none focus-visible:ring-charcoal`}
              min="1"
            />
            <button 
              onClick={() => setPeople(String(numPeople + 1))}
              className="w-16 h-16  bg-transparent border border-charcoal/20 text-charcoal hover:bg-yellow-400 flex items-center justify-center text-3xl transition-colors"
            >+</button>
          </div>
        </div>
      </div>

      <div className="glass-panel  p-10 sm:p-12 flex flex-col justify-center space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-charcoal/70 text-xl font-medium uppercase tracking-widest">Tip Amount</div>
            <div className="text-charcoal/50 text-base">/ person</div>
          </div>
          <div className={`text-6xl font-light font-mono tracking-tight text-mustard`}>
            {formatCurrency(perPersonTip)}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-charcoal/70 text-xl font-medium uppercase tracking-widest">Total</div>
            <div className="text-charcoal/50 text-base">/ person</div>
          </div>
          <div className={`text-7xl font-light font-mono tracking-tight text-mustard`}>
            {formatCurrency(perPersonTotal)}
          </div>
        </div>

        <div className="pt-8 border-t border-charcoal/20 flex justify-between items-center text-charcoal/70">
          <span className="text-xl uppercase tracking-widest">Total Bill + Tip</span>
          <span className={`font-mono text-3xl text-mustard`}>{formatCurrency(totalAmt)}</span>
        </div>
      </div>
    </div>
  );
}
