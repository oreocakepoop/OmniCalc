import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

// Mock rates relative to USD
const rates: Record<string, { rate: number, symbol: string, name: string, flag: string }> = {
  USD: { rate: 1, symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { rate: 0.92, symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { rate: 0.79, symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  JPY: { rate: 150.4, symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  CAD: { rate: 1.35, symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  AUD: { rate: 1.52, symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  INR: { rate: 82.9, symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  CNY: { rate: 7.19, symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
};

export function CurrencyCalc() {
  const { themeClasses } = useTheme();
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const val = parseFloat(amount) || 0;
  const inUSD = val / rates[from].rate;
  const result = inUSD * rates[to].rate;

  return (
    <div className="w-full max-w-md mx-auto glass-panel rounded-3xl p-6 sm:p-8">
      <div className="text-center mb-8">
        <div className="text-zinc-500 text-sm mb-2">Exchange Rate (Mock Data)</div>
        <div className="text-xs font-mono text-zinc-400">
          1 {from} = {(rates[to].rate / rates[from].rate).toFixed(4)} {to}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative bg-zinc-950/50 border border-zinc-800 rounded-2xl p-4 transition-all focus-within:border-zinc-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase">You Send</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent text-zinc-300 text-sm font-medium focus:outline-none cursor-pointer">
              {Object.keys(rates).map(c => <option key={c} value={c}>{rates[c].flag} {c}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-2xl text-zinc-500 mr-2">{rates[from].symbol}</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-3xl font-light font-mono text-zinc-100 focus:outline-none" placeholder="0" />
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={() => { setFrom(to); setTo(from); }}
            className={`w-10 h-10 rounded-full bg-zinc-800 border-4 border-[#09090b] flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors`}
          >
            ⇅
          </button>
        </div>

        <div className={`relative bg-zinc-950/50 border ${themeClasses.border} rounded-2xl p-4`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-medium ${themeClasses.text} uppercase`}>They Receive</span>
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="bg-transparent text-zinc-300 text-sm font-medium focus:outline-none cursor-pointer">
              {Object.keys(rates).map(c => <option key={c} value={c}>{rates[c].flag} {c}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <span className={`text-2xl ${themeClasses.text} opacity-70 mr-2`}>{rates[to].symbol}</span>
            <div className={`w-full text-3xl font-light font-mono ${themeClasses.text} overflow-hidden`}>
              {result.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
