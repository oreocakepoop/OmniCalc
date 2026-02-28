import { useState } from 'react';
import { motion } from 'motion/react';

// Mock rates
const rates: Record<string, { rate: number, symbol: string, name: string }> = {
  USD: { rate: 1, symbol: '$', name: 'US Dollar' },
  EUR: { rate: 0.903, symbol: '€', name: 'Euro' },
};

export function CurrencyCalc() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const val = parseFloat(amount) || 0;
  const inUSD = val / rates[from].rate;
  const result = inUSD * rates[to].rate;

  const handleNum = (num: string) => {
    setAmount(prev => prev === '0' && num !== '.' ? num : prev + num);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(num);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col bg-[#16171a] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl h-[800px]">
      {/* Display Area */}
      <div className="p-12 space-y-10 flex-1 flex flex-col justify-center">
        <div>
          <div className="text-slate-400 text-xl mb-4">
            {rates[from].name}, {rates[from].symbol}1 = {rates[to].symbol}{(rates[to].rate / rates[from].rate).toFixed(3)}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-white text-7xl font-semibold tracking-tight">
              {rates[from].symbol}{formatNumber(val)}
            </div>
            <i className="fa-solid fa-chevron-down text-[#20c976] text-3xl"></i>
          </div>
        </div>
        
        <div className="h-[2px] bg-[#222429] w-full my-6"></div>
        
        <div>
          <div className="text-slate-400 text-xl mb-4">
            {rates[to].name}, {rates[to].symbol}1 = {rates[from].symbol}{(rates[from].rate / rates[to].rate).toFixed(3)}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-white text-7xl font-semibold tracking-tight">
              {rates[to].symbol}{formatNumber(result)}
            </div>
            <i className="fa-solid fa-chevron-down text-[#20c976] text-3xl"></i>
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="mt-auto grid grid-cols-3 gap-[2px] bg-[#222429] p-[2px]">
        <Key icon="fa-solid fa-clock-rotate-left" color="#20c976" />
        <Key icon="fa-solid fa-arrows-rotate" color="#20c976" onClick={() => { setFrom(to); setTo(from); }} />
        <Key text="C" color="#20c976" onClick={() => setAmount('0')} />
        
        <Key text="1" onClick={() => handleNum('1')} />
        <Key text="2" onClick={() => handleNum('2')} />
        <Key text="3" onClick={() => handleNum('3')} />
        
        <Key text="4" onClick={() => handleNum('4')} />
        <Key text="5" onClick={() => handleNum('5')} />
        <Key text="6" onClick={() => handleNum('6')} />
        
        <Key text="7" onClick={() => handleNum('7')} />
        <Key text="8" onClick={() => handleNum('8')} />
        <Key text="9" onClick={() => handleNum('9')} />
        
        <Key text="," onClick={() => handleNum('.')} />
        <Key text="0" onClick={() => handleNum('0')} />
        <Key icon="fa-solid fa-arrow-turn-down fa-rotate-90" color="#20c976" />
      </div>
    </div>
  );
}

function Key({ text, icon, color = 'white', onClick }: any) {
  return (
    <motion.button
      whileTap={{ scale: 0.95, backgroundColor: '#2a2d35' }}
      onClick={onClick}
      className="calc-key h-32 col-span-1 text-4xl bg-[#16171a] hover:bg-[#2a2d35] transition-colors flex items-center justify-center font-medium"
      style={{ color }}
    >
      {icon ? <i className={icon}></i> : text}
    </motion.button>
  );
}
