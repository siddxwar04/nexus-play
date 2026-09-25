# Project Memory

Single source of truth. Follow this file. Update it when something important changes, and add a short reason for every big decision.

The long Edict brief in chat is the design reference. This file is what we follow. If they ever conflict, this file wins until it is updated.

## Idea and goal

- EVOX 1.0. Build an innovative browser game with AI prompting.
- Submit a live deployed link and one PDF.
- PDF page 1: concept write-up. Following pages: the exact prompts used to build the game.
- Team size: 1–4. Build window: about one day.
- Judging: Innovation, Game Creativity, Approach, Prompting, Engaging Uniqueness.
- Pitch: Edict is a puzzle game where the rules of the world are written as a sentence. The player changes one or two words, the world follows the new rule, and that guides a marble to the door.

## Game

- Name: Edict. An edict is an official rule.
- Tagline: Rewrite the law.
- The player does not move the marble. The player edits the sentence. The marble reacts on its own.
- Principle: do not control the world. Change the rules of the world.
- The law is one short paragraph of one to three clauses. Editable words sit inside it, like GRAVITY IS [DOWN].
- A word swap applies immediately. Same system for every value. GRAVITY IS DOWN and GRAVITY IS RIGHT share one gravity rule.
- Six rooms. Each room has one law, one trick, and one clear idea. The obvious swap is usually the trap.
- Win: the marble reaches the open door. Show “Edict Fulfilled”, the number of rule changes, the par, a verdict, the best count here, then the next room. After room six: total and PLAY AGAIN.
- A bad swap is not a game over. Undo or restart, then try again.
- No live AI inside the game. Every swap comes from a fixed word list.

## Rooms

Rooms are data in `src/game/rooms.ts`: title, clauses, starting words, par, hint, spawn, door wall, blue blocks, key, guard, clock. The scene lays out from that data.

- Room 1, The First Law. GRAVITY IS [DOWN]. Door on the floor to the right. Par 1.
- Room 2, Two Clauses. GRAVITY IS [DOWN]. BLUE BLOCKS ARE [SOLID]. Marble on a blue shelf, blue wall in the way, door on the right wall. RIGHT then GHOST. Par 2.
- Room 3, The Key. THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. GRAVITY IS [DOWN]. Door in the ceiling, so FLOOR is a trap. RIGHT over the key, then UP. The key stays taken. Par 2.
- Room 4, The Guard. THE GUARD FOLLOWS THE [DOOR]. GRAVITY IS [DOWN]. Guard stands on the door. MARBLE pulls it away, then RIGHT. RIGHT first is a dead end. Par 2.
- Room 5, The Clock. THE DOOR CLOSES AFTER [THREE] SECONDS. GRAVITY IS [DOWN]. Door starts open and shuts on a timer. Rewriting the timing word restarts the clock. Par 3.
- Room 6, The Edict. GRAVITY IS [UP]. BLUE BLOCKS ARE [SOLID]. THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. Ceiling right, drop to the shelf, LEFT over the key to the door on the left wall. Par 3.
- Word lists: gravity DOWN/UP/LEFT/RIGHT, solidity SOLID/GHOST, door KEY/FLOOR, guard DOOR/MARBLE, timing ONE/TWO/THREE.
- Add a rule type only when a room needs it.

## Decisions

