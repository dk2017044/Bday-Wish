const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
const audioPath = path.join(__dirname, 'audio.js');
const outputPath = path.join(__dirname, 'embedded-assets.js');

const cssContent = fs.readFileSync(cssPath, 'utf8');
const audioContent = fs.readFileSync(audioPath, 'utf8');

const output = `// Auto-generated embedded assets for 100% offline standalone surprise export
// This ensures downloaded HTML files have zero external dependencies and render with 100% full aesthetics everywhere!

window.__STANDALONE_CSS__ = ${JSON.stringify(cssContent)};
window.__STANDALONE_AUDIO__ = ${JSON.stringify(audioContent)};
`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log('Successfully generated embedded-assets.js! Size:', fs.statSync(outputPath).size);
