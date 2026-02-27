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
    <div className="w-full max-w-md mx-auto bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
      <div className="mb-8">
        <label className="block text-sm font-medium text-zinc-400 mb-2">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors text-zinc-100 [color-scheme:dark]"
        />
      </div>

      {age ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-950 rounded-2xl p-4 text-center border border-zinc-800/50">
            <div className="text-4xl font-light font-mono text-violet-400 mb-1">{age.years}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Years</div>
          </div>
          <div className="bg-zinc-950 rounded-2xl p-4 text-center border border-zinc-800/50">
            <div className="text-4xl font-light font-mono text-violet-400 mb-1">{age.months}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Months</div>
          </div>
          <div className="bg-zinc-950 rounded-2xl p-4 text-center border border-zinc-800/50">
            <div className="text-4xl font-light font-mono text-violet-400 mb-1">{age.days}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Days</div>
          </div>
        </div>
      ) : (
        <div className="h-28 flex items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-2xl">
          Select your date of birth
        </div>
      )}
    </div>
  );
}