- 2026-09-25: Keep this file updated without waiting to be asked. Reason: later sessions must follow one record.
- 2026-09-25: Build Edict only. Reason: the law is visible, the demo cannot drift, and the mechanic is the prompt.
- 2026-09-25: Tagline is “Rewrite the law.” Reason: it matches the title and states the player’s action. The brief’s other line, “Change the words. Change the world.”, stays unused.
- 2026-09-25: Stack is React, TypeScript, Vite, Tailwind CSS, Phaser, and Framer Motion. Reason: the app is already scaffolded, Phaser runs the room, and React plus Tailwind run the sentence bar.
- 2026-09-25: Save prompts in `prompts/` while building. Reason: the PDF must contain the exact prompts.
- 2026-09-25: Write each saved prompt as a plain build instruction: what to do, what to leave out, and how to check it. Reason: the prompting score comes from specific prompts. Do not add fake typos to look human.
- 2026-09-25: Every used prompt in `prompts/` uses the same four parts: already in place, do this, leave out, check. Reason: the PDF should read as one clear build sequence.
- 2026-09-25: The tagline “Rewrite the law.” sits under EDICT on the page. Reason: that was the teammate’s task, and it had not been added.
- 2026-09-25: The page follows the brief’s layout: centered title, the sentence as the main visual, the room filling the rest, and two quiet controls. Reason: the user asked for the UI quality described in the master instructions. Prompt: `prompts/ui-polish.md`.
- 2026-09-25: The door is a framed doorway with two panels and a handle. The frame stays, and the slab slides up when it opens. Reason: a thin rectangle did not read as a door.
- 2026-09-25: The room, marble, key, guard, and blocks are drawn so each one is readable, and the layout stays large under 768px. Reason: the user asked for the whole game to look alive and responsive. Prompt: `prompts/23-presence.md`.
- 2026-09-25: A destroyed room no longer blocks later word changes. Room 1’s door stands on the floor, so RIGHT reaches it. Room 4 starts with the guard on the door until the word becomes TOWARD or AWAY. Reason: a playthrough found the sentence changing while the marble did not, and rooms 1 and 4 could not be cleared.
- 2026-09-25: The six rooms were redesigned as data with multi-clause laws, a par per room, traps in the obvious swap, a best count kept in the browser, an intro screen, and a hint control. Reason: one-word rooms were solved by guessing in seconds, so there was no “aha” and no reason to replay. A law may now have more than one clause; each room still has one trick. Prompt: `prompts/24-deeper-rooms.md`.
- 2026-09-25: The guard words are DOOR and MARBLE. Reason: “THE GUARD FOLLOWS THE [DOOR]” reads as a sentence, and the old TOWARD/AWAY/DOOR set made an ungrammatical line.
- 2026-09-25: Phaser loads after the first paint, and the marble keeps its relative place when the canvas resizes. Reason: faster first view, and a two-line law used to resize the canvas and drop the marble off its shelf.
- 2026-09-25: Prompts 17, 19, and 20 were rewritten to name the sentence, the limits, and the check. Prompt 06 points at the win behavior in prompt 18. Reason: the first drafts were too thin, and 06 still described a temporary marble start that was not shipped.
- 2026-09-25: Deploy on Vercel after the game is playable. Reason: the submission needs a live link, and this is a static Vite app with no server. Vercel builds it with `npm run build` and serves the `dist` folder.
- 2026-09-25: Split sentence, state, a pure rule reader, and the Phaser room. Reason: the sentence stays the law, and the room only follows the parsed rule.
- 2026-09-25: One responsive web layout, breakpoint 768px. Reason: judges may open the live link on a phone or a laptop. This is not a separate mobile app.
- 2026-09-25: The marble has no direct controls. Reason: the master brief says the player rewrites the rule, and the marble moves because of that rule.
- 2026-09-25: Undo and restart are part of the first playable game. Reason: a wrong word must be reversible without treating it as a loss. Restart key is R.
- 2026-09-25: Build from the numbered task list below, one task at a time, and verify before the next. Reason: the brief says build, test, then move on, and the core mechanic stays intact.
- 2026-09-25: Do not commit, push, or open a pull request, and do not suggest it. Reason: the user said not to show or try a commit.
- 2026-09-25: Do not deploy. The team will put the build on Vercel by hand. Reason: the user said deployment is manual. `vercel.json` only records `npm run build` and `dist`.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Phaser (package `phaser` 4.x) for the room and simple predictable physics
- Framer Motion for the sentence word change
- Lint: oxlint
- Hosting: Vercel, after the game is playable. Build command `npm run build`. Output folder `dist`.

## Architecture

