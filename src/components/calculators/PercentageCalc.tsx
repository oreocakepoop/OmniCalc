import { useState } from 'react';

export function PercentageCalc() {
    const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const [val4, setVal4] = useState('');
  const [val5, setVal5] = useState('');
  const [val6, setVal6] = useState('');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* What is X% of Y? */}
      <div className="glass-panel  p-10 sm:p-12">
        <h3 className="text-2xl font-medium text-charcoal/70 mb-8 uppercase tracking-widest">What is X% of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-charcoal/50 text-2xl">What is</span>
          <input 
            type="number" 
            value={val1} 
            onChange={e => setVal1(e.target.value)}
            className={`w-full sm:w-32 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="X"
          />
          <span className="text-charcoal/50 text-2xl">% of</span>
          <input 
            type="number" 
            value={val2} 
            onChange={e => setVal2(e.target.value)}
            className={`w-full sm:w-48 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="Y"
          />
          <span className="text-charcoal/50 text-3xl">=</span>
          <div className={`w-full sm:w-64 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-4xl text-center font-mono text-mustard min-h-[80px] flex items-center justify-center`}>
            {val1 && val2 ? formatNumber((parseFloat(val1) / 100) * parseFloat(val2)) : '0.00'}
          </div>
        </div>
      </div>

      {/* X is what % of Y? */}
      <div className="glass-panel  p-10 sm:p-12">
        <h3 className="text-2xl font-medium text-charcoal/70 mb-8 uppercase tracking-widest">X is what % of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <input 
            type="number" 
            value={val3} 
            onChange={e => setVal3(e.target.value)}
            className={`w-full sm:w-48 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="X"
          />
          <span className="text-charcoal/50 text-2xl">is what % of</span>
          <input 
            type="number" 
            value={val4} 
            onChange={e => setVal4(e.target.value)}
            className={`w-full sm:w-48 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="Y"
          />
          <span className="text-charcoal/50 text-3xl">=</span>
          <div className={`w-full sm:w-64 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-4xl text-center font-mono text-mustard min-h-[80px] flex items-center justify-center`}>
            {val3 && val4 && parseFloat(val4) !== 0 ? formatNumber((parseFloat(val3) / parseFloat(val4)) * 100) + '%' : '0.00%'}
          </div>
        </div>
      </div>

      {/* Percentage increase/decrease */}
      <div className="glass-panel  p-10 sm:p-12">
        <h3 className="text-2xl font-medium text-charcoal/70 mb-8 uppercase tracking-widest">Percentage change from X to Y</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span className="text-charcoal/50 text-2xl">From</span>
          <input 
            type="number" 
            value={val5} 
            onChange={e => setVal5(e.target.value)}
            className={`w-full sm:w-48 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="X"
          />
          <span className="text-charcoal/50 text-2xl">to</span>
          <input 
            type="number" 
            value={val6} 
            onChange={e => setVal6(e.target.value)}
            className={`w-full sm:w-48 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`}
            placeholder="Y"
          />
          <span className="text-charcoal/50 text-3xl">=</span>
          <div className={`w-full sm:w-64 bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-4xl text-center font-mono text-mustard min-h-[80px] flex items-center justify-center`}>
            {val5 && val6 && parseFloat(val5) !== 0 
              ? formatNumber(((parseFloat(val6) - parseFloat(val5)) / Math.abs(parseFloat(val5))) * 100) + '%' 
              : '0.00%'}
          </div>
        </div>
      </div>
    </div>
  );
}
