# 18 — Six rooms

Already in place: gravity, solidity, door conditions, the guard, and timing each work on their own.

Do this:

- Play six rooms in order, one sentence and one trick each. Show “ROOM n OF 6” beside the title.
- Room 1: GRAVITY IS [DOWN]. Set it to RIGHT so the marble reaches the door.
- Room 2: BLUE BLOCKS ARE [SOLID]. Gravity pulls right. GHOST lets the marble through the block.
- Room 3: THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. FLOOR opens it when the marble lands.
- Room 4: the guard sentence from task 16, starting on DOOR so the guard stands in the doorway. TOWARD or AWAY moves it off. DOOR keeps the door blocked.
- Room 5: THE DOOR OPENS AFTER [THREE] SECONDS.
- Room 6: BLUE BLOCKS ARE [SOLID] again, but gravity pulls up. GHOST lets the marble reach the door above.
- Restart returns the current room to its starting words. Undo history is per room.
- When the marble reaches the open door, stop play, show “Edict Fulfilled”, show how many rule changes were used, and offer CONTINUE until the last room.

Leave out:

- No accounts, no level editor, and no deploy step.

Check:

- Start at room 1 of 6. Clear each room and continue. The last room says all six rooms are clear.
