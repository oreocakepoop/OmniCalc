import { useState } from 'react';
import { CalculatorId, CalculatorInfo } from '../types';

export const calculators: CalculatorInfo[] = [
  { id: 'standard', name: 'Standard', description: 'Basic arithmetic', icon: 'fa-solid fa-calculator', category: 'Math' },
  { id: 'scientific', name: 'Scientific', description: 'Advanced math', icon: 'fa-solid fa-flask', category: 'Math' },
  { id: 'percentage', name: 'Percentage', description: 'Calculate percentages', icon: 'fa-solid fa-percent', category: 'Math' },
  { id: 'proportion', name: 'Proportion', description: 'Rule of three', icon: 'fa-solid fa-equals', category: 'Math' },
  { id: 'compound', name: 'Compound', description: 'Investment growth', icon: 'fa-solid fa-chart-line', category: 'Finance' },
  { id: 'roi', name: 'ROI', description: 'Return on investment', icon: 'fa-solid fa-money-bill-trend-up', category: 'Finance' },
  { id: 'mortgage', name: 'Mortgage', description: 'Home loan payments', icon: 'fa-solid fa-house', category: 'Finance' },
  { id: 'salary', name: 'Salary', description: 'Wage converter', icon: 'fa-solid fa-briefcase', category: 'Finance' },
  { id: 'currency', name: 'Currency', description: 'Exchange rates', icon: 'fa-solid fa-coins', category: 'Finance' },
  { id: 'tip', name: 'Tip', description: 'Split bill & tip', icon: 'fa-solid fa-receipt', category: 'Finance' },
  { id: 'discount', name: 'Discount', description: 'Price after sale', icon: 'fa-solid fa-tag', category: 'Finance' },
  { id: 'bmi', name: 'BMI', description: 'Body Mass Index', icon: 'fa-solid fa-heart-pulse', category: 'Health' },
  { id: 'age', name: 'Age', description: 'Exact age calculator', icon: 'fa-solid fa-cake-candles', category: 'Everyday' },
  { id: 'date-diff', name: 'Date Diff', description: 'Days between dates', icon: 'fa-solid fa-calendar-days', category: 'Everyday' },
  { id: 'time-math', name: 'Time Math', description: 'Add/subtract time', icon: 'fa-solid fa-hourglass-half', category: 'Everyday' },
  { id: 'fuel', name: 'Fuel', description: 'Trip cost & mileage', icon: 'fa-solid fa-gas-pump', category: 'Everyday' },
  { id: 'cooking', name: 'Cooking', description: 'Volume conversions', icon: 'fa-solid fa-utensils', category: 'Everyday' },
  { id: 'unit', name: 'Unit', description: 'Length, weight, temp', icon: 'fa-solid fa-scale-balanced', category: 'Everyday' },
  { id: 'programmer', name: 'Programmer', description: 'Hex, Dec, Oct, Bin', icon: 'fa-solid fa-code', category: 'Tech' },
  { id: 'data', name: 'Data Storage', description: 'Bytes & transfer', icon: 'fa-solid fa-hard-drive', category: 'Tech' },
];

interface SidebarProps {
  activeId: CalculatorId;
  onSelect: (id: CalculatorId) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ activeId, onSelect, isOpen, setIsOpen }: SidebarProps) {
  const [search, setSearch] = useState('');

  const filtered = calculators.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
      
      <aside className={`fixed lg:sticky top-4 left-0 z-50 h-[calc(100vh-2rem)] w-72 neu-flat flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-4' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 pb-2">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full neu-pressed rounded-xl pl-10 pr-4 py-3 text-sm text-slate-600 focus:outline-none placeholder-slate-400 font-semibold"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {filtered.map(calc => (
            <button
              key={calc.id}
              onClick={() => {
                onSelect(calc.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left font-semibold ${activeId === calc.id ? 'neu-pressed text-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeId === calc.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                <i className={calc.icon}></i>
              </div>
              <span className="truncate">{calc.name}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
