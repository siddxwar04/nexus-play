# 08 — Gravity values

Already in place: `createRule()` in `src/game/rule.ts`. The room still falls down. The win check is still a separate task in `src/game/RoomScene.ts`.

Do this:

- Add one function, `gravityVector(direction)`, in `src/game/rule.ts`.
- Down, up, left, and right must go through that same function. Only the direction changes.
- Point the room’s current gravity at `gravityVector(createRule().gravity)`, which is still down.

Leave out:

- Do not edit `src/game/RoomScene.ts`.
- No sentence, word swap, or player controls.

Check:

- Refresh the page. The marble still falls straight down and lands on the floor.
- Up, left, and right exist in `gravityVector()` beside down.
