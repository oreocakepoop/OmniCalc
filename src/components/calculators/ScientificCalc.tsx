import { useState } from 'react';
import { motion } from 'motion/react';

export function ScientificCalc() {
    const [display, setDisplay] = useState('0');
  const [newNumber, setNewNumber] = useState(true);

  const handleNum = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    // Basic implementation for demo
    setDisplay(display + op);
    setNewNumber(false);
  };

  const calculate = () => {
    try {
      // Replace scientific notations for eval
      let eq = display
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      // eslint-disable-next-line no-eval
      const result = eval(eq);
      
      // Format the result with Intl.NumberFormat
      let resStr = String(Number(result.toFixed(8)));
      if (!isNaN(Number(resStr))) {
        resStr = new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format(Number(resStr));
      }
      
      setDisplay(resStr);
      setNewNumber(true);
    } catch (e) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setNewNumber(true);
  };

  const func = (f: string) => {
    if (newNumber) {
      setDisplay(f + '(');
      setNewNumber(false);
    } else {
      setDisplay(display + f + '(');
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'C', '⌫'],
    ['log', 'ln', 'sqrt', '(', ')'],
    ['π', 'e', '^', '/', '*'],
    ['7', '8', '9', '-', '+'],
    ['4', '5', '6', '.', '='],
    ['1', '2', '3', '0', '±']
  ];

  return (
    <div className="w-full max-w-6xl mx-auto glass-panel  p-10 sm:p-12 space-y-8">
      <div className="bg-charcoal  p-10 mb-8 text-right border border-charcoal/20">
        <div className={`text-6xl font-light font-mono tracking-tight overflow-hidden text-ellipsis break-all text-mustard`}>{display}</div>
      </div>
      
      <div className="grid grid-cols-5 gap-4 sm:gap-6">
        {buttons.flat().map((btn, i) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={i}
            onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '⌫') setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
              else if (btn === '=') calculate();
              else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(btn)) func(btn);
              else if (['π', 'e'].includes(btn)) {
                setDisplay(newNumber ? btn : display + btn);
                setNewNumber(false);
              }
              else if (['/', '*', '-', '+', '^', '(', ')'].includes(btn)) handleOp(btn);
              else if (btn === '±') setDisplay(String(-parseFloat(display.replace(/,/g, ''))));
              else handleNum(btn);
            }}
            className={`
              h-20 sm:h-24  text-xl sm:text-3xl font-medium transition-colors border-2 border-transparent hover:border-charcoal
              ${['/', '*', '-', '+', '=', '^'].includes(btn) 
                ? 'bg-charcoal text-mustard' 
                : ['C', '⌫'].includes(btn)
                  ? 'bg-mustard text-charcoal'
                  : ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'π', 'e', '(', ')'].includes(btn)
                    ? 'bg-transparent text-charcoal hover:bg-yellow-400 border border-charcoal/20'
                    : 'bg-transparent text-charcoal hover:bg-yellow-400 border border-charcoal/20'}
            `}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
