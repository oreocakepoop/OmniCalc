const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /className={`w-full bg-transparent/g, replace: 'className={`w-full bg-white text-charcoal' },
  { regex: /className={`flex-1 bg-transparent/g, replace: 'className={`flex-1 bg-white text-charcoal' },
  { regex: /className="w-full bg-transparent/g, replace: 'className="w-full bg-white text-charcoal' },
  { regex: /className="w-32 bg-transparent/g, replace: 'className="w-32 bg-white text-charcoal' },
  { regex: /className="w-32 sm:w-48 bg-transparent/g, replace: 'className="w-32 sm:w-48 bg-white text-charcoal' },
  { regex: /className={`w-32 sm:w-48 bg-transparent/g, replace: 'className={`w-32 sm:w-48 bg-white text-charcoal' },
  { regex: /className={`w-full sm:w-32 bg-transparent/g, replace: 'className={`w-full sm:w-32 bg-white text-charcoal' },
  { regex: /className={`w-full sm:w-48 bg-transparent/g, replace: 'className={`w-full sm:w-48 bg-white text-charcoal' },
  { regex: /className={`w-full sm:w-64 bg-transparent/g, replace: 'className={`w-full sm:w-64 bg-white text-charcoal' },
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }
  
  fs.writeFileSync(filePath, content);
}

console.log('Done replacing bg-transparent on inputs');
