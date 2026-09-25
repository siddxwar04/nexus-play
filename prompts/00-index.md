# Edict — the prompts

Edict was built as a sequence of small prompts, one change each. Every prompt has the same four parts:

- **Already in place** — what the model can rely on, so it does not rebuild or guess.
- **Do this** — the one change to make, named in plain words.
- **Leave out** — what the model must not touch or add yet.
- **Check** — how a person confirms the change in the browser.

The rule repeated in almost every prompt is the game’s core rule: the player never moves the marble.

| # | Prompt | One line |
| --- | --- | --- |
| 01 | Empty room | A quiet framed room and the title. |
| 02 | Marble | One still circle, no controls. |
| 03 | Downward fall | Arcade gravity in one place. |
| 04 | Walls | Four walls, one collider, a speed cap. |
| 05 | Door | A door that reads as the goal. |
| 06 | Win check | Stop, “Edict Fulfilled”, count, CONTINUE. |
| 07 | Rule object | One `Rule` with five fields. |
| 08 | Gravity values | `gravityVector()` for four directions. |
| 09 | Sentence | GRAVITY IS [DOWN] as the main text. |
| 10 | Word swap | Click the word, choose another, it fades in. |
| 11 | Sentence drives physics | The word changes gravity at once. |
| 12 | Undo | Step back one word and one marble state. |
| 13 | Restart | R and a button return the room. |
| 14 | Solidity | BLUE BLOCKS ARE [SOLID] / GHOST. |
| 15 | Door condition | The door opens on KEY or FLOOR. |
| 16 | Guard | A guard the sentence steers. |
| 17 | Timing | A door on a timer. |
| 18 | Six rooms | The rules become a run of rooms. |
| 19 | Responsive layout | One stack at every width. |
| 20 | Quiet sound | Four cues, made in the browser. |
| 21 | Deploy | Static build on Vercel. |
| 22 | Tagline | “Rewrite the law.” |
| 23 | UI polish | Serif law, glowing word, quiet panel. |
| 24 | Presence | Drawn marble, door, key, guard, walls. |
| 25 | Deeper rooms | Multi-clause laws, traps, par, best, intro, hint. |
| 26 | Stone and four more rooms | Rooms 7 to 10, stone that ignores the law. |
| 27 | The rewrite count | Live count under the law, gold marks. |
| 28 | Trail, burst, and the ghost mesh | Motion where it earns its place. |
| 29 | The Edict scroll | Every law you wrote, and a line to share. |
| 30 | Steadiness | Reduced motion, mute, touch checks in the physics step. |

Prompts 14 to 17 built each rule in a room of its own. Prompt 25 replaced those rooms with six that shipped, and it says which words changed and why. Prompt 26 added four more on top of the same five rules.
