# 24 — Presence

Already in place: six rooms, one sentence, a framed door, a marble the player cannot move, and quiet controls.

Do this:

- Make the room feel occupied. The marble has a shadow and a highlight. The door keeps its frame, panels, and handle, and the opening glows. The key has a bow, a shaft, and teeth. The guard has a body and a visor. A solid block shows a light edge, and a ghost block fades.
- Draw the walls as a stone rim around a lighter floor. Keep the collision where it is.
- On a narrow screen, shrink the page padding and the wall thickness so the room still fills the view. Keep the sentence readable and the controls easy to tap. Show six marks for the six rooms, with the current room lit.
- Let “Edict Fulfilled” fade in as it does now, with the rule-change count and CONTINUE.

Leave out:

- Do not add player movement, a new room, or a new rule.
- Do not turn the sentence into a menu.

Check:

- Wide and under 768px: the sentence stays on top, the room stays large, and there is no sideways scroll.
- Room 1 shows a stone and a glowing door. Room 2 shows a blue block. Room 3 shows a key. Room 4 shows a guard. Changing a word still changes the room at once.
