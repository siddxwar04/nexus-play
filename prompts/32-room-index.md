# Prompt 32 — Room Index, Replay and Best Scores

I am working on the existing Phaser + React + TypeScript browser game.

Do not break the existing 10-room progression or the "The Unwritten Law" feature.

The project already has:
- 10 rooms
- localStorage-based best scores
- room completion tracking
- final "THE EDICT" summary
- next room progression

Add the following feature:

ROOM INDEX + REPLAY + BEST SCORES

1. After all 10 rooms are completed, show a Room Index containing all 10 rooms.

2. For every room show:
   - room number
   - room title
   - completion status
   - best score if available
   - par value

3. Completed rooms must have a REPLAY action.

4. When a player selects a completed room:
   - open that room directly
   - reset the current attempt
   - preserve the stored best score
   - do not require the player to replay earlier rooms

5. When the replayed room is completed:
   - calculate the new score normally
   - compare it with the stored best score
   - update localStorage only if the new score is better

6. Keep browser persistence.
   Use localStorage only.
   No accounts.
   No backend.
   No online leaderboard.

7. Keep the existing PLAY AGAIN action for restarting the full 10-room run.

8. Make it clear that:
   - PLAY AGAIN restarts the full run
   - REPLAY reopens one completed room

9. Keep the existing:
   - scoring
   - undo
   - restart
   - hints
   - sound
   - keys
   - guard
   - timing
   - door logic
   - gravity mechanics
   - The Unwritten Law behavior

10. Reuse the existing best-score system instead of creating another scoring system.

11. Keep the UI consistent with the current game design.

12. Use a clean reusable Room Index component where appropriate.

13. Run:
   npm run build

14. Run:
   npm run lint

15. Fix all errors before finishing.

16. Report which files were changed and explain how room replay and persistent best scores work.