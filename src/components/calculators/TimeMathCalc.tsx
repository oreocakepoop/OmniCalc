import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

export function TimeMathCalc() {
  const { themeClasses } = useTheme();
  const [time, setTime] = useState('12:00');
  const [addHours, setAddHours] = useState('0');
  const [addMins, setAddMins] = useState('45');
  const [operation, setOperation] = useState<'add' | 'sub'>('add');

  const calculateTime = () => {
    if (!time) return null;
    const [h, m] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);

    const msToAdd = ((parseFloat(addHours) || 0) * 60 * 60 * 1000) + ((parseFloat(addMins) || 0) * 60 * 1000);
    
    if (operation === 'add') {
      date.setTime(date.getTime() + msToAdd);
    } else {
      date.setTime(date.getTime() - msToAdd);
    }

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const result = calculateTime();

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel rounded-3xl p-10 sm:p-12">
      <div className="space-y-8">
        <div>
          <label className="block text-xl font-medium text-zinc-400 mb-4">Base Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-6 py-5 text-4xl font-mono text-center focus:outline-none ${themeClasses.ring} text-zinc-100 [color-scheme:dark]`} />
        </div>

        <div className="flex bg-zinc-950/50 rounded-xl p-2 border border-zinc-800">
          <button onClick={() => setOperation('add')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${operation === 'add' ? themeClasses.bg + ' text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
            Add
          </button>
          <button onClick={() => setOperation('sub')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${operation === 'sub' ? themeClasses.bg + ' text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
            Subtract
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-zinc-500 mb-4 uppercase tracking-wider text-center">Hours</label>
            <input type="number" value={addHours} onChange={(e) => setAddHours(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-6 py-5 text-3xl text-center focus:outline-none ${themeClasses.ring}`} placeholder="0" />
          </div>
          <div>
            <label className="block text-lg font-medium text-zinc-500 mb-4 uppercase tracking-wider text-center">Minutes</label>
            <input type="number" value={addMins} onChange={(e) => setAddMins(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-6 py-5 text-3xl text-center focus:outline-none ${themeClasses.ring}`} placeholder="0" />
          </div>
        </div>

        <div className={`mt-12 p-10 rounded-2xl border ${themeClasses.border} ${themeClasses.muted} text-center`}>
          <div className="text-xl font-medium mb-4 opacity-80">Resulting Time</div>
          <div className="text-7xl font-light font-mono">{result || '--:--'}</div>
        </div>
      </div>
    </div>
  );
}
