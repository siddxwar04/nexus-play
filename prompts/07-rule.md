# 07 — Rule object

Already in place: the room plays with temporary downward gravity. The win check is a separate task in `src/game/RoomScene.ts`.

Do this:

- Add `src/game/rule.ts`.
- One `Rule` type must be able to hold gravity, solidity, the door condition, guard movement, and timing.
- Add `createRule()`. Gravity starts as down. The other fields have a starting value too.

Leave out:

- Do not edit `src/game/RoomScene.ts`.
- Do not apply the rule to the marble yet.
- No sentence, word swap, extra rooms, or player controls.

Check:

- The page looks the same as before.
- `createRule()` returns one object that includes all five fields, with gravity set to down.
