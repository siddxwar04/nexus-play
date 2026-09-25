# 06 — Win check

Already in place: the room, the marble, downward gravity, four walls, and a door on the right. The marble lands on the floor. It cannot reach the door while gravity only pulls down.

Do this:

- Read `src/game/RoomScene.ts` before editing. Reuse the marble and the door. Do not rewrite the scene.
- When the marble overlaps the door, stop the marble and show “Edict Fulfilled”.
- For this check only, start the marble just above the door so a refresh makes it fall onto the door.
- Leave a short code note that this start spot is temporary until gravity can point right.

Leave out:

- No next-room button, rule-change count, sound, sentence, or player controls.
- Gravity stays straight down.
- Keep the message short.

Check:

- Refresh the dev page. The marble meets the door, play stops, and the page says “Edict Fulfilled”.
