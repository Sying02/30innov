const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync('dist/data.js','utf8')+';globalThis.dataset=people',context);
assert.equal(context.dataset.length,30);
assert.equal(new Set(context.dataset.map(p=>p.id)).size,30);
assert(context.dataset.every(p=>p.name&&p.problem&&p.cat>=0&&p.cat<3));
console.log('PASS: 30 unique profiles, required fields and category references.');
