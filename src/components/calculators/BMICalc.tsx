import { useState } from 'react';

export function BMICalc() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) return null;
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h <= 0 || w <= 0) return null;

    if (unit === 'metric') {
      // height in cm, weight in kg
      return w / Math.pow(h / 100, 2);
    } else {
      // height in inches, weight in lbs
      return (w / Math.pow(h, 2)) * 703;
    }
  };

  const bmi = calculateBMI();

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-emerald-400' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400' };
    return { label: 'Obese', color: 'text-red-400' };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
      <div className="flex bg-zinc-950 rounded-xl p-1 mb-8 border border-zinc-800">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${unit === 'metric' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          Metric (cm/kg)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${unit === 'imperial' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          Imperial (in/lbs)
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
            placeholder={unit === 'metric' ? '175' : '70'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
            placeholder={unit === 'metric' ? '70' : '150'}
          />
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
        <div className="text-sm font-medium text-zinc-500 mb-2">Your BMI</div>
        <div className="text-6xl font-light font-mono mb-4">
          {bmi ? bmi.toFixed(1) : '--'}
        </div>
        {category && (
          <div className={`text-lg font-medium ${category.color}`}>
            {category.label}
          </div>
        )}
      </div>
    </div>
  );
}
