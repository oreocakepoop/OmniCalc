const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(/var\(--color-sage-darker\)/g, 'var(--color-charcoal)');
cssContent = cssContent.replace(/var\(--color-sage-light\)/g, 'var(--color-white)');
cssContent = cssContent.replace(/var\(--color-sage-dark\)/g, 'var(--color-mustard)');
cssContent = cssContent.replace(/var\(--color-sage-bg\)/g, 'var(--color-white)');
cssContent = cssContent.replace(/var\(--color-sage-mid\)/g, 'var(--color-yellow)');
cssContent = cssContent.replace(/var\(--color-offwhite\)/g, 'var(--color-white)');

fs.writeFileSync(cssPath, cssContent);

console.log('Done replacing sage colors in css');
