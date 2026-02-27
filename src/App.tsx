import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalculatorId } from './types';
import { Sidebar, calculators } from './components/Sidebar';
import { ThemeProvider } from './ThemeContext';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const activeCalc = calculators.find(c => c.id === activeId);
  const activeIndex = calculators.findIndex(c => c.id === activeId);

  useEffect(() => {
    document.title = `${activeCalc?.name || 'OmniCalc'} | Free Online Calculators`;
  }, [activeCalc]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const navigateCalc = (direction: 'prev' | 'next') => {
    vibrate();
    let newIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (newIndex < 0) newIndex = calculators.length - 1;
    if (newIndex >= calculators.length) newIndex = 0;
    setActiveId(calculators[newIndex].id);
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

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-sage-bg text-charcoal font-sans flex justify-center selection:bg-mustard selection:text-charcoal">
        
        {/* QOL: Toast Notification */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-charcoal text-mustard px-6 py-3 rounded-full font-display font-semibold shadow-2xl flex items-center gap-3"
            >
              <i className="fa-solid fa-circle-check"></i>
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row shadow-2xl bg-sage-bg overflow-hidden relative">
          
          {/* Mobile Header */}
          <div className="lg:hidden p-6 flex justify-between items-center bg-sage-bg border-b border-sage-dark/20 z-30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-charcoal text-mustard flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-user"></i>
              </div>
              <h1 className="font-display text-2xl font-bold text-charcoal">OmniCalc</h1>
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-charcoal" onClick={() => setIsSidebarOpen(true)}>
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Left Sidebar */}
          <div className="hidden lg:block w-[400px] border-r border-sage-dark/20 h-screen overflow-hidden shrink-0 bg-sage-bg z-20">
            <Sidebar 
              activeId={activeId} 
              onSelect={setActiveId} 
              isOpen={true}
              setIsOpen={() => {}}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          <div className="lg:hidden">
            <Sidebar 
              activeId={activeId} 
              onSelect={setActiveId} 
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />
          </div>

          {/* Right Content */}
          <main className="flex-1 flex flex-col h-[calc(100vh-89px)] lg:h-screen overflow-y-auto bg-sage-bg relative">
            
            <div className="p-6 lg:p-12 pb-6 flex justify-between items-start">
              <div>
                <h2 className="font-display text-3xl lg:text-5xl font-light text-sage-darker leading-tight">
                  Use your<br/><span className="font-bold text-charcoal">{activeCalc?.name}</span>
                </h2>
                <p className="text-sage-darker mt-2 font-medium">{activeCalc?.description}</p>
              </div>
              <div className="hidden lg:flex w-12 h-12 items-center justify-center text-charcoal">
                <i className="fa-solid fa-grip text-3xl opacity-50"></i>
              </div>
            </div>

            <div className="flex-1 p-6 lg:p-12 pt-0 flex flex-col items-center justify-start w-full">
              <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    {renderCalculator()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* QOL: Quick Navigation */}
              <div className="w-full max-w-2xl mt-12 flex justify-between items-center border-t border-sage-dark/20 pt-6">
                <button onClick={() => navigateCalc('prev')} className="flex items-center gap-3 text-sage-darker hover:text-charcoal transition-colors font-display font-semibold">
                  <i className="fa-solid fa-arrow-left"></i> Previous
                </button>
                <button onClick={() => navigateCalc('next')} className="flex items-center gap-3 text-sage-darker hover:text-charcoal transition-colors font-display font-semibold">
                  Next <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
