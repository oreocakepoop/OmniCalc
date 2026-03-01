import { useState } from 'react';

const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
const multipliers = [1, 1024, 1024**2, 1024**3, 1024**4, 1024**5];

export function DataCalc() {
    const [size, setSize] = useState('1');
  const [fromUnit, setFromUnit] = useState(2); // MB
  const [toUnit, setToUnit] = useState(3); // GB
  
  const [speed, setSpeed] = useState('100'); // Mbps

  const bytes = (parseFloat(size) || 0) * multipliers[fromUnit];
  const converted = bytes / multipliers[toUnit];

  // Transfer time: size in bits / speed in bits per second
  const bits = bytes * 8;
  const speedBps = (parseFloat(speed) || 0) * 1000000; // Mbps to bps
  const seconds = speedBps > 0 ? bits / speedBps : 0;

  const formatTime = (sec: number) => {
    if (sec === 0) return '0s';
    if (sec < 60) return `${sec.toFixed(1)}s`;
    if (sec < 3600) return `${Math.floor(sec/60)}m ${Math.floor(sec%60)}s`;
    return `${Math.floor(sec/3600)}h ${Math.floor((sec%3600)/60)}m`;
  };

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (num < 0.000001 || num > 1000000000) return num.toExponential(4);
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(num);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <h3 className="text-2xl font-medium text-charcoal">Data Conversion</h3>
        <div className="space-y-6">
          <div className="flex gap-6">
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)}
              className={`flex-1 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
            <select value={fromUnit} onChange={(e) => setFromUnit(Number(e.target.value))}
              className="w-32 bg-white text-charcoal border border-charcoal/20 rounded-xl px-4 text-xl text-charcoal focus:outline-none">
              {units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>
          <div className="flex justify-center text-charcoal/50 text-2xl">↓</div>
          <div className="flex gap-6">
            <div className={`flex-1 bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl font-mono text-mustard overflow-hidden`}>
              {formatNumber(converted)}
            </div>
            <select value={toUnit} onChange={(e) => setToUnit(Number(e.target.value))}
              className="w-32 bg-white text-charcoal border border-charcoal/20 rounded-xl px-4 text-xl text-charcoal focus:outline-none">
              {units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <h3 className="text-2xl font-medium text-charcoal">Transfer Time</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-xl font-medium text-charcoal/70 mb-4">Network Speed (Mbps)</label>
            <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
          </div>
          <div className={`mt-8 p-10 rounded-2xl border border-charcoal bg-charcoal text-mustard border-2 border-charcoal/20 text-center`}>
            <div className="text-xl font-medium mb-4 opacity-80">Estimated Time</div>
            <div className="text-5xl font-light font-mono">{formatTime(seconds)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
