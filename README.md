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

| Emotion | Unique Variants | Examples |
|:---|---:|:---|
| **happy** | 756 | `ヽ(＾◡＾)ﾉ`  `╰(⌣‿⌣)╯`  `੧(☆∀☆)੭` |
| **sad** | 150 | `(ಥ︿ಥ)`  `╰(；﹏；)╯`  `༼╥‸╥༽` |
| **angry** | 300 | `ᕙ(ಠ益ಠ)ᕗ`  `ᕦ(╬皿╬)ᕤ`  `╚(•́Д•́)═╝` |
| **love** | 480 | `(♥◡♥)`  `ヽ(✿˘ε˘✿)ﾉ`  `╰(❤ω❤)╯` |
| **surprised** | 150 | `╰(⊙□⊙)╯`  `ヽ(°O°)ﾉ`  `༼ʘдʘ༽` |
| **confused** | 240 | `¯\_(・〰・)_/¯`  `┌(◔‸◔)┐`  `乁(？〜？)ㄏ` |
| **excited** | 360 | `੧(✧○✧)੭`  `٩(☆ω☆)و`  `୧(°∀°)୨` |
| **cool** | 200 | `ᕙ(▀‿▀)ᕗ`  `(¬ʖ¬)`  `ᕦ(⌣_⌣)ᕤ` |
| **silly** | 324 | `乁ʕ◉ε◉ʔㄏ`  `╰༼¬〰¬༽╯`  `ヽ(ↂਊↂ)ﾉ` |
| **shrug** | 8 | `¯\_(ツ)_/¯`  `¯\_(◉‿◉)_/¯`  `¯\_(シ)_/¯` |
| **disapproval** | 24 | `(ಠ_ಠ)`  `[≖╭╮≖]`  `(¬益¬)` |
| **laughing** | 240 | `ᕙ(^ロ^)ᕗ`  `(＾▽＾)`  `ヽ(థѠథ)ﾉ` |
| **embarrassed** | 750 | `(･∼･)`  `╰(✿﹏ε﹏✿)╯`  `ヽ(。﹁ε﹁。)ﾉ` |
| **tired** | 150 | `(⌣３⌣)`  `乁(˘ロ˘)ㄏ`  `╰༼ˍεˍ༽╯` |
| **scared** | 200 | `ヽ(⊙口⊙)ﾉ`  `⋋(◉‸◉)⋌`  `╰༼☉﹏☉༽╯` |
| **crying** | 1125 | `(T﹏T)`  `(Q口Q)`  `༼；ㅠ；༽` |

> Counts are calculated by enumerating every valid arm, body, eye, mouth, and optional cheek combination for each emotion. The per-emotion numbers are unique within that emotion; across the whole package, some strings overlap between emotions.

`5457` total combinations across all emotions. `5243` of those are unique emoticon strings after removing overlaps between emotions.

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
