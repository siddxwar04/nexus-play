# 06 — Win check

Edict already has a room, a marble, downward gravity, four walls, and a door on the right. The marble falls and lands on the floor. It never reaches the door, because gravity only pulls down. Your job is the win check, and nothing past that.

Look at `src/game/RoomScene.ts` before you change anything. Reuse the marble and the door. Do not rewrite the scene.

When the marble overlaps the door, stop the marble and show the words “Edict Fulfilled”. Keep that message quiet and short. Do not add a next-room button, a rule-change count, sound, a sentence, or player controls. Gravity stays straight down.

The current start spot cannot touch the door. For this check only, start the marble just above the door so a refresh makes it fall onto the door and the message appears. Leave a short note in the code that this start spot is temporary until gravity can point to the right.

When you are done, tell us to refresh http://localhost:5174/ and watch the marble meet the door.
