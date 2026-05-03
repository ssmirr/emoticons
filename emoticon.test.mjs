import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import emoticon from './index.js';
import emotions from './emotions.js';

const cheekyEmotions = Object.entries(emotions)
  .filter(([, v]) => v.cheeks)
  .map(([k]) => k);
const cheekChars = new Set();
for (const name of cheekyEmotions) {
  for (const c of emotions[name].cheeks) cheekChars.add(c);
}

describe('emoticon() — basic API', () => {
  it('returns a non-empty string for every emotion', () => {
    for (const emotion of emoticon.emotions) {
      const result = emoticon(emotion);
      assert.strictEqual(typeof result, 'string');
      assert.ok(result.length > 0);
    }
  });

  it('throws for unknown emotion', () => {
    assert.throws(() => emoticon('nonexistent'), /Unknown emotion/);
  });

  it('throws TypeError for non-string input', () => {
    assert.throws(() => emoticon(123), TypeError);
    assert.throws(() => emoticon(null), TypeError);
    assert.throws(() => emoticon(undefined), TypeError);
  });

  it('is case-insensitive', () => {
    assert.ok(emoticon('HAPPY').length > 0);
    assert.ok(emoticon('HaPpY').length > 0);
  });

  it('trims whitespace', () => {
    assert.ok(emoticon('  happy  ').length > 0);
    assert.ok(emoticon('\thappy\n').length > 0);
  });
});

describe('emoticon() — intensity', () => {
  it('accepts intensity 0 and 1 without crashing', () => {
    for (const e of emoticon.emotions) {
      assert.strictEqual(typeof emoticon(e, 0), 'string');
      assert.strictEqual(typeof emoticon(e, 1), 'string');
    }
  });

  it('defaults to 0.5 when omitted', () => {
    assert.ok(emoticon('happy').length > 0);
    assert.ok(emoticon('happy', 0.5).length > 0);
  });

  it('clamps out-of-range intensity to [0,1]', () => {
    assert.strictEqual(typeof emoticon('happy', -5), 'string');
    assert.strictEqual(typeof emoticon('happy', 99), 'string');
  });

  it('coerces string intensity to number', () => {
    assert.strictEqual(typeof emoticon('happy', '0.3'), 'string');
    assert.strictEqual(typeof emoticon('happy', '1'), 'string');
  });
});

