# 06 — Win check

Already in place: the room, the marble, downward gravity, four walls, and a door on the right wall. The player does not move the marble.

Do this:

- When the marble touches the door, stop the marble and end play for that room.
- Show “Edict Fulfilled” over the room.
- Show how many rule changes the room took. Until the sentence exists, that number is 0.
- Offer CONTINUE. Until more rooms exist, CONTINUE restarts the same room.

Leave out:

- No sentence, rule object, undo, sound, or player controls.
- Do not open or close the door. It is always open for now.

Check:

- Refresh the dev page. Lift the marble’s start over the door for the test. It falls in, stops, and “Edict Fulfilled” appears with 0.

Note: this step was built inside task 18 rather than on its own, so the shipped win screen is described there.
