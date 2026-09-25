# 18 — Six rooms

Already in place: gravity, solidity, door conditions, the guard, and timing each work on their own.

Do this:

- Play six rooms in order, one sentence and one trick each.
- Room 1: GRAVITY IS [DOWN]. Set it to RIGHT so the marble reaches the door.
- Room 2: BLUE BLOCKS ARE [SOLID]. Gravity pulls right. GHOST lets the marble through the block.
- Room 3: THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. FLOOR opens it when the marble lands.
- Room 4: THE GUARD MOVES [DOOR] THE MARBLE. The guard starts on the door. TOWARD or AWAY leaves the door clear. DOOR keeps it blocked.
- Room 5: THE DOOR OPENS AFTER [THREE] SECONDS.
- Room 6: BLUE BLOCKS ARE [SOLID] again, but gravity pulls up. GHOST lets the marble reach the door above.
- When the marble reaches the open door, stop play, show “Edict Fulfilled”, show how many rule changes were used, and offer CONTINUE until the last room.

Leave out:

- No accounts, no level editor, and no deploy step.

Check:

- Start at room 1 of 6. Clear each room and continue. The last room says all six rooms are clear.
