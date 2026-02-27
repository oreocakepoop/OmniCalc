import { useState } from 'react';

export function PercentageCalc() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const [val4, setVal4] = useState('');
  const [val5, setVal5] = useState('');
  const [val6, setVal6] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* What is X% of Y? */}
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
        <h3 className="text-lg font-medium text-zinc-100 mb-4">What is X% of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-zinc-400">What is</span>
          <input 
            type="number" 
            value={val1} 
            onChange={e => setVal1(e.target.value)}
            className="w-full sm:w-24 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="X"
          />
          <span className="text-zinc-400">% of</span>
          <input 
            type="number" 
            value={val2} 
            onChange={e => setVal2(e.target.value)}
            className="w-full sm:w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="Y"
          />
          <span className="text-zinc-400">=</span>
          <div className="w-full sm:w-32 bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2 text-center font-mono text-violet-400">
            {val1 && val2 ? ((parseFloat(val1) / 100) * parseFloat(val2)).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      {/* X is what % of Y? */}
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
        <h3 className="text-lg font-medium text-zinc-100 mb-4">X is what % of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input 
            type="number" 
            value={val3} 
            onChange={e => setVal3(e.target.value)}
            className="w-full sm:w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="X"
          />
          <span className="text-zinc-400">is what % of</span>
          <input 
            type="number" 
            value={val4} 
            onChange={e => setVal4(e.target.value)}
            className="w-full sm:w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="Y"
          />
          <span className="text-zinc-400">=</span>
          <div className="w-full sm:w-32 bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2 text-center font-mono text-violet-400">
            {val3 && val4 && parseFloat(val4) !== 0 ? ((parseFloat(val3) / parseFloat(val4)) * 100).toFixed(2) + '%' : '0.00%'}
          </div>
        </div>
      </div>

      {/* Percentage increase/decrease */}
      <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
        <h3 className="text-lg font-medium text-zinc-100 mb-4">Percentage change from X to Y</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-zinc-400">From</span>
          <input 
            type="number" 
            value={val5} 
            onChange={e => setVal5(e.target.value)}
            className="w-full sm:w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="X"
          />
          <span className="text-zinc-400">to</span>
          <input 
            type="number" 
            value={val6} 
            onChange={e => setVal6(e.target.value)}
            className="w-full sm:w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-center focus:outline-none focus:border-violet-500"
            placeholder="Y"
          />
          <span className="text-zinc-400">=</span>
          <div className="w-full sm:w-32 bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-2 text-center font-mono text-violet-400">
            {val5 && val6 && parseFloat(val5) !== 0 
              ? (((parseFloat(val6) - parseFloat(val5)) / Math.abs(parseFloat(val5))) * 100).toFixed(2) + '%' 
              : '0.00%'}
          </div>
        </div>
      </div>
    </div>
  );
}
