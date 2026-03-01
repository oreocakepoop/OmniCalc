import { useState } from 'react';

type Category = 'length' | 'weight' | 'temperature';

const units = {
  length: ['Meters', 'Kilometers', 'Centimeters', 'Millimeters', 'Miles', 'Yards', 'Feet', 'Inches'],
  weight: ['Kilograms', 'Grams', 'Milligrams', 'Metric Tons', 'Pounds', 'Ounces'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

const conversions = {
  length: {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Millimeters: 0.001,
    Miles: 1609.34,
    Yards: 0.9144,
    Feet: 0.3048,
    Inches: 0.0254
  },
  weight: {
    Kilograms: 1,
    Grams: 0.001,
    Milligrams: 0.000001,
    'Metric Tons': 1000,
    Pounds: 0.453592,
    Ounces: 0.0283495
  }
};

export function UnitConverter() {
    const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState(units.length[0]);
  const [toUnit, setToUnit] = useState(units.length[1]);
  const [value, setValue] = useState('');

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(units[cat][0]);
    setToUnit(units[cat][1]);
    setValue('');
  };

  const convert = () => {
    if (!value) return '';
    const val = parseFloat(value);
    if (isNaN(val)) return '';

    if (category === 'temperature') {
      if (fromUnit === toUnit) return val.toFixed(2);
      let c = 0;
      // Convert to Celsius first
      if (fromUnit === 'Celsius') c = val;
      else if (fromUnit === 'Fahrenheit') c = (val - 32) * 5/9;
      else if (fromUnit === 'Kelvin') c = val - 273.15;

      // Convert from Celsius to target
      if (toUnit === 'Celsius') return c.toFixed(2);
      if (toUnit === 'Fahrenheit') return ((c * 9/5) + 32).toFixed(2);
      if (toUnit === 'Kelvin') return (c + 273.15).toFixed(2);
    } else {
      // @ts-ignore
      const fromFactor = conversions[category][fromUnit];
      // @ts-ignore
      const toFactor = conversions[category][toUnit];
      
      const result = (val * fromFactor) / toFactor;
      // Format nicely, avoid scientific notation for reasonable numbers
      return parseFloat(result.toPrecision(8)).toString();
    }
    return '';
  };

  const result = convert();

  const formatNumber = (numStr: string) => {
    if (!numStr) return '';
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div className="flex flex-wrap gap-4 mb-8">
          {(Object.keys(units) as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 min-w-[140px] py-4 px-6 text-xl font-medium rounded-lg capitalize transition-colors ${category === cat ? 'bg-charcoal' + ' text-white shadow-sm' : 'bg-transparent text-charcoal/70 hover:text-charcoal border border-charcoal/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">From</label>
          <div className="relative">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none appearance-none focus-visible:ring-charcoal`}
            >
              {units[category].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-charcoal/50">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Value</label>
          <div className="relative w-full">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl font-mono focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal`}
              placeholder="0"
            />
            <div className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl font-mono pointer-events-none focus-visible:ring-charcoal`}>
              {value ? formatNumber(value) : '0'}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 flex flex-col justify-center space-y-10">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">To</label>
          <div className="relative">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none appearance-none focus-visible:ring-charcoal`}
            >
              {units[category].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-charcoal/50">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="text-charcoal/70 text-xl font-medium mb-4 uppercase tracking-widest">Converted Result</div>
          <div className={`text-6xl font-light font-mono text-mustard break-words`}>
            {result ? formatNumber(result) : '0'}
          </div>
        </div>
      </div>
    </div>
  );
}
