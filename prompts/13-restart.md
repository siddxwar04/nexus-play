# 13 — Restart

Already in place: UNDO steps back one word change and restores the marble. The sentence can change gravity.

Do this:

- Add a RESTART control next to UNDO.
- Pressing R does the same thing.
- Restart returns the sentence to GRAVITY IS [DOWN].
- Put the marble back at its original spot, with no leftover speed.
- Clear the undo history so UNDO is dull again.

Leave out:

- No win message, no new rooms, and no player movement.
- Do not treat restart as one undo. It always returns to the original room.

Check:

- Refresh the dev page. Change the word and let the marble move. Press RESTART, then try R. Both put the word back to DOWN and the marble back where it started.
