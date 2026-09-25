# 26 — Stone and four more rooms

Already in place: six rooms as data, five rules, par, hints, best counts, and an ending after room six. Every room mixes rules the player has already met, but each rule has appeared in only one or two ways.

Do this:

- Add stone to the room data. Stone is drawn like the walls and collides like the walls. No word in the law can change it. Keep it separate from blue blocks in the code so that GHOST never touches it.
- Add four rooms after The Edict. Each one asks for a kind of thinking the first six did not:
  7. The Stair. GRAVITY IS [DOWN] and nothing else. Two stone pillars, one hanging from the ceiling, one standing on the floor, make a four-corner path: RIGHT under the first, UP the second, RIGHT over it, DOWN into the door. Par 4.
  8. The Key Beneath. The marble starts on a blue shelf. The key hangs in the air below the shelf. The door is in the ceiling directly above. GHOST drops the marble through the key, UP takes it to the door. UP first reaches a shut door, and FLOOR shuts the door the moment the marble leaves the shelf. Par 2.
  9. The Slow Guard. THE GUARD FOLLOWS THE [DOOR], THE DOOR CLOSES AFTER [THREE] SECONDS, GRAVITY IS [DOWN]. The guard stands on the door and the clock runs from the start. MARBLE first, RIGHT second, rewind the clock last. RIGHT first is a dead end because the guard follows the marble to the door. Par 3.
  10. The Last Edict. Four clauses: gravity, solidity, key, guard. The marble starts on a shelf above the door. The guard's post is beside the door, so MARBLE alone makes it step toward the marble and off the door. Then two laws work: LEFT over the key, DOWN, RIGHT; or FLOOR, GHOST, RIGHT. Both are 4. Par 4.
- The ending counts the rooms rather than saying six.
- Bend the clock's tail to the number: ONE SECOND, TWO SECONDS.

Leave out:

- No new rule types. No room may need a wait shorter than a second.

Check:

- Play rooms 7 to 10 at par. In room 8, try UP first and watch the door stay shut. In room 9, try RIGHT first and watch the guard follow the marble into the doorway. In room 10, open the door both ways.
