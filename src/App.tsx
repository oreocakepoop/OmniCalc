import { useState, useEffect } from 'react';
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

function AppContent() {
  const [activeId, setActiveId] = useState<CalculatorId>('standard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCalc = calculators.find(c => c.id === activeId);

  useEffect(() => {
    document.title = `${activeCalc?.name || 'OmniCalc'} | Free Online Calculators`;
  }, [activeCalc]);

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
    <div className="min-h-screen bg-[#e0e5ec] text-slate-700 font-sans selection:bg-blue-200 pb-8">
      {/* Top Navbar */}
      <nav className="neu-flat mx-4 mt-4 px-6 py-4 flex items-center justify-between z-30 relative">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden w-10 h-10 neu-flat rounded-xl flex items-center justify-center text-slate-500 active:neu-pressed"
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 neu-pressed rounded-xl flex items-center justify-center text-blue-500 text-xl">
              <i className="fa-solid fa-calculator"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-700">OmniCalc</span>
          </div>
        </div>
        <div className="hidden md:flex gap-6 font-semibold text-slate-500">
          <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Categories</a>
          <a href="#" className="hover:text-blue-500 transition-colors">About</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 flex gap-6 relative">
        {/* Left Sidebar */}
        <Sidebar 
          activeId={activeId} 
          onSelect={setActiveId} 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Ad Banner */}
          <div className="w-full h-[90px] ad-container mb-6 hidden md:flex">
            <span className="text-xl"><i className="fa-solid fa-rectangle-ad mr-2"></i> Leaderboard Ad (728x90)</span>
          </div>

          <div className="neu-flat p-6 lg:p-10 mb-6">
            <div className="mb-10 text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-700 mb-3">
                {activeCalc?.name} Calculator
              </h1>
              <p className="text-slate-500 text-lg">
                {activeCalc?.description}
              </p>
            </div>

            <div className="flex justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  {renderCalculator()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* SEO Content Area */}
          <div className="neu-flat p-6 lg:p-10 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-700">About the {activeCalc?.name} Calculator</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              Welcome to our free online {activeCalc?.name.toLowerCase()} calculator. This tool is designed to help you quickly and accurately perform calculations related to {activeCalc?.category.toLowerCase()} and everyday tasks. Whether you're a student, professional, or just need a quick answer, our tool provides instant results.
            </p>
            <h3 className="text-xl font-bold mb-3 text-slate-700">How to use this tool</h3>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-2">
              <li>Enter your values into the input fields above.</li>
              <li>The calculator will automatically process the data.</li>
              <li>Review your results instantly without page reloads.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              Bookmark this page for future use and explore our other free calculators in the sidebar!
            </p>
          </div>
        </main>

        {/* Right Sidebar (Ads & Collabs) */}
        <aside className="hidden xl:flex w-80 flex-col gap-6 shrink-0">
          <div className="w-full h-[250px] ad-container">
            <span><i className="fa-solid fa-rectangle-ad mr-2"></i> Medium Rectangle (300x250)</span>
          </div>
          
          <div className="neu-flat p-6">
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-fire text-orange-500"></i> Popular Tools
            </h3>
            <div className="space-y-3">
              {['Mortgage', 'BMI', 'Percentage', 'Salary'].map(name => (
                <button 
                  key={name}
                  onClick={() => setActiveId(calculators.find(c => c.name === name)?.id as CalculatorId)}
                  className="w-full text-left px-4 py-3 neu-flat text-slate-600 font-semibold hover:text-blue-500 active:neu-pressed transition-all"
                >
                  {name} Calculator
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[600px] ad-container">
            <span><i className="fa-solid fa-rectangle-ad mr-2"></i> Half Page Ad (300x600)</span>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="neu-flat mx-4 mb-4 p-8 text-center text-slate-500">
        <div className="flex justify-center gap-6 mb-4 text-2xl">
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fa-brands fa-facebook"></i></a>
          <a href="#" className="hover:text-blue-500 transition-colors"><i className="fa-brands fa-github"></i></a>
        </div>
        <p className="mb-2 font-semibold">© {new Date().getFullYear()} OmniCalc. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-sm">
          <a href="#" className="hover:text-blue-500">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500">Terms of Service</a>
          <a href="#" className="hover:text-blue-500">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
