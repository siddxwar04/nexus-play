import { roomAt, rooms } from './rooms'
import { playCue } from './sound'
import { createRule, type Rule } from './rule'

export type Snapshot = {
  x: number
  y: number
  vx: number
  vy: number
  keyTaken: boolean
  guardX: number
  elapsed: number
}

export type RuleUpdate = {
  rule: Rule
  restore: Snapshot | null
  resetRoom: boolean
  won: boolean
}

type Listener = (update: RuleUpdate) => void

const BEST_KEY = 'edict-best'

let roomIndex = 0
let rule = createRule(roomAt(0).initial)
let won = false
let clearCount = 0
let totalChanges = 0
let origin: Snapshot | null = null
let capture: () => Snapshot | null = () => null
const history: Array<{ rule: Rule; snapshot: Snapshot | null }> = []
const listeners = new Set<Listener>()

export function setMarbleCapture(fn: () => Snapshot | null) {
  capture = fn
}

export function clearMarbleCapture(fn: () => Snapshot | null) {
  if (capture === fn) capture = () => null
}

export function setMarbleOrigin(snapshot: Snapshot) {
  origin = snapshot
}

export function getRoom() {
  return roomAt(roomIndex)
}

export function getRoomNumber() {
  return getRoom().id
}

export function getRule() {
  return rule
}

export function isWon() {
  return won
}

export function getClearCount() {
  return clearCount
}

export function getTotalChanges() {
  return totalChanges
}

export function getChangeCount() {
  return history.length
}

export function hasNextRoom() {
  return roomIndex < rooms.length - 1
}

export function hasUndo() {
  return history.length > 0
}

function loadBest(): Record<string, number> {
  try {
    const raw = localStorage.getItem(BEST_KEY)
    return raw ? (JSON.parse(raw) as Record<string, number>) : {}
  } catch {
    return {}
  }
}

export function getBest(roomId = getRoom().id): number | null {
  const best = loadBest()[String(roomId)]
  return typeof best === 'number' ? best : null
}

function saveBest(roomId: number, count: number) {
  const previous = getBest(roomId)
  if (previous !== null && previous <= count) return
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify({ ...loadBest(), [String(roomId)]: count }))
  } catch {
    // Storage can be unavailable. The game still plays.
  }
}

export function rewrite(patch: Partial<Rule>) {
  if (won) return
  history.push({ rule, snapshot: capture() })
  rule = { ...rule, ...patch }
  playCue('rule')
  emit(null)
}

export function undo() {
  const previous = history.pop()
  if (!previous) return

  won = false
  rule = previous.rule
  emit(previous.snapshot)
}

export function restart() {
  history.length = 0
  won = false
  rule = createRule(getRoom().initial)
  emit(origin, true)
}

export function fulfill() {
  if (won) return
  won = true
  clearCount = history.length
  totalChanges += clearCount
  saveBest(getRoom().id, clearCount)
  playCue('win')
  emit(null)
}

export function nextRoom() {
  if (!hasNextRoom()) return
  roomIndex += 1
  startRoom()
}

export function resetGame() {
  roomIndex = 0
  totalChanges = 0
  startRoom()
}

function startRoom() {
  won = false
  clearCount = 0
  history.length = 0
  rule = createRule(getRoom().initial)
  emit(null, true)
}

export function subscribeRule(listener: Listener) {
  listeners.add(listener)
  listener({ rule, restore: null, resetRoom: false, won })
  return () => {
    listeners.delete(listener)
  }
}

function emit(restore: Snapshot | null, resetRoom = false) {
  const update = { rule, restore, resetRoom, won }
  listeners.forEach((listener) => {
    try {
      listener(update)
    } catch (error) {
      console.error(error)
    }
  })
}
