// Extracts the inline <script> from index.html and syntax-checks it.
const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('no script block found'); process.exit(2); }
try {
  new vm.Script(m[1], { filename: 'index.inline.js' });
  console.log('SYNTAX OK (' + m[1].length + ' chars)');
} catch (e) {
  console.error('SYNTAX ERROR: ' + e.message);
  process.exit(1);
}
