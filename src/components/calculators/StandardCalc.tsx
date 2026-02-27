import { useState, useEffect, useCallback } from 'react';

export function StandardCalc() {
  const [display, setDisplay] = useState('0.27');
  const [equation, setEquation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNum = useCallback((num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  }, [display, newNumber]);

  const handleOp = useCallback((op: string) => {
    // Map visual operators to math operators
    const mathOp = op === 'x' ? '*' : op === '÷' ? '/' : op;
    setEquation(display + ' ' + mathOp + ' ');
    setNewNumber(true);
  }, [display]);

  const calculate = useCallback(() => {
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
    setDisplay('0');
    setEquation('');
    setNewNumber(true);
  }, []);

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

  const buttons = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', 'x'],
    ['C', '0', '=', '÷']
  ];

  return (
    <div className="w-full max-w-[340px] mx-auto calc-body p-6 sm:p-8">
      <div className="calc-display h-20 sm:h-24 mb-6 sm:mb-8 flex items-center justify-end px-4 sm:px-6 text-4xl sm:text-5xl font-light tracking-tight overflow-hidden">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-4 sm:gap-5">
        {buttons.flat().map((btn, i) => {
          let btnClass = "calc-btn h-14 sm:h-16";
          if (['+', '-', 'x', '÷', '='].includes(btn)) btnClass = "calc-btn-dark h-14 sm:h-16";
          if (btn === 'C') btnClass = "calc-btn-red h-14 sm:h-16";
          
          return (
            <button
              key={i}
              onClick={() => {
                if (btn === 'C') clear();
                else if (btn === '=') calculate();
                else if (['+', '-', 'x', '÷'].includes(btn)) handleOp(btn);
                else handleNum(btn);
              }}
              className={btnClass}
            >
              {btn}
            </button>
          )
        })}
      </div>
    </div>
  );
}
