# 28 — Trail, burst, and the ghost mesh

Already in place: the marble, the door, and the blue blocks are drawn each frame. A ghost block fades to a quarter of its colour.

Do this:

- Draw a short trail behind the marble while it moves: about a dozen faint circles that shrink and fade toward the tail. The trail empties within a second once the marble stops.
- When the marble enters the open door, release a small burst of gold sparks from the marble that slow and fade in about half a second.
- Draw a ghost block as a mesh, not only a fade: a thin outline and rows of short dashes, so SOLID and GHOST can be told apart without colour.
- Draw stone with the wall colour and a light edge, so it reads as part of the room rather than as a block.

Leave out:

- No particles anywhere else, no screen shake, no glow on the marble.

Check:

- Change GRAVITY and see the trail follow the marble, then vanish once it rests. Clear a room and see the sparks. Set BLUE BLOCKS to GHOST and see the mesh. Room 7's pillars look like wall, not like blocks.
