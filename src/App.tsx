import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalculatorId } from './types';

// Calculators
import { StandardCalc } from './components/calculators/StandardCalc';
import { ScientificCalc } from './components/calculators/ScientificCalc';
import { PercentageCalc } from './components/calculators/PercentageCalc';
import { BMICalc } from './components/calculators/BMICalc';
import { TipCalc } from './components/calculators/TipCalc';
import { DiscountCalc } from './components/calculators/DiscountCalc';
import { MortgageCalc } from './components/calculators/MortgageCalc';
import { AgeCalc } from './components/calculators/AgeCalc';
import { DateDiffCalc } from './components/calculators/DateDiffCalc';
import { UnitConverter } from './components/calculators/UnitConverter';
import { CompoundCalc } from './components/calculators/CompoundCalc';
import { ProgrammerCalc } from './components/calculators/ProgrammerCalc';
import { DataCalc } from './components/calculators/DataCalc';
import { CurrencyCalc } from './components/calculators/CurrencyCalc';
import { TimeMathCalc } from './components/calculators/TimeMathCalc';
import { FuelCalc } from './components/calculators/FuelCalc';
import { SalaryCalc } from './components/calculators/SalaryCalc';
import { CookingCalc } from './components/calculators/CookingCalc';
import { ProportionCalc } from './components/calculators/ProportionCalc';
import { ROICalc } from './components/calculators/ROICalc';

// Calculator Metadata
export const calculators = [
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
] as const;

// QOL: Toast Context
interface ToastContextType {
  showToast: (message: string) => void;
}
export const ToastContext = createContext<ToastContextType>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

// QOL: Haptic Feedback Helper
export const vibrate = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(50);
  }
};

