const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/calculators');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all rounded classes
  const regex = /\brounded(?:-(?:sm|md|lg|xl|2xl|3xl|full|\[.*?\]))?\b/g;
  
  const newContent = content.replace(regex, '');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(dir);
