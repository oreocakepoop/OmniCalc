const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace(/bg-sage-bg/g, 'bg-white');
appContent = appContent.replace(/bg-sage-light/g, 'bg-white');
appContent = appContent.replace(/bg-sage-mid/g, 'bg-yellow-400');
appContent = appContent.replace(/text-sage-darker/g, 'text-charcoal/70');

fs.writeFileSync(appPath, appContent);

const standardCalcPath = path.join(__dirname, 'src/components/calculators/StandardCalc.tsx');
let stdContent = fs.readFileSync(standardCalcPath, 'utf8');
stdContent = stdContent.replace(/bg-sage-mid/g, 'bg-yellow-400');
stdContent = stdContent.replace(/bg-sage-light/g, 'bg-white');
stdContent = stdContent.replace(/bg-sage-darker/g, 'bg-charcoal');
stdContent = stdContent.replace(/bg-sage-dark/g, 'bg-mustard');
stdContent = stdContent.replace(/text-offwhite/g, 'text-white');
fs.writeFileSync(standardCalcPath, stdContent);

console.log('Done replacing sage colors');
