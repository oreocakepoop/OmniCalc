import { useState } from 'react';

export function ROICalc() {
    const [invested, setInvested] = useState('10000');
  const [returned, setReturned] = useState('12500');
  const [years, setYears] = useState('2');

  const inv = parseFloat(invested) || 0;
  const ret = parseFloat(returned) || 0;
  const y = parseFloat(years) || 0;

  const profit = ret - inv;
  const roi = inv > 0 ? (profit / inv) * 100 : 0;
  const annualized = (inv > 0 && y > 0) ? (Math.pow(ret / inv, 1 / y) - 1) * 100 : 0;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num) + '%';
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Amount Invested</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <input type="number" value={invested} onChange={(e) => setInvested(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
          </div>
        </div>
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Amount Returned</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <input type="number" value={returned} onChange={(e) => setReturned(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
          </div>
        </div>
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Investment Length (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 flex flex-col justify-center space-y-10">
        <div className="text-center mb-6">
          <div className="text-charcoal/70 text-xl font-medium mb-4 uppercase tracking-widest">Return on Investment</div>
          <div className={`text-8xl font-light font-mono ${roi >= 0 ? 'text-mustard' : 'text-red-400'}`}>
            {roi > 0 ? '+' : ''}{formatPercent(roi)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-transparent rounded-2xl p-8 border border-charcoal/20 text-center">
            <div className="text-sm text-charcoal/50 uppercase tracking-wider mb-2">Net Profit</div>
            <div className={`text-3xl font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {profit >= 0 ? '+' : '-'}{formatCurrency(Math.abs(profit))}
            </div>
          </div>
          <div className="bg-transparent rounded-2xl p-8 border border-charcoal/20 text-center">
            <div className="text-sm text-charcoal/50 uppercase tracking-wider mb-2">Annualized ROI</div>
            <div className={`text-3xl font-mono ${annualized >= 0 ? 'text-mustard' : 'text-red-400'}`}>
              {formatPercent(annualized)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
