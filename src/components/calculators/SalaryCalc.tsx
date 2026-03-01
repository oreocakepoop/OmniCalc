import { useState } from 'react';

export function SalaryCalc() {
    const [hourly, setHourly] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const h = parseFloat(hourly) || 0;
  const hpw = parseFloat(hoursPerWeek) || 0;

  const daily = h * (hpw / 5);
  const weekly = h * hpw;
  const monthly = weekly * 52 / 12;
  const yearly = weekly * 52;

  const handleUpdate = (val: string, type: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    const v = parseFloat(val) || 0;
    if (type === 'hourly') setHourly(val);
    if (type === 'daily') setHourly(String(v / (hpw / 5)));
    if (type === 'weekly') setHourly(String(v / hpw));
    if (type === 'monthly') setHourly(String(v * 12 / 52 / hpw));
    if (type === 'yearly') setHourly(String(v / 52 / hpw));
  };

  const format = (num: number) => {
    if (num <= 0) return '';
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2, useGrouping: false }).format(num);
  };

  const formatDisplay = (num: number) => {
    if (num <= 0) return '';
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="w-full max-w-6xl mx-auto glass-panel rounded-3xl p-10 sm:p-12">
      <div className="mb-12 p-6 bg-transparent border border-charcoal/20 rounded-2xl flex items-center justify-between max-w-lg mx-auto">
        <span className="text-xl font-medium text-charcoal/70 uppercase tracking-widest">Hours per week</span>
        <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)}
          className={`w-32 bg-white text-charcoal border border-charcoal/20 rounded-lg px-4 py-3 text-2xl text-center focus:outline-none focus-visible:ring-charcoal`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Hourly', val: format(h), displayVal: formatDisplay(h), type: 'hourly' },
          { label: 'Daily', val: format(daily), displayVal: formatDisplay(daily), type: 'daily' },
          { label: 'Weekly', val: format(weekly), displayVal: formatDisplay(weekly), type: 'weekly' },
          { label: 'Monthly', val: format(monthly), displayVal: formatDisplay(monthly), type: 'monthly' },
          { label: 'Yearly', val: format(yearly), displayVal: formatDisplay(yearly), type: 'yearly' },
        ].map((item) => (
          <div key={item.label} className={`relative bg-white border border-charcoal/20 rounded-2xl p-8 transition-all focus-within:border-charcoal ${item.type === 'yearly' ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            <label className="block text-lg font-bold text-charcoal/50 mb-4 uppercase tracking-widest">{item.label}</label>
            <div className="flex items-center">
              <span className={`text-4xl text-mustard opacity-70 mr-4`}>$</span>
              <div className="relative w-full">
                <input type="number" value={item.val} onChange={(e) => handleUpdate(e.target.value, item.type as any)}
                  className="w-full bg-white text-charcoal text-5xl font-mono text-charcoal focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text" placeholder="0.00" />
                <div className="w-full bg-white text-charcoal text-5xl font-mono text-charcoal pointer-events-none">
                  {item.displayVal || '0.00'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
