# Edict

Rewrite the law.

Edict is a browser puzzle where the sentence on the screen is the law of the room. The player never moves the marble. There is no keyboard control, no click-to-move, and no joystick. The player changes one word inside the law, and the room obeys at once.

A wrong word is not a loss. Undo puts the last word, the marble, the key, the guard, and the clock back. Restart, or the R key, restores the room. The goal in every room is the same: the marble reaches the open door. Under the law a quiet line counts rewrites against what the law allows, so the target is visible before the door, not only after. When the door is reached the screen says “Edict Fulfilled”, shows the count, the par, and the best so far, and the room's mark at the top turns gold if the law was kept. Ten rooms, then THE EDICT: every law the player wrote, written out in full, with a one-line result to copy and share.

Each room has one law and one trick. The obvious swap is usually the trap.

1. The First Law. GRAVITY IS [DOWN]. The door stands on the floor to the right. One word.
2. Two Clauses. Gravity and BLUE BLOCKS ARE [SOLID]. A blue wall blocks the way. RIGHT, then GHOST. The other order costs more.
3. The Key. The door is in the ceiling, so FLOOR looks right and cannot work. Roll over the key, then UP.
4. The Guard. THE GUARD FOLLOWS THE [DOOR]. Sending the marble first is a dead end. Give the guard the marble to follow, then move.
5. The Clock. THE DOOR CLOSES AFTER [THREE] SECONDS. The door starts open. Rewriting the timing word restarts the clock.
6. The Edict. Gravity, solidity, and the key together. Ride the ceiling, drop onto the shelf, and let LEFT carry the marble over the key.
7. The Stair. Gravity alone, and two stone pillars that no word can change. Under, up, over, down.
8. The Key Beneath. The key hangs in the air under the shelf the marble rests on. Fall through it first. Rise second.
9. The Slow Guard. A guard on the door and a clock already running. Send the guard away, move, and rewind the clock last.
10. The Last Edict. Four clauses. The guard only needs a reason to step aside. Then two different laws open the same door.

The words come from a fixed list. Nothing is typed, and no live model runs inside the game. One shared rule object is read from the law and applied by the room. Rooms are data: title, clauses, starting words, par, hint, spawn, door wall, blocks, stone, key, guard, clock. Five rule types cover all ten rooms; the later rooms combine them rather than add to them.

The page is one layout. At 768px and wider, the title, the law, the room, and the controls stack in that order. On a phone the law wraps and the room fills the width. Sound is six quiet cues, made in the browser, and M mutes them. The system's reduced-motion setting is respected.

The build was a sequence of thirty small prompts. Each one named what was already in place, the single change to make, what to leave out, and how to check it. Those prompts follow this page.
