# 25 — Deeper rooms

Already in place: six rooms that each clear with one obvious swap, a framed door, a key, a guard, a timer, undo, restart, and quiet cues. Each room can be solved by guessing in a few seconds, so there is no “aha” and no reason to replay.

Do this:

- Describe every room as data: its title, its sentence clauses, the starting words, a par, a hint, the marble spawn, the door wall, and the blue blocks. Lay the room out from that data so nothing is special-cased by room number.
- Let a room's law have more than one clause, each with its own bracketed word. Show each clause on its own line.
- Change the guard words to DOOR and MARBLE so the line reads THE GUARD FOLLOWS THE [DOOR]. Drop TOWARD and AWAY.
- Turn the clock around: THE DOOR CLOSES AFTER [THREE] SECONDS. The door starts open and shuts when the time runs out.
- Make the obvious swap a trap and reward the right order:
  1. The First Law. GRAVITY IS [DOWN]. Door on the floor to the right. Par 1.
  2. Two Clauses. Gravity plus BLUE BLOCKS ARE [SOLID]. The marble rests on a blue shelf; a blue wall blocks the way to a door on the right wall. RIGHT then GHOST is 2. GHOST first costs 3. Par 2.
  3. The Key. The door is in the ceiling. FLOOR looks right and cannot work. Roll over the key, then UP. The key stays taken once touched. Par 2.
  4. The Guard. THE GUARD FOLLOWS THE [DOOR]. The guard stands on the door. RIGHT first is a dead end. MARBLE first pulls the guard away, then RIGHT. Par 2.
  5. The Clock. THE DOOR CLOSES AFTER [THREE] SECONDS. The door starts open and shuts on a timer shown under the door. Rewriting the timing word restarts the clock. UP, LEFT, then reset it if the door shut. Par 3.
  6. The Edict. Gravity, solidity, and the key together. Gravity starts UP. Ride the ceiling right, drop onto the blue shelf, and let LEFT carry the marble over the key to a door on the left wall. Par 3.
- On a win show the count, the par, one line of verdict, and the best count for that room kept in the browser. After room six, show the total and PLAY AGAIN.
- Add a first screen that says the player never moves the marble, and a HINT control that shows the room's hint.
- Undo restores the key, the guard, and the clock along with the marble.
- Add two more quiet cues, made in the browser like the others: one when the key is taken, and a lower one when the door closes.
- Keep the marble at the same relative place when the canvas resizes, so a law that wraps to two lines does not knock it off a shelf.
- Load the game engine after the page paints, so the title and the law appear first.

Leave out:

- No player movement, no more than six rooms, and no accounts or online scores.
- No new rule types. The five rules from task 7 are enough.

Check:

- Play all six rooms at par. Try RIGHT alone in room 4 and see the guard hold the door. Resize the window during room 2 and see the marble stay on the shelf. The narrow layout still has no sideways scroll.
