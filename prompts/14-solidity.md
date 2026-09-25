# 14 — Room 2, solidity

Already in place: one room, a marble that falls down, walls, a door, undo, and restart. The player does not move the marble.

Do this:

- Show one sentence: BLUE BLOCKS ARE [SOLID].
- The other word is GHOST. Choosing it replaces the word in the sentence.
- Put one blue block across the marble’s fall.
- When the word is SOLID, the marble lands on the block.
- When the word is GHOST, the block stays visible but faint, and the marble falls through it to the floor.
- UNDO and RESTART still restore the previous word and the marble. Restart returns the word to SOLID.

Leave out:

- No second sentence, no gravity word, no win message, and no player movement.
- Do not build the later rooms yet.

Check:

- Refresh the dev page. The marble lands on the blue block. Change SOLID to GHOST and watch it fall through. Change it back and the block holds the marble again.
