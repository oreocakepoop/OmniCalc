import { useState } from 'react';

export function AgeCalc() {
    const [dob, setDob] = useState('');
  
  const calculateAge = () => {
    if (!dob) return null;
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    if (birthDate > today) return null;

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const age = calculateAge();

  return (
    <div className="w-full max-w-6xl mx-auto glass-panel rounded-3xl p-10 sm:p-12 space-y-12">
      <div className="max-w-xl mx-auto">
        <label className="block text-xl font-medium text-charcoal/70 mb-4 text-center uppercase tracking-widest">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={`w-full bg-white text-charcoal border border-charcoal/20 rounded-xl px-6 py-5 text-2xl focus:outline-none text-center focus-visible:ring-charcoal`}
        />
      </div>

      {age ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-charcoal rounded-2xl p-10 text-center border border-charcoal/20">
            <div className={`text-8xl font-light font-mono mb-4 text-mustard`}>{age.years}</div>
            <div className="text-xl text-white/50 uppercase tracking-widest font-medium">Years</div>
          </div>
          <div className="bg-charcoal rounded-2xl p-10 text-center border border-charcoal/20">
            <div className={`text-8xl font-light font-mono mb-4 text-mustard`}>{age.months}</div>
            <div className="text-xl text-white/50 uppercase tracking-widest font-medium">Months</div>
          </div>
          <div className="bg-charcoal rounded-2xl p-10 text-center border border-charcoal/20">
            <div className={`text-8xl font-light font-mono mb-4 text-mustard`}>{age.days}</div>
            <div className="text-xl text-white/50 uppercase tracking-widest font-medium">Days</div>
          </div>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-charcoal/50 text-2xl border-4 border-dashed border-charcoal/20 rounded-3xl uppercase tracking-widest font-bold">
          Select your date of birth
        </div>
      )}
    </div>
  );
}
