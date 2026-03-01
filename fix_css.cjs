const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Fix input background and text colors
cssContent = cssContent.replace(
  /input\[type="number"\], input\[type="text"\], input\[type="date"\], input\[type="time"\], select \{[\s\S]*?\}/,
  `input[type="number"]:not(.bg-transparent), input[type="text"]:not(.bg-transparent), input[type="date"]:not(.bg-transparent), input[type="time"]:not(.bg-transparent), select:not(.bg-transparent) {
  background-color: var(--color-mustard) !important;
  color: var(--color-charcoal) !important;
  border: 2px solid transparent !important;
  border-radius: 0 !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
  box-shadow: inset 0 4px 6px rgba(0,0,0,0.15) !important;
  transition: all 0.2s ease !important;
}
input[type="number"].bg-transparent, input[type="text"].bg-transparent, input[type="date"].bg-transparent, input[type="time"].bg-transparent, select.bg-transparent {
  color: var(--color-charcoal) !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
}`
);

// 2. Fix input placeholder color
cssContent = cssContent.replace(
  /input::placeholder \{[\s\S]*?\}/,
  `input::placeholder {
  color: rgba(42, 47, 37, 0.4) !important;
}`
);

// 3. Fix label and text-zinc colors
cssContent = cssContent.replace(
  /label, \.text-zinc-400, \.text-zinc-500 \{[\s\S]*?\}/,
  `.text-zinc-400, .text-zinc-500 {
  color: var(--color-charcoal) !important;
  font-family: var(--font-display) !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
  font-size: 0.7rem !important;
  opacity: 0.8 !important;
}`
);

// 4. Fix .text-white
cssContent = cssContent.replace(
  /\.text-white, \.text-zinc-100, \.text-zinc-200, \.text-zinc-300 \{[\s\S]*?\}/,
  `.text-zinc-100, .text-zinc-200, .text-zinc-300 {
  color: var(--color-charcoal) !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
}
.text-white {
  color: var(--color-white) !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
}`
);

// 5. Fix big result text blocks to have mustard text
cssContent = cssContent.replace(
  /max-width: 100% !important;\n\}/,
  `max-width: 100% !important;\n  color: var(--color-mustard) !important;\n}`
);

fs.writeFileSync(cssPath, cssContent);
console.log('Fixed index.css');
