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
      setDisplay(String(Number(result.toFixed(8))));
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
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-800">
      <div className="bg-zinc-950 rounded-2xl p-6 mb-6 text-right border border-zinc-800/50">
        <div className="text-4xl font-light font-mono tracking-tight overflow-hidden text-ellipsis break-all">{display}</div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
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
              else if (btn === '±') setDisplay(String(-parseFloat(display)));
              else handleNum(btn);
            }}
            className={`
              h-12 sm:h-14 rounded-xl text-sm sm:text-lg font-medium transition-colors
              ${['/', '*', '-', '+', '=', '^'].includes(btn) 
                ? 'bg-violet-600 text-white hover:bg-violet-500' 
                : ['C', '⌫'].includes(btn)
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'π', 'e', '(', ')'].includes(btn)
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-zinc-800/50 text-zinc-100 hover:bg-zinc-700/50'}
            `}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
