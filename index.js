'use strict';

const emotions = require('./emotions');

/**
 * Generate a random emoticon for the given emotion.
 *
 * @param {string} emotion - The emotion to generate an emoticon for.
 * @returns {string} A random emoticon matching the emotion.
 * @throws {Error} If the emotion is not recognized.
 *
 * @example
 *   emoticon('happy')    // => 'ヽ(^◡^)ﾉ'
 *   emoticon('sad')      // => '(ಥ︿ಥ)'
 *   emoticon('angry')    // => 'ᕙ(ಠ益ಠ)ᕗ'
 */
function emoticon(emotion) {
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

  // Pre-composed emoticons (e.g. shrug)
  if (config.preComposed) {
    return pick(config.preComposed);
  }

  // Pick matched pairs for arms and body
  const [leftArm, rightArm] = config.arms ? pick(config.arms) : ['', ''];
  const [leftBody, rightBody] = pick(config.bodies);
  const eye = pick(config.eyes);
  const mouth = pick(config.mouths);

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

module.exports = emoticon;