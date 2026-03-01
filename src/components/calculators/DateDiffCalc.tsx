import { useState } from 'react';

export function DateDiffCalc() {
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateDiff = () => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const days = calculateDiff();

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`}
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`}
          />
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 flex flex-col justify-center text-center space-y-8">
        {days !== null ? (
          <>
            <div className="text-xl text-charcoal/70 mb-4 font-medium uppercase tracking-widest">Difference</div>
            <div className={`text-9xl font-light font-mono mb-4 text-mustard`}>{days}</div>
            <div className="text-3xl text-charcoal/50 uppercase tracking-widest">Days</div>
          </>
        ) : (
          <div className="h-full min-h-[200px] flex items-center justify-center text-charcoal/50 text-2xl border-4 border-dashed border-charcoal/20 rounded-3xl uppercase tracking-widest font-bold">
            Select both dates
          </div>
        )}
      </div>
    </div>
  );
}
