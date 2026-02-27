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
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  // Group by category
  const categories = Array.from(new Set(filtered.map(c => c.category)));

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-charcoal/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}
      
      <aside className={`fixed lg:static top-0 left-0 z-50 h-screen w-full sm:w-[400px] bg-sage-bg flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-8 pb-6 flex justify-between items-start shrink-0">
          <div>
            <div className="w-12 h-12 rounded-full bg-charcoal text-mustard flex items-center justify-center mb-6 shadow-lg">
              <i className="fa-solid fa-user text-xl"></i>
            </div>
            <h1 className="font-display text-4xl font-light text-sage-darker leading-tight">
              All Recent<br/><span className="font-bold text-charcoal">Calculators</span>
            </h1>
          </div>
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
          <div className="hidden lg:flex w-10 h-10 items-center justify-center text-charcoal">
            <i className="fa-solid fa-grip text-2xl opacity-50"></i>
          </div>
        </div>

        <div className="px-8 pb-6 shrink-0">
          <div className="relative group">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 group-focus-within:text-mustard transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search tools..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-sage-dark/10 border-2 border-transparent focus:border-charcoal focus:bg-charcoal focus:text-offwhite rounded-2xl pl-12 pr-4 py-4 text-charcoal font-display font-bold placeholder-charcoal/40 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto sidebar-scroll flex flex-col pb-8">
          {categories.map(category => (
            <div key={category} className="mb-4">
              <div className="sticky top-0 bg-sage-bg/95 backdrop-blur-sm z-10 px-8 py-3 flex items-center gap-3">
                <h3 className="font-display font-bold text-charcoal uppercase tracking-widest text-xs">{category}</h3>
                <div className="h-px bg-sage-dark/20 flex-1"></div>
              </div>
              
              <div className="flex flex-col">
                {filtered.filter(c => c.category === category).map(calc => {
                  const isActive = activeId === calc.id;
                  return (
                    <button
                      key={calc.id}
                      onClick={() => {
                        onSelect(calc.id);
                        if (window.innerWidth < 1024) setIsOpen(false);
                      }}
                      className="flex w-full group transition-transform active:scale-[0.98] cursor-pointer border-b border-sage-dark/10 last:border-0"
                    >
                      <div className={`w-24 h-24 flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-charcoal text-mustard' : 'bg-sage-darker text-offwhite group-hover:bg-charcoal'}`}>
                        <i className={`${calc.icon} text-2xl ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'} transition-transform duration-300`}></i>
                      </div>
                      <div className={`flex-1 h-24 flex flex-col justify-center px-6 text-left transition-colors duration-300 ${isActive ? 'bg-mustard text-charcoal' : 'bg-sage-mid text-charcoal group-hover:bg-sage-light'}`}>
                        <span className="font-display font-bold text-xl tracking-tight">{calc.name}</span>
                        <span className={`text-xs font-medium mt-1 line-clamp-1 ${isActive ? 'text-charcoal/70' : 'text-sage-darker/60 group-hover:text-charcoal/60'}`}>
                          {calc.description}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-sage-darker font-medium">
              <i className="fa-solid fa-ghost text-4xl mb-3 opacity-20"></i>
              <p>No calculators found.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
