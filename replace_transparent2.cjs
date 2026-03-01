const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /className="w-32 bg-transparent/g, replace: 'className="w-32 bg-white text-charcoal' },
  { regex: /className={`w-32 bg-transparent/g, replace: 'className={`w-32 bg-white text-charcoal' },
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }
  
  fs.writeFileSync(filePath, content);
}

console.log('Done replacing more bg-transparent on inputs');
