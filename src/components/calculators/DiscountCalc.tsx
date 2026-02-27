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

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800">
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Original Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Discount (%)</label>
          <div className="relative">
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Tax (%) <span className="text-zinc-600 font-normal">(optional)</span></label>
          <div className="relative">
            <input
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="8.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">%</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800/50 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Original Price</span>
          <span className="font-mono text-zinc-300">${originalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-emerald-400">Savings</span>
          <span className="font-mono text-emerald-400">-${discountAmount.toFixed(2)}</span>
        </div>
        {taxPct > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tax</span>
            <span className="font-mono text-zinc-300">+${taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
          <span className="font-medium text-zinc-100">Final Price</span>
          <span className="text-3xl font-light font-mono text-violet-400">${finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
