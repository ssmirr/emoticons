'use strict';

const emotions = require('./emotions');

/**
 * Generate a random emoticon for the given emotion.
 *
 * @param {string} emotion - The emotion to generate an emoticon for.
 * @param {number} [intensity=0.5] - Intensity from 0 (mild) to 1 (intense). 0.5 is uniform random.
 * @returns {string} A random emoticon matching the emotion.
 * @throws {Error} If the emotion is not recognized.
 *
 * @example
 *   emoticon('happy')        // => 'ヽ(^◡^)ﾉ'
 *   emoticon('angry', 0.8)   // => 'ᕙ(╬Д╬)ᕗ'  (intense)
 *   emoticon('angry', 0.2)   // => '(•́_•́)'     (mild)
 */
function emoticon(emotion, intensity) {
  if (typeof emotion !== 'string') {
    throw new TypeError('Emotion must be a string');
  }

  emotion = emotion.toLowerCase().trim();

  const config = emotions[emotion];
  if (!config) {
    throw new Error(
      `Unknown emotion "${emotion}". Available: ${Object.keys(emotions).join(', ')}`
    );
  }

  // Intensity defaults to 0.5 (uniform)
  const t = intensity !== undefined ? Math.max(0, Math.min(1, +intensity)) : 0.5;

  // Pre-composed emoticons (e.g. shrug) — intensity N/A
  if (config.preComposed) {
    return pick(config.preComposed);
  }

  // Pick matched pairs for arms and body
  const [leftArm, rightArm] = config.arms ? pick(config.arms) : ['', ''];
  const [leftBody, rightBody] = pick(config.bodies);
  const eye = biasedPick(config.eyes, t);
  const mouth = biasedPick(config.mouths, t);

  // Cheeks appear ~50% of the time when available
  let face;
  if (config.cheeks && Math.random() < 0.5) {
    const cheek = pick(config.cheeks);
    face = `${cheek}${eye}${mouth}${eye}${cheek}`;
  } else {
    face = `${eye}${mouth}${eye}`;
  }

  return `${leftArm}${leftBody}${face}${rightBody}${rightArm}`;
}

/**
 * Generate a random emoticon for a random emotion.
 * @returns {string}
 */
emoticon.random = function () {
  const keys = Object.keys(emotions);
  return emoticon(pick(keys));
};

/**
 * List of all supported emotions.
 * @type {string[]}
 */
emoticon.emotions = Object.keys(emotions);

/**
 * @private
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick from array biased by intensity.
 * intensity 0 = always first element (mildest)
 * intensity 1 = always last element (most intense)
 * intensity 0.5 = uniform random
 * @private
 */
function biasedPick(arr, t) {
  if (t === 0.5 || arr.length <= 1) return pick(arr);
  const stretch = t < 0.5
    ? 1 - (1 - 2 * t) * 0.9  // 0.1 → 1.0
    : 1 + (2 * t - 1) * 9;   // 1.0 → 10
  const idx = Math.floor(Math.pow(Math.random(), 1 / stretch) * arr.length);
  return arr[Math.min(idx, arr.length - 1)];
}

module.exports = emoticon;