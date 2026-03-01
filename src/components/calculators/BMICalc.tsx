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
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-charcoal/50' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-charcoal' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-mustard' };
    return { label: 'Obese', color: 'text-yellow-400' };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel rounded-3xl p-10 sm:p-12 space-y-8">
        <div className="flex bg-transparent rounded-xl p-2 mb-10 border border-charcoal/20">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${unit === 'metric' ? 'bg-charcoal' + ' text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'}`}
          >
            Metric (cm/kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-4 text-xl font-medium rounded-lg transition-colors ${unit === 'imperial' ? 'bg-charcoal' + ' text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'}`}
          >
            Imperial (in/lbs)
          </button>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">
            Height ({unit === 'metric' ? 'cm' : 'inches'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`}
            placeholder={unit === 'metric' ? '175' : '70'}
          />
        </div>
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">
            Weight ({unit === 'metric' ? 'kg' : 'lbs'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none focus-visible:ring-charcoal`}
            placeholder={unit === 'metric' ? '70' : '150'}
          />
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-10 sm:p-12 flex flex-col justify-center items-center text-center space-y-10">
        <div className="text-charcoal/70 text-xl font-medium mb-4 uppercase tracking-widest">Your BMI</div>
        <div className={`text-9xl font-light font-mono text-mustard`}>
          {bmi ? bmi.toFixed(1) : '--'}
        </div>
        {category && (
          <div className={`text-4xl font-medium ${category.color}`}>
            {category.label}
          </div>
        )}
      </div>
    </div>
  );
}
