# 11 — Sentence drives physics

Already in place: the sentence can swap DOWN, UP, LEFT, and RIGHT. `gravityVector()` knows all four. The marble still only falls down. The player cannot push the marble.

Do this:

- When the sentence word changes, update the live rule immediately.
- Point the room’s Arcade gravity at `gravityVector()` for that word.
- Clear the marble’s speed on the change so the new direction is obvious.
- Allow the same speed cap on both axes, so left and right are not slower than down.

Leave out:

- No keyboard, click-to-move, drag, or joystick.
- No undo, restart, win check, sound, or new rooms.
- Do not rewrite `src/game/RoomScene.ts`. Only apply the new gravity there.

Check:

- Refresh the dev page. Let the marble land. Change the word to RIGHT, then UP, then LEFT. The marble moves that way at once. You still cannot drag it.
