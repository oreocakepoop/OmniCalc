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

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
      <div className="flex gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800 mb-8 overflow-x-auto">
        {(Object.keys(units) as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`flex-1 min-w-[100px] py-2 px-4 text-sm font-medium rounded-lg capitalize transition-colors ${category === cat ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-violet-500 appearance-none"
            >
              {units[category].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-2xl font-mono focus:outline-none focus:border-violet-500 transition-colors"
            placeholder="0"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-violet-500 appearance-none"
            >
              {units[category].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="w-full bg-zinc-950/50 border border-zinc-800/50 rounded-xl px-4 py-4 text-2xl font-mono text-violet-400 min-h-[66px] flex items-center overflow-hidden">
            {result || '0'}
          </div>
        </div>
      </div>
    </div>
  );
}
