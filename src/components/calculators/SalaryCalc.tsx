import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

export function SalaryCalc() {
  const { themeClasses } = useTheme();
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

  const format = (num: number) => num > 0 ? num.toFixed(2) : '';

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8">
      <div className="mb-8 p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl flex items-center justify-between max-w-sm mx-auto">
        <span className="text-sm font-medium text-zinc-400">Hours per week</span>
        <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)}
          className={`w-24 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-center focus:outline-none ${themeClasses.ring}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Hourly', val: format(h), type: 'hourly' },
          { label: 'Daily', val: format(daily), type: 'daily' },
          { label: 'Weekly', val: format(weekly), type: 'weekly' },
          { label: 'Monthly', val: format(monthly), type: 'monthly' },
          { label: 'Yearly', val: format(yearly), type: 'yearly' },
        ].map((item) => (
          <div key={item.label} className={`relative bg-zinc-950/50 border border-zinc-800 rounded-2xl p-5 transition-all focus-within:border-zinc-600 ${item.type === 'yearly' ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">{item.label}</label>
            <div className="flex items-center">
              <span className={`text-xl ${themeClasses.text} opacity-70 mr-2`}>$</span>
              <input type="number" value={item.val} onChange={(e) => handleUpdate(e.target.value, item.type as any)}
                className="w-full bg-transparent text-2xl font-mono text-zinc-100 focus:outline-none" placeholder="0.00" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
