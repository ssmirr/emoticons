# emoticons ヽ(＾◡＾)ﾉ

> Generate random text emoticons (kaomoji) based on emotions.

**Zero dependencies. Tiny. Works everywhere.**

Give it an emotion, get back a unique emoticon — every time.

```
$ emoticon happy
╰(☆▽☆)╯

$ emoticon sad
(ಥ︿ಥ)

$ emoticon angry
ᕙ(ಠ益ಠ)ᕗ
```

---

## Install

```bash
npm install emoticons
```

## Usage

```js
const emoticon = require('emoticons');

emoticon('happy');    // ヽ(＾◡＾)ﾉ
emoticon('sad');      // (ಥ︿ಥ)
emoticon('angry');    // ᕦ(╬皿╬)ᕤ
```

Every call is randomized — same emotion, different face:

```js
emoticon('love');     // (♥◡♥)
emoticon('love');     // ╰(✿❤ε❤✿)╯
emoticon('love');     // [˘³˘]
```

### Random emotion

```js
emoticon.random();    // ¯\_(ツ)_/¯  (who knows what you'll get)
```

### List available emotions

```js
emoticon.emotions;
// ['happy', 'sad', 'angry', 'love', 'surprised',
//  'confused', 'excited', 'cool', 'silly', 'shrug', 'disapproval']
```

---

## Emotions & Examples

| Emotion | Examples |
|:---|:---|
| **happy** | `ヽ(＾◡＾)ﾉ`  `╰(⌣‿⌣)╯`  `੧(☆∀☆)੭` |
| **sad** | `(ಥ︿ಥ)`  `╰(；﹏；)╯`  `༼╥‸╥༽` |
| **angry** | `ᕙ(ಠ益ಠ)ᕗ`  `ᕦ(╬皿╬)ᕤ`  `╚(•́Д•́)═╝` |
| **love** | `(♥◡♥)`  `ヽ(✿˘ε˘✿)ﾉ`  `╰(❤ω❤)╯` |
| **surprised** | `╰(⊙□⊙)╯`  `ヽ(°O°)ﾉ`  `༼ʘдʘ༽` |
| **confused** | `¯\_(・〰・)_/¯`  `┌(◔‸◔)┐`  `乁(？〜？)ㄏ` |
| **excited** | `੧(✧○✧)੭`  `٩(☆ω☆)و`  `୧(＾∀＾)୨` |
| **cool** | `ᕙ(▀‿▀)ᕗ`  `(¬ʖ¬)`  `ᕦ(⌣_⌣)ᕤ` |
| **silly** | `乁ʕ◉ε◉ʔㄏ`  `╰༼¬〰¬༽╯`  `ヽ(ↂਊↂ)ﾉ` |
| **shrug** | `¯\_(ツ)_/¯`  `¯\_(◉‿◉)_/¯`  `¯\_(シ)_/¯` |
| **disapproval** | `(ಠ_ಠ)`  `[≖╭╮≖]`  `(¬益¬)` |

---

## CLI

A command-line interface is included:

```bash
# Specific emotion
$ npx emoticon happy
੧(^◡^)੭

# Random
$ npx emoticon --random
ᕙ(•ʖ•)ᕗ

# Help
$ npx emoticon --help
```

Or install globally:

```bash
npm install -g emoticons
emoticon excited
# ٩(✧∀✧)و
```

---

## How it works

Each emoticon is assembled from interchangeable parts:

```
  ╰   (   ☆   ◡   ☆   )   ╯
  ─┬─ ─┬─ ─┬─ ─┬─ ─┬─ ─┬─ ─┬─
   │   │   │   │   │   │   │
   │   │   │   │   │   │   └── right arm
   │   │   │   │   │   └────── right body
   │   │   │   │   └────────── right eye
   │   │   │   └────────────── mouth
   │   │   └────────────────── left eye
   │   └────────────────────── left body
   └────────────────────────── left arm
```

Arms and bodies are always picked as **matched pairs** so left and right stay visually symmetric. Eyes use the same character on both sides. Each emotion has its own curated palette of parts — angry gets intense eyes (`ಠ`, `•́`) and aggressive arms (`ᕙ...ᕗ`), while happy gets cheerful eyes (`☆`, `^`) and celebratory arms (`ヽ...ﾉ`).

---

## License

[MIT](LICENSE) © [Samim](https://github.com/ssmirr) ᕙ(▀‿▀)ᕗ
