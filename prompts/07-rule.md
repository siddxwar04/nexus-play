# 07 — Rule object

The win check is someone else’s task in `src/game/RoomScene.ts`. Do not edit that file.

Add one shared rule shape in a new file, `src/game/rule.ts`. The same object must be able to describe gravity, solidity, the door condition, guard movement, and timing. One function should build that object, with gravity starting as down.

Do not apply the rule to the marble yet. Do not add sentences, word swaps, rooms, or player controls. The page should look the same as before.

When you are done, the check is the file: one `Rule` type covers all five, and `createRule()` returns gravity down plus the other fields.