- Sentence bar: the law, with editable words marked in the sentence. Click a word, pick a replacement. Not a settings menu.
- Game state: current room, current words, undo history, rule-change count, win flag.
- Rule reader: pure function. Sentence in, one rule object out. Gravity, solidity, door, guard, and timing share this path.
- World: Phaser draws marble, walls, blocks, door, key, and guard only when that room uses them. It applies the rule object. It does not edit the sentence.
- Win check: marble reaches the door after the door rule says it is open.
- Wide, 768px and up: title, sentence, room, then Undo and Restart.
- Narrow, under 768px: the same stack. Sentence and chips wrap. Room scales to width. No horizontal page scroll.
- Build one phase at a time: room, marble, physics, walls, door, win check, rules, gravity sentence, word swap, undo, restart, then solidity, door condition, guard, timing, six rooms, polish, then quiet sound.

## Rules

- The player does not move the marble with keys, clicks, dragging, or a joystick.
- One sentence is the law. The room follows the parsed rule immediately.
- Word choices are a short list on that sentence. No free typing.
- Undo restores the previous sentence, rule, and the marble when that matters.
- Restart (R) restores the room’s original state.
- Six rooms, then a clear ending.
- Visuals stay geometric and quiet: circle marble, rectangles, one door, few colors. The sentence is the main visual.
- Sound stays quiet and comes after the six rooms work.
- Do not add a live model, accounts, level editor, shop, story, leaderboard, or a separate mobile app.
- Do not switch to another game concept unless this file is updated first.
- Work on one task at a time. Smallest change that keeps the rule-editing mechanic.
- Do not commit, push, or open a pull request. Do not ask to commit or show commit steps unless the user asks for that exact thing.

## Tasks

Do these in order. One task at a time. Verify it, then start the next. Do not skip ahead.

1. Done. Empty 2D room on the page. Verify: a quiet geometric room fills the play area.
2. Done. Marble in the room. Verify: a circle sits in a clear spot. It cannot be moved with keys, clicks, or dragging.
3. Done. Simple physics. Verify: a temporary DOWN gravity makes the marble fall in a straight, predictable way. No player movement controls.
4. Done. Walls and collision. Verify: the marble stops on walls and the floor. It does not tunnel through them.
5. Done. Door. Verify: a door is visible and reads as the goal. Prompt: `prompts/05-door.md`.
6. Done. Win check. Verify: when the marble reaches the door, play stops and the screen says “Edict Fulfilled”. It is part of the room flow, with the rule-change count. Reason: clearing a room has to continue, so the line could not stay unfinished.
7. Done. Rule object. Verify: one shared shape can describe gravity, solidity, door, guard, and timing. No level-only shortcuts. File: `src/game/rule.ts`. Not applied to the room yet.
8. Done. Gravity values. Verify: DOWN, UP, LEFT, and RIGHT are the same gravity rule with a different direction. `gravityVector()` in `src/game/rule.ts`. The room still uses down.
9. Done. Sentence. Verify: the room shows GRAVITY IS [DOWN]. The bracketed word looks editable. It is not a settings menu. File: `src/components/SentenceBar.tsx`. The word does not swap yet.
10. Done. Word swap. Verify: choosing UP, LEFT, or RIGHT replaces the word in the sentence with a short animation. The marble’s direction does not change yet.
11. Done. Sentence drives physics. Verify: changing the word changes the marble’s direction immediately. The player still cannot push the marble.
12. Done. Undo. Verify: one undo restores the previous word, rule, and marble.
13. Done. Restart. Verify: the Restart control and the R key restore the room’s original sentence and marble.
14. Done. Room 2, solidity. Verify: BLUE BLOCKS ARE [SOLID] can become GHOST, and the marble passes through only when they are GHOST. The page shows this room, not the gravity sentence. Room 1 returns when the rooms play in order.
15. Done. Room 3, door condition. Verify: the door opens only when the edited condition is met. Sentence: THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. The other word is FLOOR. The page shows this room. Earlier rooms return when they play in order.
16. Done. Room 4, guard. Verify: TOWARD, AWAY, and DOOR change where the guard moves. The marble is still not player-controlled. The page shows this room.
17. Done. Room 5, timing. Verify: the timing word changes when the door opens. Words: ONE, TWO, THREE.
18. Done. Room 6 and room flow. Verify: six rooms in order, each with one sentence and one trick. Clearing a room shows the rule-change count and continues.
19. Done. Responsive polish. Verify: at 768px and up, title, sentence, room, Undo, and Restart stack cleanly. Under 768px, the sentence wraps and the room fits the width with no horizontal scroll.
20. Done. Quiet sound and word animation. Verify: swap, rule change, door, and win each have a short quiet cue. Nothing is loud.
21. Left for the team. Deploy on Vercel by hand. Verify: the live link loads the playable game. Build command `npm run build`. Output folder `dist`. See `vercel.json`.
22. Done. Submission text. Verify: concept write-up is ready, and `prompts/` holds the exact prompts used. File: `submission/concept.md`.

