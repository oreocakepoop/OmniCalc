export type CalculatorId = 
  | 'standard' | 'scientific' | 'percentage' | 'bmi' | 'tip'
  | 'discount' | 'mortgage' | 'age' | 'date-diff' | 'unit'
  | 'compound' | 'programmer' | 'data' | 'currency' | 'time-math'
  | 'fuel' | 'salary' | 'cooking' | 'proportion' | 'roi';

export interface CalculatorInfo {
  id: CalculatorId;
  name: string;
  description: string;
  icon: string;
  category: 'Math' | 'Finance' | 'Health' | 'Everyday' | 'Tech';
}
