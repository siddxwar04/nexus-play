import type { Rule, Slot } from './rule'

export type Clause = { lead: string; slot: Slot; tail?: string }
export type Wall = 'left' | 'right' | 'floor' | 'ceiling'

/** A box inside the room. Every value is a fraction of the inner room, measured from the top-left. */
export type Box = { x: number; y: number; w: number; h: number }

/** A point inside the room. Fractions of the inner room, or resting on the floor or on a block. */
export type Spot = { x: number; y: number; onFloor?: boolean; onBlock?: number }

export type RoomDef = {
  id: number
  title: string
  clauses: Clause[]
  initial: Partial<Rule>
  par: number
  hint: string
  spawn: Spot
  door: { wall: Wall; at: number }
  blocks: Box[]
  key?: Spot
  guard?: boolean
  clock?: boolean
}

export const rooms: RoomDef[] = [
  {
    id: 1,
    title: 'The First Law',
    clauses: [{ lead: 'GRAVITY IS', slot: 'gravity' }],
    initial: { gravity: 'down' },
    par: 1,
    hint: 'The door stands on the floor to the right. Which way should the world pull?',
    spawn: { x: 0.5, y: 0.1 },
    door: { wall: 'right', at: 1 },
    blocks: [],
  },
  {
    id: 2,
    title: 'Two Clauses',
    clauses: [
      { lead: 'GRAVITY IS', slot: 'gravity' },
      { lead: 'BLUE BLOCKS ARE', slot: 'solidity' },
    ],
    initial: { gravity: 'down', solidity: 'solid' },
    par: 2,
    hint: 'A blue wall stands between the marble and the door. Walls can stop being walls.',
    spawn: { x: 0.16, y: 0.2, onBlock: 0 },
    door: { wall: 'right', at: 0.25 },
    blocks: [
      { x: 0, y: 0.28, w: 0.32, h: 0.04 },
      { x: 0.54, y: 0, w: 0.03, h: 0.62 },
    ],
  },
  {
    id: 3,
    title: 'The Key',
    clauses: [
      { lead: 'THE DOOR OPENS WHEN THE MARBLE TOUCHES THE', slot: 'door' },
      { lead: 'GRAVITY IS', slot: 'gravity' },
    ],
    initial: { door: 'key', gravity: 'down' },
    par: 2,
    hint: 'The door is in the ceiling. A marble on the floor cannot be there too. Take the key with you.',
    spawn: { x: 0.15, y: 0.1 },
    door: { wall: 'ceiling', at: 1 },
    blocks: [],
    key: { x: 0.5, y: 1, onFloor: true },
  },
  {
    id: 4,
    title: 'The Guard',
    clauses: [
      { lead: 'THE GUARD FOLLOWS THE', slot: 'guard' },
      { lead: 'GRAVITY IS', slot: 'gravity' },
    ],
    initial: { guard: 'door', gravity: 'down' },
    par: 2,
    hint: 'The guard is slow. Give it somewhere else to be before the marble moves.',
    spawn: { x: 0.15, y: 0.1 },
    door: { wall: 'right', at: 1 },
    blocks: [],
    guard: true,
  },
  {
    id: 5,
    title: 'The Clock',
    clauses: [
      { lead: 'THE DOOR CLOSES AFTER', slot: 'timing', tail: 'SECONDS' },
      { lead: 'GRAVITY IS', slot: 'gravity' },
    ],
    initial: { timing: 3, gravity: 'down' },
    par: 3,
    hint: 'The clock starts again every time the timing word is rewritten.',
    spawn: { x: 0.85, y: 0.1 },
    door: { wall: 'ceiling', at: 0 },
    blocks: [],
    clock: true,
  },
  {
    id: 6,
    title: 'The Edict',
    clauses: [
      { lead: 'GRAVITY IS', slot: 'gravity' },
      { lead: 'BLUE BLOCKS ARE', slot: 'solidity' },
      { lead: 'THE DOOR OPENS WHEN THE MARBLE TOUCHES THE', slot: 'door' },
    ],
    initial: { gravity: 'up', solidity: 'solid', door: 'key' },
    par: 3,
    hint: 'Land on the blue shelf from above, then let the world pull left.',
    spawn: { x: 0.5, y: 0.9 },
    door: { wall: 'left', at: 0.44 },
    blocks: [{ x: 0.6, y: 0.48, w: 0.4, h: 0.04 }],
    key: { x: 0.8, y: 0.48, onBlock: 0 },
  },
]

export function roomAt(index: number) {
  return rooms[index] ?? rooms[0]
}
