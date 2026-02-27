import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useToast, vibrate } from '../../App';

export function MortgageCalc() {
  const [principal, setPrincipal] = useLocalStorage('mortgage-principal', '300000');
  const [rate, setRate] = useLocalStorage('mortgage-rate', '5.5');
  const [years, setYears] = useLocalStorage('mortgage-years', '30');
  const { showToast } = useToast();

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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const copyToClipboard = () => {
    if (monthlyPayment > 0) {
      vibrate();
      navigator.clipboard.writeText(formatCurrency(monthlyPayment));
      showToast('Monthly payment copied!');
    }
  };

  const handleReset = () => {
    vibrate();
    setPrincipal('300000');
    setRate('5.5');
    setYears('30');
    showToast('Reset to defaults');
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col shadow-2xl overflow-hidden rounded-[2rem] border-4 border-charcoal">
      
      {/* Result Block (Mustard) */}
      <div 
        className="bg-mustard p-8 flex flex-col items-start justify-end h-48 relative group cursor-pointer active:bg-mustard-hover transition-colors"
        onClick={copyToClipboard}
        title="Click to copy"
      >
        <div className="absolute top-6 left-6 text-charcoal/40 font-bold tracking-widest text-sm uppercase">
          Monthly Payment
        </div>
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-charcoal">
          <i className="fa-regular fa-copy text-xl"></i>
        </div>
        <div className="text-charcoal font-display text-5xl font-bold tracking-tighter truncate w-full">
          {monthlyPayment > 0 ? formatCurrency(monthlyPayment) : '$0.00'}
        </div>
      </div>

      {/* Input Blocks */}
      <div className="flex flex-col">
        
        {/* Principal */}
        <div className="bg-sage-mid p-6 flex items-center justify-between border-b border-charcoal/10">
          <label className="text-charcoal font-display font-semibold uppercase tracking-widest text-sm">Loan Amount</label>
          <div className="relative w-1/2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50 font-bold">$</span>
            <input 
              type="number" 
              value={principal} 
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full bg-transparent text-right text-2xl font-display font-bold text-charcoal placeholder-charcoal/30 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div className="bg-sage-dark p-6 flex items-center justify-between border-b border-charcoal/10">
          <label className="text-offwhite font-display font-semibold uppercase tracking-widest text-sm">Interest Rate</label>
          <div className="relative w-1/2">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-offwhite/50 font-bold">%</span>
            <input 
              type="number" 
              value={rate} 
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-transparent text-right pr-10 text-2xl font-display font-bold text-offwhite placeholder-offwhite/30 focus:outline-none"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div className="bg-sage-darker p-6 flex items-center justify-between border-b border-charcoal/10">
          <label className="text-offwhite font-display font-semibold uppercase tracking-widest text-sm">Loan Term</label>
          <div className="relative w-1/2">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-offwhite/50 font-bold text-sm">YRS</span>
            <input 
              type="number" 
              value={years} 
              onChange={(e) => setYears(e.target.value)}
              className="w-full bg-transparent text-right pr-14 text-2xl font-display font-bold text-offwhite placeholder-offwhite/30 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Details */}
        <div className="bg-charcoal p-6 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-offwhite/50 font-display uppercase tracking-widest">Total Interest</span>
            <span className="text-mustard font-display font-bold">{totalInterest > 0 ? formatCurrency(totalInterest) : '$0.00'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-offwhite/50 font-display uppercase tracking-widest">Total Cost</span>
            <span className="text-mustard font-display font-bold">{totalPayment > 0 ? formatCurrency(totalPayment) : '$0.00'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-charcoal p-4 flex justify-center border-t border-offwhite/10">
          <button 
            onClick={handleReset}
            className="text-offwhite/50 font-display font-bold uppercase tracking-widest text-xs hover:text-offwhite transition-colors active:scale-95"
          >
            Reset Values
          </button>
        </div>

      </div>
    </div>
  );
}
