# 27 — The rewrite count

Already in place: ten rooms, a par for each, and a win panel that shows the count against the par only after the door is reached.

Do this:

- Under the law, show a quiet line: 0 OF 4 REWRITES. It counts up with every word change and turns the door's gold when the count passes the par.
- Keep that line and the replacement-word row in one box of fixed height, so opening a word never changes the height of the header. The room below must not resize while the marble is moving.
- On the win panel, make the short rule between the title and the count glow gold when the room was cleared within the law, and go grey when it was not.
- In the progress marks at the top, colour a room gold once its best count is within the law. The current room stays lit in the word colour. Rooms ahead stay faint.

Leave out:

- No stars, no scores, no timer. The count is the only number.

Check:

- Change a word and see the line go from 0 OF 2 to 1 OF 2. Go one over the par and see it turn gold. Clear a room at par and see its mark turn gold at the top. Open a word and confirm the room's height does not change.
