# Edict

Rewrite the law.

Edict is a browser puzzle where the sentence on the screen is the law of the room. The player never moves the marble. There is no keyboard control, no click-to-move, and no joystick. The player changes one word inside the law, and the room obeys at once.

A wrong word is not a loss. Undo puts the last word, the marble, the key, the guard, and the clock back. Restart, or the R key, restores the room. The goal in every room is the same: the marble reaches the open door. The screen then says “Edict Fulfilled”, shows how many rule changes the room took, how many the law allows, and the best count so far. Six rooms, then a total and a chance to play again.

Each room has one law and one trick. The obvious swap is usually the trap.

1. The First Law. GRAVITY IS [DOWN]. The door stands on the floor to the right. One word.
2. Two Clauses. Gravity and BLUE BLOCKS ARE [SOLID]. A blue wall blocks the way. RIGHT, then GHOST. The other order costs more.
3. The Key. The door is in the ceiling, so FLOOR looks right and cannot work. Roll over the key, then UP.
4. The Guard. THE GUARD FOLLOWS THE [DOOR]. Sending the marble first is a dead end. Give the guard the marble to follow, then move.
5. The Clock. THE DOOR CLOSES AFTER [THREE] SECONDS. The door starts open. Rewriting the timing word restarts the clock.
6. The Edict. Gravity, solidity, and the key together. Ride the ceiling, drop onto the shelf, and let LEFT carry the marble over the key.

The words come from a fixed list. Nothing is typed, and no live model runs inside the game. One shared rule object is read from the law and applied by the room. Rooms are data: title, clauses, starting words, par, hint, spawn, door wall, blocks, key, guard, clock.

The page is one layout. At 768px and wider, the title, the law, the room, and the controls stack in that order. On a phone the law wraps and the room fills the width. Sound is six quiet cues: a word swap, a rule change, a door opening, a door closing, a key, and a clear.

The build was a sequence of small prompts. Each one named what was already in place, the single change to make, what to leave out, and how to check it. Those prompts follow this page.
