# 12 — Undo

Already in place: changing the sentence word changes the marble’s direction immediately. The player cannot push the marble.

Do this:

- Add an UNDO control under the room.
- Each word change saves the previous word, the previous rule, and the marble’s place and speed.
- One undo restores that word, that rule, and that marble state.
- Leave UNDO dull until a word has changed.

Leave out:

- No restart key, no full room reset, no win message, and no player movement.
- Do not clear the whole history on one undo. Only step back once.

Check:

- Refresh the dev page. Change DOWN to RIGHT and let the marble move. Press UNDO. The sentence returns to DOWN and the marble returns to where it was before that change.
