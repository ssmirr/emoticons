#!/usr/bin/env node
'use strict';

const emoticon = require('./');

const emotion = process.argv[2];

if (!emotion || emotion === '--help' || emotion === '-h') {
  console.log('Usage: emoticon <emotion>');
  console.log('       emoticon --random');
  console.log('');
  console.log('Available emotions:');
  console.log('  ' + emoticon.emotions.join(', '));
  process.exit(0);
}

if (emotion === '--random' || emotion === '-r') {
  console.log(emoticon.random());
  process.exit(0);
}

try {
  console.log(emoticon(emotion));
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
