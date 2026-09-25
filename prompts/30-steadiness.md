# 30 — Steadiness: less motion, mute, and touch checks

Already in place: ten rooms, six cues, a trail and a burst, and a room that resizes with the page.

Do this:

- Respect the system's reduced-motion setting. When it is on, skip the trail and the sparks, stop the door glow from pulsing, snap the door slab instead of sliding it, and let the page's fades resolve at once.
- Add a mute. The M key and a fourth quiet control, ♪ SOUND / ♪ MUTED, toggle it. Remember the choice in the browser. Put the keys on the first screen: U UNDO · R RESTART · M SOUND.
- Move the key touch and the door touch out of the render frame and into the physics step, so a marble at full speed cannot pass over a small key between two frames.
- When the room resizes and the marble ends a few pixels inside a solid, push it back out along the shortest way. A resting marble must never fall through its shelf because the page changed height.
- Let the win check also refresh the door state, so a marble that meets the condition and reaches the door in the same step still counts.

Leave out:

- No settings screen. No change to any room.

Check:

- Turn on reduced motion in the system and reload: no trail, no sparks, door snaps. Press M and hear nothing; reload and it stays muted. Enter room 10 from room 9 and watch the marble stay on its shelf while the header grows. Roll across the key in room 6 at full speed and see it taken.
