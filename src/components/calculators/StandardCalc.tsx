import { useState, useEffect, useCallback } from 'react';
import { useToast, vibrate } from '../../App';

export function StandardCalc() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [newNumber, setNewNumber] = useState(true);
  const { showToast } = useToast();

  const handleNum = useCallback((num: string) => {
    vibrate();
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  }, [display, newNumber]);

  const handleOp = useCallback((op: string) => {
    vibrate();
    const mathOp = op === 'x' ? '*' : op === '÷' ? '/' : op;
    setEquation(display + ' ' + mathOp + ' ');
    setNewNumber(true);
  }, [display]);

  const calculate = useCallback(() => {
    vibrate();
    try {
      const expr = (equation + display).replace(/[^0-9+\-*/.]/g, '');
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + expr)();
      const resStr = String(Number(result.toPrecision(12)));
      setDisplay(resStr);
      setEquation('');
      setNewNumber(true);
    } catch (e) {
      setDisplay('Error');
      setNewNumber(true);
    }
  }, [display, equation]);

  const clear = useCallback(() => {
    vibrate();
    setDisplay('0');
    setEquation('');
    setNewNumber(true);
  }, []);

  const copyToClipboard = () => {
    vibrate();
    navigator.clipboard.writeText(display);
    showToast('Result copied to clipboard!');
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9.]/.test(key)) handleNum(key);
      if (['+', '-'].includes(key)) handleOp(key);
      if (key === '*') handleOp('x');
      if (key === '/') handleOp('÷');
      if (key === 'Enter' || key === '=') { e.preventDefault(); calculate(); }
      if (key === 'Escape' || key === 'Backspace' || key === 'Delete') clear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNum, handleOp, calculate, clear]);

  const formatNumber = (numStr: string) => {
    if (numStr === 'Error') return numStr;
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col shadow-2xl overflow-hidden rounded-[2rem] border-4 border-charcoal">
      
      {/* Display Block (Mustard) */}
      <div 
        className="bg-mustard p-10 flex flex-col items-end justify-end h-64 relative group cursor-pointer active:bg-mustard-hover transition-colors"
        onClick={copyToClipboard}
        title="Click to copy"
      >
        <div className="absolute top-6 left-6 text-charcoal/40 font-bold tracking-widest text-sm uppercase">
          Standard
        </div>
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-charcoal">
          <i className="fa-regular fa-copy text-xl"></i>
        </div>
        <div className="text-charcoal/60 font-display text-3xl mb-4 font-medium">{equation}</div>
        <div className="text-charcoal font-display text-8xl font-bold tracking-tighter truncate w-full text-right">
          {formatNumber(display)}
        </div>
      </div>
      
      {/* Keypad Blocks */}
      <div className="flex flex-col">
        {/* Row 1 */}
        <div className="grid grid-cols-4 bg-sage-mid">
          {['7', '8', '9', '+'].map((btn) => (
            <button key={btn} onClick={() => btn === '+' ? handleOp(btn) : handleNum(btn)} className="h-32 text-5xl font-display font-medium text-charcoal hover:bg-sage-light transition-colors active:scale-95">
              {btn}
            </button>
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-4 bg-sage-dark">
          {['4', '5', '6', '-'].map((btn) => (
            <button key={btn} onClick={() => btn === '-' ? handleOp(btn) : handleNum(btn)} className="h-32 text-5xl font-display font-medium text-offwhite hover:bg-sage-mid transition-colors active:scale-95">
              {btn}
            </button>
          ))}
        </div>
        {/* Row 3 */}
        <div className="grid grid-cols-4 bg-sage-darker">
          {['1', '2', '3', 'x'].map((btn) => (
            <button key={btn} onClick={() => btn === 'x' ? handleOp(btn) : handleNum(btn)} className="h-32 text-5xl font-display font-medium text-offwhite hover:bg-sage-dark transition-colors active:scale-95">
              {btn}
            </button>
          ))}
        </div>
        {/* Row 4 */}
        <div className="grid grid-cols-4 bg-charcoal">
          {['C', '0', '=', '÷'].map((btn) => (
            <button key={btn} onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '=') calculate();
              else if (btn === '÷') handleOp(btn);
              else handleNum(btn);
            }} className={`h-32 text-5xl font-display font-medium transition-colors active:scale-95 ${btn === '=' || btn === 'C' ? 'text-mustard hover:text-mustard-hover' : 'text-offwhite hover:text-sage-light'}`}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
