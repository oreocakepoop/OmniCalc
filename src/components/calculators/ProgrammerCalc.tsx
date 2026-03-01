import { useState } from 'react';

export function ProgrammerCalc() {
    const [value, setValue] = useState<bigint>(0n);
  const [mode, setMode] = useState<'HEX' | 'DEC' | 'OCT' | 'BIN'>('DEC');

  const handleInput = (str: string) => {
    try {
      let base = 10;
      if (mode === 'HEX') base = 16;
      if (mode === 'OCT') base = 8;
      if (mode === 'BIN') base = 2;
      
      // Basic validation to prevent crash
      if (str === '') {
        setValue(0n);
        return;
      }
      
      // Parse as BigInt
      setValue(BigInt(`0${mode === 'HEX' ? 'x' : mode === 'OCT' ? 'o' : mode === 'BIN' ? 'b' : ''}${str}`));
    } catch (e) {
      // ignore invalid input
    }
  };

  const currentStr = () => {
    if (mode === 'HEX') return value.toString(16).toUpperCase();
    if (mode === 'OCT') return value.toString(8);
    if (mode === 'BIN') return value.toString(2);
    return value.toString(10);
  };

  const bases = [
    { id: 'HEX', val: value.toString(16).toUpperCase() },
    { id: 'DEC', val: value.toString(10) },
    { id: 'OCT', val: value.toString(8) },
    { id: 'BIN', val: value.toString(2) }
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-3xl p-10 sm:p-12">
      <div className="space-y-4 mb-10">
        {bases.map((b) => (
          <div 
            key={b.id}
            onClick={() => setMode(b.id)}
            className={`flex items-center p-5 rounded-xl cursor-pointer transition-all border ${mode === b.id ? 'border-charcoal bg-charcoal text-mustard border-2 border-charcoal/20' : 'border-transparent hover:bg-yellow-400'}`}
          >
            <div className={`w-16 text-lg font-bold tracking-wider ${mode === b.id ? 'text-mustard' : 'text-charcoal/50'}`}>
              {b.id}
            </div>
            <div className={`flex-1 font-mono text-2xl truncate ${mode === b.id ? 'text-white' : 'text-charcoal/70'}`}>
              {b.val || '0'}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={currentStr()}
          onChange={(e) => handleInput(e.target.value)}
          className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-2xl px-8 py-8 text-4xl font-mono text-charcoal focus:outline-none focus-visible:ring-charcoal transition-all uppercase`}
          placeholder="0"
          spellCheck="false"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold text-charcoal/50 uppercase tracking-widest">
          {mode} INPUT
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-8">
        {['AND', 'OR', 'XOR', 'NOT', '<<', '>>'].map((op) => (
          <button
            key={op}
            onClick={() => {
              if (op === 'NOT') setValue(~value);
              if (op === '<<') setValue(value << 1n);
              if (op === '>>') setValue(value >> 1n);
              // AND/OR/XOR require a second operand, simplified for demo
            }}
            className="bg-transparent border border-charcoal/20 hover:bg-yellow-400 text-charcoal py-6 rounded-xl font-mono text-xl transition-colors"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
