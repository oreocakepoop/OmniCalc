const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /bg-zinc-950\/50/g, replace: 'bg-transparent' },
  { regex: /bg-zinc-950\/30/g, replace: 'bg-transparent' },
  { regex: /bg-zinc-950\/80/g, replace: 'bg-transparent' },
  { regex: /bg-zinc-900\/50/g, replace: 'bg-transparent' },
  { regex: /bg-zinc-900/g, replace: 'bg-transparent' },
  { regex: /bg-zinc-800\/50/g, replace: 'border-charcoal/20' },
  { regex: /bg-zinc-800/g, replace: 'bg-yellow-400' },
  { regex: /border-zinc-800\/50/g, replace: 'border-charcoal/20' },
  { regex: /border-zinc-800/g, replace: 'border-charcoal/20' },
  { regex: /border-zinc-700/g, replace: 'border-charcoal/20' },
  { regex: /border-zinc-600/g, replace: 'border-charcoal' },
  { regex: /text-zinc-100/g, replace: 'text-charcoal' },
  { regex: /text-zinc-200/g, replace: 'text-charcoal' },
  { regex: /text-zinc-300/g, replace: 'text-charcoal' },
  { regex: /text-zinc-400/g, replace: 'text-charcoal/70' },
  { regex: /text-zinc-500/g, replace: 'text-charcoal/50' },
  { regex: /text-zinc-600/g, replace: 'text-charcoal/50' },
  { regex: /text-zinc-700/g, replace: 'text-charcoal/50' },
  { regex: /hover:text-zinc-200/g, replace: 'hover:text-charcoal' },
  { regex: /hover:bg-zinc-800/g, replace: 'hover:bg-yellow-400' },
  { regex: /hover:bg-zinc-900\/50/g, replace: 'hover:bg-yellow-400' },
  { regex: /bg-zinc-700/g, replace: 'bg-charcoal/20' },
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }
  
  fs.writeFileSync(filePath, content);
}

console.log('Done replacing zinc colors');
