import { createRule, type Direction, type Rule } from './rule'

export type MarbleSnapshot = {
  x: number
  y: number
  vx: number
  vy: number
}

export type RuleUpdate = {
  rule: Rule
  restore: MarbleSnapshot | null
}

type Listener = (update: RuleUpdate) => void

let rule = createRule()
let originMarble: MarbleSnapshot | null = null
let captureMarble: () => MarbleSnapshot | null = () => null
const history: Array<{ gravity: Direction; marble: MarbleSnapshot | null }> = []
const listeners = new Set<Listener>()

export function setMarbleCapture(capture: () => MarbleSnapshot | null) {
  captureMarble = capture
}

export function setMarbleOrigin(marble: MarbleSnapshot) {
  originMarble = marble
}

export function clearMarbleCapture() {
  captureMarble = () => null
}

export function hasUndo() {
  return history.length > 0
}

export function setGravity(direction: Direction) {
  history.push({ gravity: rule.gravity, marble: captureMarble() })
  rule = { ...rule, gravity: direction }
  emit(null)
}

export function undo() {
  const previous = history.pop()
  if (!previous) return

  rule = { ...rule, gravity: previous.gravity }
  emit(previous.marble)
}

export function restart() {
  history.length = 0
  rule = createRule()
  emit(originMarble)
}

export function subscribeRule(listener: Listener) {
  listeners.add(listener)
  listener({ rule, restore: null })
  return () => {
    listeners.delete(listener)
  }
}

function emit(restore: MarbleSnapshot | null) {
  const update = { rule, restore }
  listeners.forEach((listener) => listener(update))
}
