#!/usr/bin/env node
'use strict';

const emoticon = require('./');

console.log('=== emoticon library demo ===\n');
console.log(`Supported emotions: ${emoticon.emotions.join(', ')}\n`);

emoticon.emotions.forEach(emotion => {
  const samples = Array.from({ length: 5 }, () => emoticon(emotion));
  console.log(`  ${emotion.padEnd(14)} ${samples.join('  ')}`);
});

console.log(`\n  ${'random'.padEnd(14)} ${Array.from({ length: 5 }, () => emoticon.random()).join('  ')}`);
