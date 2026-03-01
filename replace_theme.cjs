const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /import \{ useTheme \} from '\.\.\/\.\.\/ThemeContext';\n/g, replace: '' },
  { regex: /const \{ themeClasses \} = useTheme\(\);\n/g, replace: '' },
  { regex: /\$\{themeClasses\.bg\}/g, replace: 'bg-charcoal' },
  { regex: /\$\{themeClasses\.text\}/g, replace: 'text-mustard' },
  { regex: /\$\{themeClasses\.border\}/g, replace: 'border-charcoal' },
  { regex: /\$\{themeClasses\.hover\}/g, replace: 'hover:bg-mustard hover:text-charcoal' },
  { regex: /\$\{themeClasses\.ring\}/g, replace: 'focus-visible:ring-charcoal' },
  { regex: /\$\{themeClasses\.muted\}/g, replace: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
  // Some might be used like `themeClasses.ring` without template literals
  { regex: /themeClasses\.ring/g, replace: "'focus-visible:ring-charcoal'" },
  { regex: /themeClasses\.text/g, replace: "'text-mustard'" },
  { regex: /themeClasses\.bg/g, replace: "'bg-charcoal'" },
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const { regex, replace } of replacements) {
    content = content.replace(regex, replace);
  }
  
  fs.writeFileSync(filePath, content);
}

// Also update App.tsx
const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/import \{ ThemeProvider \} from '\.\/ThemeContext';\n/, '');
appContent = appContent.replace(/<ThemeProvider>\s*(<AppContent \/>)\s*<\/ThemeProvider>/, '$1');
fs.writeFileSync(appPath, appContent);

console.log('Done replacing themeClasses');
