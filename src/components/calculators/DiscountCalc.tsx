import { useState } from 'react';

export function DiscountCalc() {
    const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');

  const originalPrice = parseFloat(price) || 0;
  const discountPct = parseFloat(discount) || 0;
  const taxPct = parseFloat(tax) || 0;

  const discountAmount = originalPrice * (discountPct / 100);
  const priceAfterDiscount = originalPrice - discountAmount;
  const taxAmount = priceAfterDiscount * (taxPct / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass-panel  p-10 sm:p-12 space-y-8">
        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Original Price</label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">$</span>
            <div className="relative w-full">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20  pl-12 pr-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal`}
                placeholder="0.00"
              />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20  pl-12 pr-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {price ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(parseFloat(price)) : '0.00'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Discount (%)</label>
          <div className="relative">
            <div className="relative w-full">
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal`}
                placeholder="20"
              />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {discount ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(parseFloat(discount)) : '20'}
              </div>
            </div>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xl font-medium text-charcoal/70 mb-4 uppercase tracking-widest">Tax (%) <span className="text-charcoal/50 font-normal">(optional)</span></label>
          <div className="relative">
            <div className="relative w-full">
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl focus:outline-none absolute inset-0 opacity-0 z-10 cursor-text focus-visible:ring-charcoal`}
                placeholder="8.5"
              />
              <div className={`w-full bg-white text-charcoal border border-charcoal/20  px-6 py-5 text-2xl pointer-events-none focus-visible:ring-charcoal`}>
                {tax ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(parseFloat(tax)) : '8.5'}
              </div>
            </div>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/50 text-2xl">%</span>
          </div>
        </div>
      </div>

      <div className="glass-panel  p-10 sm:p-12 flex flex-col justify-center space-y-8">
        <div className="bg-transparent  p-10 border border-charcoal/20 space-y-6">
          <div className="flex justify-between text-xl">
            <span className="text-charcoal/70">Original Price</span>
            <span className={`font-mono text-mustard`}>{formatCurrency(originalPrice)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="text-emerald-400">Savings</span>
            <span className="font-mono text-emerald-400">-{formatCurrency(discountAmount)}</span>
          </div>
          {taxPct > 0 && (
            <div className="flex justify-between text-xl">
              <span className="text-charcoal/70">Tax</span>
              <span className={`font-mono text-mustard`}>+{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="pt-8 border-t border-charcoal/20 flex flex-col items-center text-center gap-4">
            <span className="font-medium text-charcoal/50 text-xl uppercase tracking-widest">Final Price</span>
            <span className={`text-7xl font-light font-mono text-mustard`}>{formatCurrency(finalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
