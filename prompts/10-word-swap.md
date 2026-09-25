# 10 — Word swap

Already in place: the page shows GRAVITY IS [DOWN]. The bracketed word looks editable, but it does not change yet. The player does not move the marble.

Do this:

- Click [DOWN] and show the other allowed words: UP, LEFT, and RIGHT.
- Choosing one replaces the word inside the sentence.
- Animate that replacement with a short fade or shift.
- Keep the choices in the sentence’s words. Do not turn them into a settings menu.

Leave out:

- Do not edit `src/game/RoomScene.ts`.
- Do not change the marble’s direction yet. That is the next task.
- No undo, restart, sound, or player controls.

Check:

- Refresh the dev page. Click [DOWN], choose UP, LEFT, or RIGHT, and watch the sentence change. The marble still falls down.
