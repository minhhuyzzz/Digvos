const fs = require('fs');

const files = [
  'org/recruitment/campaigns/page.tsx',
  'org/recruitment/candidates/page.tsx',
  'org/teaching/courses/page.tsx',
  'org/assessment/questions/page.tsx'
];

files.forEach(f => {
  const p = 'c:/Digvos/apps/web/src/app/(dashboard)/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/\\\$\{/g, '${');
  fs.writeFileSync(p, c);
  console.log('Fixed ' + f);
});
