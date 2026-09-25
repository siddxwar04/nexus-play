# 15 — Room 3, door condition

Already in place: the marble falls straight down. The player does not move it. Undo and restart restore the word and the marble.

Do this:

- Show one sentence: THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY].
- The other word is FLOOR.
- Put a small key on the floor, off to the side, not under the marble.
- Hide the blue block for this room so the marble can reach the floor.
- If the word is KEY, the door stays closed, because the marble never touches the key.
- If the word is FLOOR, the door opens when the marble lands.
- Changing the word back closes the door if the marble is not meeting that condition.
- An open door slides up so the gap is obvious.

Leave out:

- No “Edict Fulfilled” message, no gravity word, no player movement, and no later rooms.

Check:

- Refresh the dev page. The marble lands and the door stays shut. Change KEY to FLOOR and the door opens. Change it back to KEY and the door closes.