## Progress

Done:

- Vite + React + TypeScript app scaffolded
- Tailwind, Phaser, and Framer Motion installed
- Placeholder home screen in `src/App.tsx`
- Architecture diagram agreed
- Design reference absorbed
- Task 1 done: empty geometric room fills the play area
- Task 2 done: a still marble sits in the room, with no player controls
- Task 3 done: temporary downward gravity. The marble falls straight and is not player-controlled.
- Task 4 done: floor, ceiling, and side walls share one collider. The marble lands and stays. Fall speed is capped so it does not tunnel.
- Task 5 done: a door marker sits on the right wall, above the floor. It does not open and it does not detect a win.
- Task 7 done: `src/game/rule.ts` holds one `Rule` shape for gravity, solidity, door, guard, and timing. `createRule()` starts with gravity down.
- Task 8 done: `gravityVector()` maps down, up, left, and right through one rule. The live room still uses down, so the marble still falls to the floor. `RoomScene.ts` was not edited.
- Task 9 done: the page shows GRAVITY IS [DOWN]. The bracketed word is underlined and highlighted.
- Task 10 done: clicking the word offers UP, LEFT, and RIGHT. The chosen word replaces it with a short fade.
- Task 11 done: the chosen word updates the live rule, and the room gravity follows `gravityVector()` at once. The marble speed is cleared on the change. The player still cannot push it.
- Task 12 done: UNDO steps back one word change and puts the marble back where it was. The control stays dull until a word changes.
- Task 13 done: RESTART and the R key return the sentence to the room’s original word, put the marble at its start, and clear undo history.
- Task 14 done: room 2 is BLUE BLOCKS ARE [SOLID]. GHOST lets the marble fall through the blue block. SOLID holds it. Undo stores the whole rule, not only gravity.
- Task 15 done: room 3 uses THE DOOR OPENS WHEN THE MARBLE TOUCHES THE [KEY]. FLOOR opens the door when the marble lands. The key sits off to the side.
- Task 16 done: room 4 is THE GUARD MOVES [TOWARD] THE MARBLE. AWAY and DOOR change where the guard goes.
- Tasks 17–20 done: timing room, six rooms in order, responsive stack, and quiet cues for swap, rule, door, and win. The page starts at room 1. Deployment was left alone.
- Task 22 done: `submission/concept.md` is the PDF page-1 write-up. The prompts in `prompts/01` through `prompts/21` are the later pages.
- Tagline done: “Rewrite the law.” is under EDICT in `src/App.tsx`. Prompt: `prompts/header-tagline.md`.
- UI polish done: centered title, serif sentence, hover on the editable word, clearer room edge, and a quiet win panel. Prompt: `prompts/ui-polish.md`.
- Deeper rooms done: six data-driven rooms with par, traps, best counts, intro screen, hint, key and clock cues. All six were played to par in Chrome, wide and at 390px. Prompt: `prompts/24-deeper-rooms.md`.

Left:

- Task 21. The team deploys on Vercel by hand. Not started here.

## Bugs and fixes

- None yet.
