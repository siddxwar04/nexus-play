# 05 — Door

Edict is a puzzle game. The player does not move the marble. Right now the marble only falls down and lands on the floor. Your job is the door, and nothing past that.

Look at `src/game/RoomScene.ts` before you change anything. The room, marble, gravity, and four walls already work. Reuse them. Do not rewrite the scene.

Add one door inside the room, on the right wall, clear of the floor. It should read as the goal at a glance: a simple tall rectangle, different from the walls, minimal like the rest of the room. Keep it visible after the window resizes.

Do not open or close it. Do not detect a win. Do not show “Edict Fulfilled”. Do not add a sentence, buttons, sound, or player controls. Gravity stays straight down, so the marble should still fall and rest on the floor. The door is only a marker for now.

When you are done, say how to check it. We will refresh `npm run dev` and look for a door that is obviously the goal, while the marble still lands on the floor.
