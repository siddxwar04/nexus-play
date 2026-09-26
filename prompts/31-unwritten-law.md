# Prompt 31 — The Unwritten Law

I am working on an existing Phaser + React + TypeScript browser game.

IMPORTANT:
Do not rebuild the physics system.
Do not remove or rewrite existing features.
Do not break the current marble, walls, right-side door, sentence bar, rule system, or gravity implementation.

I need to add a new gameplay feature called "The Unwritten Law".

The game already has exactly 10 rooms. Do not create an 11th room.

Use one of the existing rooms and integrate the new mechanic while preserving the 10-room progression.

FEATURE — THE UNWRITTEN LAW

1. At the beginning of the room, display:

   GRAVITY IS [?]

2. The marble must already be moving under a real gravity direction.

3. The player must observe the marble's movement and identify the direction they just saw.

4. The player must explicitly select/name that direction.

5. Until the player identifies the correct direction, they cannot freely change the gravity word.

6. If the player guesses incorrectly:
   - show a small incorrect feedback
   - keep the room playable
   - do not unlock gravity editing
   - do not affect scoring

7. If the player guesses correctly:
   - show "LAW DISCOVERED"
   - reveal the discovered direction
   - unlock the existing gravity/rule controls

8. The player must then use the existing gravity mechanic to reach the door.

9. Reuse the existing:
   - rule system
   - liveRule system
   - gravityVector()
   - RoomScene
   - SentenceBar
   - scoring
   - room progression
   - door/completion logic

10. Do not create a second gravity implementation.

11. Do not remove existing mechanics such as:
   - solidity
   - key
   - guard
   - timing
   - door
   - undo
   - restart
   - sound

12. Keep the visual style consistent with the existing game.

13. The hidden gravity must still be applied by the real Phaser physics system.

14. The player should discover the law through observation rather than being shown the answer.

15. Run the production build after implementation and fix any TypeScript/build errors.