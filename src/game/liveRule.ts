import { createRule, type Direction, type Rule } from './rule'

type Listener = (rule: Rule) => void

let rule = createRule()
const listeners = new Set<Listener>()

export function setGravity(direction: Direction) {
  rule = { ...rule, gravity: direction }
  listeners.forEach((listener) => listener(rule))
}

export function subscribeRule(listener: Listener) {
  listeners.add(listener)
  listener(rule)
  return () => {
    listeners.delete(listener)
  }
}
