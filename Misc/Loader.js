const { readdirSync, statSync, writeFileSync } = require('fs');
const { join, relative } = require('path');

const jsDir = join(__dirname, '.'); // Parent directory
const htmlOutputFile = join(__dirname, 'index.html');

// Function to recursively read directories
function readDirRecursive(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      readDirRecursive(filePath, fileList);
    } else {
      if (file.endsWith('.js')) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Generate HTML script tags
function generateScriptTags(jsFiles) {
  return jsFiles.map(file => `<script src="${relative(__dirname, file)}"></script>`).join('\n');
}

// Basic HTML template
function generateHtmlTemplate(scriptTags) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
</head>
<body>
    <div id="game-container"></div>
    ${scriptTags}
</body>
</html>`;
}

// Generate the HTML file content
const jsFiles = readDirRecursive(jsDir);
const scriptTags = generateScriptTags(jsFiles);
const htmlTemplate = generateHtmlTemplate(scriptTags);

// Write the generated HTML to the output file
writeFileSync(htmlOutputFile, htmlTemplate);

console.log(`HTML file generated at ${htmlOutputFile}`);
