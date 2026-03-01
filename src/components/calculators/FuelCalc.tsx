import { useState } from 'react';

export function FuelCalc() {
    const [distance, setDistance] = useState('100');
  const [efficiency, setEfficiency] = useState('25'); // MPG or km/L
  const [price, setPrice] = useState('3.50');
  const [unit, setUnit] = useState<'us' | 'metric'>('us'); // us: miles/gallons, metric: km/liters

  const dist = parseFloat(distance) || 0;
  const eff = parseFloat(efficiency) || 0;
  const pr = parseFloat(price) || 0;

  let fuelNeeded = 0;
  if (eff > 0) {
    if (unit === 'us') {
      fuelNeeded = dist / eff; // miles / mpg = gallons
    } else {
      // metric: typically L/100km, but let's use km/L for simplicity to match MPG logic
      // Actually, L/100km is standard in metric. Let's support L/100km.
      fuelNeeded = (dist / 100) * eff; 
    }
  }

  const totalCost = fuelNeeded * pr;

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div className="flex bg-transparent rounded-xl p-2 border border-charcoal/20">
          <button onClick={() => setUnit('us')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${unit === 'us' ? 'bg-charcoal' + ' text-white' : 'text-charcoal/70 hover:text-charcoal'}`}>
            US (MPG)
          </button>
          <button onClick={() => setUnit('metric')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${unit === 'metric' ? 'bg-charcoal' + ' text-white' : 'text-charcoal/70 hover:text-charcoal'}`}>
            Metric (L/100km)
          </button>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Distance ({unit === 'us' ? 'Miles' : 'Kilometers'})</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Fuel Efficiency ({unit === 'us' ? 'MPG' : 'L/100km'})</label>
          <input type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4">Fuel Price (per {unit === 'us' ? 'Gallon' : 'Liter'})</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl pl-12 pr-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`} />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 flex flex-col justify-center space-y-12">
        <div className="text-center">
          <div className="text-charcoal/70 text-xl font-medium mb-4 uppercase tracking-widest">Total Fuel Cost</div>
          <div className={`text-8xl font-light font-mono text-mustard`}>
            ${totalCost.toFixed(2)}
          </div>
        </div>

        <div className="p-8 bg-transparent rounded-2xl border border-charcoal/20 flex justify-between items-center">
          <span className="text-charcoal/70 text-xl font-medium">Fuel Required</span>
          <span className="text-4xl font-mono text-charcoal">
            {fuelNeeded.toFixed(2)} <span className="text-xl text-charcoal/50">{unit === 'us' ? 'gal' : 'L'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