describe('emoticon.random()', () => {
  it('returns a non-empty string', () => {
    const result = emoticon.random();
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('produces variety across 100 calls', () => {
    const seen = new Set(Array.from({ length: 500 }, () => emoticon.random()));
    assert.ok(seen.size > 1);
  });
});

describe('emoticon.emotions', () => {
  it('is a non-empty array of strings', () => {
    assert.ok(Array.isArray(emoticon.emotions));
    assert.ok(emoticon.emotions.length > 0);
    for (const e of emoticon.emotions) {
      assert.strictEqual(typeof e, 'string');
    }
  });

  it('includes expected emotions', () => {
    assert.ok(emoticon.emotions.includes('happy'));
    assert.ok(emoticon.emotions.includes('sad'));
    assert.ok(emoticon.emotions.includes('shrug'));
    assert.ok(emoticon.emotions.includes('angry'));
  });
});

describe('structural integrity', () => {
  it('shrug returns only pre-composed variants', () => {
    for (let i = 0; i < 50; i++) {
      const result = emoticon('shrug');
      assert.match(result, /¯\\_/);
      assert.match(result, /_\/¯/);
    }
  });

  it('non-precomposed emotions always contain body wrappers', () => {
    const noShrug = emoticon.emotions.filter(e => e !== 'shrug');
    for (const emotion of noShrug) {
      for (let i = 0; i < 20; i++) {
        const result = emoticon(emotion);
        assert.ok(/[\(\[༼ʕ]/.test(result) && /[\)\]༽ʔ]/.test(result));
      }
    }
  });

  it('cheek-enabled emotions sometimes produce cheeks', () => {
    let seen = false;
    for (let i = 0; i < 200; i++) {
      for (const e of cheekyEmotions) {
        const r = emoticon(e);
        for (const c of cheekChars) {
          if (r.includes(c)) seen = true;
        }
      }
    }
    assert.ok(seen);
  });
});

describe('determinism under mock', () => {
  it('produces same output when Math.random is mocked', (ctx) => {
    ctx.mock.method(Math, 'random', () => 0.42);
    assert.strictEqual(emoticon('happy'), emoticon('happy'));
  });

  it('intensity 0 still produces a valid emoticon', (ctx) => {
    ctx.mock.method(Math, 'random', () => 0.999);
    assert.ok(emoticon('happy', 0).length > 0);
  });

  it('intensity 1 still produces a valid emoticon', (ctx) => {
    ctx.mock.method(Math, 'random', () => 0.001);
    assert.ok(emoticon('angry', 1).length > 0);
  });
});

describe('emotion count metrics', () => {
  it('matches the number of keys in emotions.js', () => {
    assert.strictEqual(emoticon.emotions.length, Object.keys(emotions).length);
  });
});

describe('ESM import (index.mjs)', () => {
  it('default export works the same as CJS', async () => {
    const mod = await import('./index.mjs');
    assert.strictEqual(typeof mod.default, 'function');
    assert.strictEqual(typeof mod.default('happy'), 'string');
    assert.ok(mod.default('happy').length > 0);
  });

  it('exports named random and emotions', async () => {
    const mod = await import('./index.mjs');
    assert.strictEqual(typeof mod.random, 'function');
    assert.ok(mod.random());
    assert.ok(Array.isArray(mod.emotions));
    assert.deepStrictEqual(mod.emotions, emoticon.emotions);
  });

  it('CJS and ESM return consistent results', async (ctx) => {
    const mod = await import('./index.mjs');
    ctx.mock.method(Math, 'random', () => 0.5);
    assert.strictEqual(mod.default('happy'), emoticon('happy'));
  });
});

describe('CLI (cli.js)', () => {
  it('--help prints usage and exits 0', () => {
    const stdout = execSync('node cli.js --help', { encoding: 'utf-8' });
    assert.match(stdout, /Usage:/);
    assert.match(stdout, /Available emotions:/);
  });

  it('--random prints a valid emoticon', () => {
    const stdout = execSync('node cli.js --random', { encoding: 'utf-8' });
    assert.ok(stdout.trim().length > 0);
  });

  it('happy prints a non-empty emoticon', () => {
    const stdout = execSync('node cli.js happy', { encoding: 'utf-8' });
    assert.ok(stdout.trim().length > 0);
  });

  it('unknown emotion exits 1 with error message', () => {
    let thrown;
    try {
      execSync('node cli.js foobar', { encoding: 'utf-8' });
    } catch (e) {
      thrown = e;
    }
    assert.ok(thrown, 'should have exited 1');
    assert.strictEqual(thrown.status, 1);
    assert.ok(thrown.stderr.includes('Unknown emotion'));
  });
});

describe('edge cases — empty/missing config', () => {
  it('pre-composed emotions (shrug) always return valid strings', () => {
    const result = emoticon('shrug');
    assert.strictEqual(typeof result, 'string');
    assert.ok(result.length > 0);
  });

  it('generates many unique emoticons per emotion', () => {
    for (const e of emoticon.emotions) {
      const seen = new Set(Array.from({ length: 500 }, () => emoticon(e)));
      assert.ok(seen.size > 5);
    }
  });
});

describe('edge cases — biasedPick via intensity', () => {
  it('intensity 0 produces fewer unique combos than 0.5', () => {
    const mild = new Set(Array.from({ length: 2000 }, () => emoticon('happy', 0)));
    const unif = new Set(Array.from({ length: 2000 }, () => emoticon('happy', 0.5)));
    assert.ok(mild.size < unif.size);
  });

  it('intensity 1 produces fewer unique combos than 0.5', () => {
    const intense = new Set(Array.from({ length: 2000 }, () => emoticon('angry', 1)));
    const unif = new Set(Array.from({ length: 2000 }, () => emoticon('angry', 0.5)));
    assert.ok(intense.size < unif.size);
  });
});

describe('edge cases — object keys consistency', () => {
  it('emotions list is stable on repeated access', () => {
    const snapshot = [...emoticon.emotions];
    assert.deepStrictEqual(snapshot, emoticon.emotions);
  });

  it('every emotion key in config appears in .emotions', () => {
    for (const key of Object.keys(emotions)) {
      assert.ok(emoticon.emotions.includes(key), `missing: ${key}`);
    }
  });
});