function AppContent() {
  const [activeId, setActiveId] = useState<CalculatorId>('standard');
  const [toastMsg, setToastMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetKey, setResetKey] = useState(0); // QOL: Global reset key
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeCalc = calculators.find(c => c.id === activeId);

  // QOL: Dynamic Title
  useEffect(() => {
    document.title = `${activeCalc?.name || 'OmniCalc'} | Pro Calculator Suite`;
  }, [activeCalc]);

  // QOL: Fullscreen API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // QOL: Keyboard Shortcuts (Cmd+K for search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus search input when palette opens
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isCommandPaletteOpen]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleSelectCalc = (id: CalculatorId) => {
    vibrate();
    setActiveId(id);
    setIsCommandPaletteOpen(false);
  };

  const handleGlobalReset = () => {
    vibrate();
    setResetKey(prev => prev + 1);
    showToast('Calculator Reset');
  };

  const renderCalculator = () => {
    switch (activeId) {
      case 'standard': return <StandardCalc />;
      case 'scientific': return <ScientificCalc />;
      case 'percentage': return <PercentageCalc />;
      case 'bmi': return <BMICalc />;
      case 'tip': return <TipCalc />;
      case 'discount': return <DiscountCalc />;
      case 'mortgage': return <MortgageCalc />;
      case 'age': return <AgeCalc />;
      case 'date-diff': return <DateDiffCalc />;
      case 'unit': return <UnitConverter />;
      case 'compound': return <CompoundCalc />;
      case 'programmer': return <ProgrammerCalc />;
      case 'data': return <DataCalc />;
      case 'currency': return <CurrencyCalc />;
      case 'time-math': return <TimeMathCalc />;
      case 'fuel': return <FuelCalc />;
      case 'salary': return <SalaryCalc />;
      case 'cooking': return <CookingCalc />;
      case 'proportion': return <ProportionCalc />;
      case 'roi': return <ROICalc />;
      default: return <StandardCalc />;
    }
  };

  const filteredCalculators = calculators.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen w-full bg-white text-charcoal font-sans flex flex-col selection:bg-mustard selection:text-charcoal overflow-x-hidden">
        
        {/* QOL: Toast Notification */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-charcoal text-mustard px-8 py-4 rounded-none border-4 border-mustard font-display font-black text-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 uppercase tracking-widest"
            >
              <i className="fa-solid fa-bolt"></i>
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Command Palette Overlay */}
        <AnimatePresence>
          {isCommandPaletteOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-charcoal/80 backdrop-blur-md"
              onClick={() => setIsCommandPaletteOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-5xl bg-white border-4 border-charcoal shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col max-h-[80vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 border-b-4 border-charcoal bg-yellow-400 flex items-center gap-4">
                  <i className="fa-solid fa-magnifying-glass text-3xl text-charcoal opacity-50"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search 20+ calculators..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-3xl font-display font-black text-charcoal placeholder-charcoal/30 outline-none"
                  />
                  <button onClick={() => setIsCommandPaletteOpen(false)} className="w-12 h-12 flex items-center justify-center bg-charcoal text-mustard hover:bg-mustard hover:text-charcoal transition-colors border-2 border-transparent hover:border-charcoal">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCalculators.map(calc => (
                    <button
                      key={calc.id}
                      onClick={() => handleSelectCalc(calc.id as CalculatorId)}
                      className={`flex items-center gap-4 p-6 border-4 text-left transition-all ${activeId === calc.id ? 'bg-charcoal border-charcoal text-mustard scale-[1.02] shadow-xl' : 'bg-white border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-mustard hover:scale-[1.02] hover:shadow-xl'}`}
                    >
                      <div className={`w-16 h-16 flex items-center justify-center text-3xl shrink-0 ${activeId === calc.id ? 'bg-mustard text-charcoal' : 'bg-charcoal text-mustard'}`}>
                        <i className={calc.icon}></i>
                      </div>
                      <div>
                        <div className="font-display font-black text-xl uppercase tracking-wider">{calc.name}</div>
                        <div className={`text-sm font-bold opacity-70 ${activeId === calc.id ? 'text-mustard' : 'text-charcoal'}`}>{calc.category}</div>
                      </div>
                    </button>
                  ))}
                  {filteredCalculators.length === 0 && (
                    <div className="col-span-full py-12 text-center text-charcoal/50 font-display font-black text-2xl uppercase">
                      No tools found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Navigation Bar - Spacious and Clean */}
        <header className="w-full px-6 py-6 lg:px-12 lg:py-8 flex items-center justify-between border-b-4 border-charcoal/10 bg-white z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-charcoal text-mustard flex items-center justify-center shadow-[4px_4px_0px_rgba(42,47,37,1)] border-2 border-charcoal">
              <i className="fa-solid fa-calculator text-3xl"></i>
            </div>
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-black text-charcoal uppercase tracking-widest leading-none">OmniCalc</h1>
              <p className="text-charcoal/70 font-bold tracking-widest text-sm uppercase mt-1">Pro Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Command Palette Trigger */}
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-4 bg-white border-4 border-charcoal px-6 py-3 hover:bg-mustard transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
              <span className="font-display font-black uppercase tracking-widest">Search Tools</span>
              <kbd className="hidden lg:inline-block bg-charcoal text-mustard px-2 py-1 text-xs font-mono font-bold">⌘K</kbd>
            </button>

            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="md:hidden w-14 h-14 flex items-center justify-center bg-white border-4 border-charcoal hover:bg-mustard transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </button>

            {/* Global Reset */}
            <button 
              onClick={handleGlobalReset}
              title="Reset Calculator"
              className="w-14 h-14 flex items-center justify-center bg-white border-4 border-charcoal hover:bg-charcoal hover:text-mustard transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <i className="fa-solid fa-rotate-right text-xl"></i>
            </button>

            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="hidden sm:flex w-14 h-14 items-center justify-center bg-charcoal text-mustard border-4 border-charcoal hover:bg-mustard hover:text-charcoal transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xl`}></i>
            </button>
          </div>
        </header>

        {/* Main Content Area - Massive and Centered */}
        <main className="flex-1 w-full flex flex-col items-center justify-start p-6 lg:p-12 overflow-y-auto">
          
          {/* Active Calculator Header */}
          <div className="w-full max-w-6xl mb-12 text-center">
            <motion.div
              key={`header-${activeId}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center gap-4 mb-4"
            >
              <div className="w-12 h-12 bg-charcoal text-mustard flex items-center justify-center rounded-none border-2 border-charcoal">
                <i className={`${activeCalc?.icon} text-xl`}></i>
              </div>
              <span className="font-display font-black text-charcoal uppercase tracking-widest text-xl">{activeCalc?.category}</span>
            </motion.div>
            <h2 className="font-display text-5xl lg:text-7xl font-black text-charcoal uppercase tracking-tighter leading-none mb-4">
              {activeCalc?.name}
            </h2>
            <p className="text-xl lg:text-2xl text-charcoal/70 font-medium max-w-2xl mx-auto">
              {activeCalc?.description}
            </p>
          </div>

          {/* The Calculator Itself - Given massive space */}
          <div className="w-full max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeId}-${resetKey}`}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                {renderCalculator()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-6xl mt-12 flex items-center justify-between border-t-4 border-charcoal/10 pt-8">
            <button
              onClick={() => {
                const currentIndex = calculators.findIndex(c => c.id === activeId);
                const prevIndex = (currentIndex - 1 + calculators.length) % calculators.length;
                handleSelectCalc(calculators[prevIndex].id as CalculatorId);
              }}
              className="flex items-center gap-4 bg-white border-4 border-charcoal px-6 py-4 hover:bg-mustard transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
              <span className="font-display font-black uppercase tracking-widest hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={() => {
                const currentIndex = calculators.findIndex(c => c.id === activeId);
                const nextIndex = (currentIndex + 1) % calculators.length;
                handleSelectCalc(calculators[nextIndex].id as CalculatorId);
              }}
              className="flex items-center gap-4 bg-white border-4 border-charcoal px-6 py-4 hover:bg-mustard transition-colors shadow-[4px_4px_0px_rgba(42,47,37,1)] active:translate-y-1 active:shadow-none"
            >
              <span className="font-display font-black uppercase tracking-widest hidden sm:inline">Next</span>
              <i className="fa-solid fa-arrow-right text-xl"></i>
            </button>
          </div>

        </main>
      </div>
    </ToastContext.Provider>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
