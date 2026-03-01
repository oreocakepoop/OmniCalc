import { useState } from 'react';

// Mock rates
const rates: Record<string, { rate: number, symbol: string, name: string }> = {
  USD: { rate: 1, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 0.903, symbol: '€', name: 'Euro' },
  GBP: { rate: 0.78, symbol: '£', name: 'British Pound' },
  JPY: { rate: 150.2, symbol: '¥', name: 'Japanese Yen' },
  CAD: { rate: 1.35, symbol: '$', name: 'Canadian Dollar' },
  AUD: { rate: 1.52, symbol: '$', name: 'Australian Dollar' },
};

export function CurrencyCalc() {
    const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const val = parseFloat(amount) || 0;
  const inUSD = val / rates[from].rate;
  const result = inUSD * rates[to].rate;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(num);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel  p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">From Currency</label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl focus:outline-none appearance-none focus-visible:ring-charcoal`}
            >
              {Object.keys(rates).map(key => (
                <option key={key} value={key}>{key} - {rates[key].name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-charcoal/50">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Amount</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">{rates[from].symbol}</span>
            <div className="relative w-full">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20  pl-12 pr-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal`}
                placeholder="0"
              />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20  pl-12 pr-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {amount ? formatNumber(parseFloat(amount)) : '0'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">To Currency</label>
          <div className="relative">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl focus:outline-none appearance-none focus-visible:ring-charcoal`}
            >
              {Object.keys(rates).map(key => (
                <option key={key} value={key}>{key} - {rates[key].name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-charcoal/50">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel  p-10 sm:p-12 flex flex-col justify-center space-y-10">
        <div className="text-center mb-6">
          <div className="text-charcoal/70 text-xl font-medium mb-4 uppercase tracking-widest">Converted Amount</div>
          <div className={`text-6xl font-light font-mono text-mustard break-words`}>
            {rates[to].symbol}{formatNumber(result)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-transparent  p-8 border border-charcoal/20 text-center">
            <div className="text-sm text-charcoal/50 uppercase tracking-wider mb-2">{from} to {to}</div>
            <div className="text-2xl font-mono text-charcoal">
              {(rates[to].rate / rates[from].rate).toFixed(4)}
            </div>
          </div>
          <div className="bg-transparent  p-8 border border-charcoal/20 text-center">
            <div className="text-sm text-charcoal/50 uppercase tracking-wider mb-2">{to} to {from}</div>
            <div className="text-2xl font-mono text-charcoal">
              {(rates[from].rate / rates[to].rate).toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

