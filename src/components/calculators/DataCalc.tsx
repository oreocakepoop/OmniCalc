import { useState } from 'react';
import { useTheme } from '../../ThemeContext';

const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
const multipliers = [1, 1024, 1024**2, 1024**3, 1024**4, 1024**5];

export function DataCalc() {
  const { themeClasses } = useTheme();
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

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-medium text-zinc-100">Data Conversion</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)}
              className={`flex-1 bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none ${themeClasses.ring}`} />
            <select value={fromUnit} onChange={(e) => setFromUnit(Number(e.target.value))}
              className="w-24 bg-zinc-950/50 border border-zinc-800 rounded-xl px-3 text-zinc-300 focus:outline-none">
              {units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>
          <div className="flex justify-center text-zinc-600">↓</div>
          <div className="flex gap-4">
            <div className={`flex-1 bg-zinc-950/30 border border-zinc-800/50 rounded-xl px-4 py-3 text-lg font-mono ${themeClasses.text} overflow-hidden`}>
              {converted.toPrecision(6).replace(/\.0+$/, '')}
            </div>
            <select value={toUnit} onChange={(e) => setToUnit(Number(e.target.value))}
              className="w-24 bg-zinc-950/50 border border-zinc-800 rounded-xl px-3 text-zinc-300 focus:outline-none">
              {units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-medium text-zinc-100">Transfer Time</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Network Speed (Mbps)</label>
            <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)}
              className={`w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none ${themeClasses.ring}`} />
          </div>
          <div className={`mt-6 p-6 rounded-2xl border ${themeClasses.border} ${themeClasses.muted} text-center`}>
            <div className="text-sm font-medium mb-1 opacity-80">Estimated Time</div>
            <div className="text-3xl font-light font-mono">{formatTime(seconds)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
