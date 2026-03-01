import { useState } from 'react';

export function TimeMathCalc() {
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
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel  p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Base Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-4xl font-mono text-center focus:outline-none focus-visible:ring-charcoal text-charcoal [color-scheme:dark]`} />
        </div>

        <div className="flex bg-transparent  p-2 border border-charcoal/20">
          <button onClick={() => setOperation('add')}
            className={`flex-1 py-4 text-xl font-medium  transition-colors border border-transparent hover:border-charcoal ${operation === 'add' ? 'bg-charcoal' + ' text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'}`}>
            Add
          </button>
          <button onClick={() => setOperation('sub')}
            className={`flex-1 py-4 text-xl font-medium  transition-colors border border-transparent hover:border-charcoal ${operation === 'sub' ? 'bg-charcoal' + ' text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'}`}>
            Subtract
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-charcoal/50 mb-4 uppercase tracking-wider text-center">Hours</label>
            <input type="number" value={addHours} onChange={(e) => setAddHours(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`} placeholder="0" />
          </div>
          <div>
            <label className="block text-lg font-medium text-charcoal/50 mb-4 uppercase tracking-wider text-center">Minutes</label>
            <input type="number" value={addMins} onChange={(e) => setAddMins(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-3xl text-center focus:outline-none focus-visible:ring-charcoal`} placeholder="0" />
          </div>
        </div>
      </div>

      <div className="bg-charcoal  p-10 sm:p-12 flex flex-col justify-center text-center space-y-8 border-4 border-charcoal shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
        <div className="text-xl font-medium mb-4 text-white/50 uppercase tracking-widest">Resulting Time</div>
        <div className={`text-8xl sm:text-9xl font-light font-mono text-mustard`}>{result || '--:--'}</div>
      </div>
    </div>
  );
}
