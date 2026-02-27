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
    <div className="w-full max-w-md mx-auto bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors text-zinc-100 [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors text-zinc-100 [color-scheme:dark]"
          />
        </div>
      </div>

      {days !== null ? (
        <div className="bg-violet-600 rounded-2xl p-6 text-center text-white">
          <div className="text-sm text-violet-200 mb-2 font-medium uppercase tracking-wider">Difference</div>
          <div className="text-5xl font-light font-mono mb-2">{days}</div>
          <div className="text-violet-200">Days</div>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-2xl">
          Select both dates to see difference
        </div>
      )}
    </div>
  );
}
