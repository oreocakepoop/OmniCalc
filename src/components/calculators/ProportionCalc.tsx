import { useState } from 'react';

export function ProportionCalc() {
    const [a, setA] = useState('2');
  const [b, setB] = useState('4');
  const [c, setC] = useState('6');

  const valA = parseFloat(a);
  const valB = parseFloat(b);
  const valC = parseFloat(c);

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1000000000) return num.toExponential(4);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(num);
  };

  let result = '...';
  if (!isNaN(valA) && !isNaN(valB) && !isNaN(valC) && valA !== 0) {
    result = formatNumber((valB * valC) / valA);
  }

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-10 sm:p-16">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-medium text-charcoal">Rule of Three</h3>
        <p className="text-charcoal/50 text-xl mt-4">A is to B as C is to X</p>
      </div>

      <div className="flex items-center justify-center gap-8 sm:gap-12 text-4xl font-mono">
        <div className="flex flex-col gap-6">
          <input type="number" value={a} onChange={(e) => setA(e.target.value)}
            className={`w-32 sm:w-48 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-center focus:outline-none focus-visible:ring-charcoal`} placeholder="A" />
          <div className="h-1 bg-charcoal/20 w-full rounded-full"></div>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)}
            className={`w-32 sm:w-48 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-center focus:outline-none focus-visible:ring-charcoal`} placeholder="B" />
        </div>

        <div className="text-charcoal/50 text-5xl">=</div>

        <div className="flex flex-col gap-6">
          <input type="number" value={c} onChange={(e) => setC(e.target.value)}
            className={`w-32 sm:w-48 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-center focus:outline-none focus-visible:ring-charcoal`} placeholder="C" />
          <div className="h-1 bg-charcoal/20 w-full rounded-full"></div>
          <div className={`w-32 sm:w-48 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-center min-h-[88px] flex items-center justify-center text-mustard`}>
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
