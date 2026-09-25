export const directions = ['down', 'up', 'left', 'right'] as const
export const solidities = ['solid', 'ghost'] as const
export const doorConditions = ['key', 'floor'] as const
export const guardMoves = ['door', 'marble'] as const
export const timings = [1, 2, 3] as const

export type Direction = (typeof directions)[number]
export type Solidity = (typeof solidities)[number]
export type DoorCondition = (typeof doorConditions)[number]
export type GuardMove = (typeof guardMoves)[number]
export type Timing = (typeof timings)[number]

export type Rule = {
  gravity: Direction
  solidity: Solidity
  door: DoorCondition
  guard: GuardMove
  timing: Timing
}

export type Slot = keyof Rule

export type Word = {
  label: string
  active: boolean
  patch: Partial<Rule>
}

const timingLabel: Record<Timing, string> = { 1: 'ONE', 2: 'TWO', 3: 'THREE' }

export function createRule(overrides: Partial<Rule> = {}): Rule {
  return {
    gravity: 'down',
    solidity: 'solid',
    door: 'key',
    guard: 'door',
    timing: 3,
    ...overrides,
  }
}

export function wordsFor(slot: Slot, rule: Rule): Word[] {
  switch (slot) {
    case 'gravity':
      return directions.map((value) => ({
        label: value.toUpperCase(),
        active: rule.gravity === value,
        patch: { gravity: value },
      }))
    case 'solidity':
      return solidities.map((value) => ({
        label: value.toUpperCase(),
        active: rule.solidity === value,
        patch: { solidity: value },
      }))
    case 'door':
      return doorConditions.map((value) => ({
        label: value.toUpperCase(),
        active: rule.door === value,
        patch: { door: value },
      }))
    case 'guard':
      return guardMoves.map((value) => ({
        label: value.toUpperCase(),
        active: rule.guard === value,
        patch: { guard: value },
      }))
    case 'timing':
      return timings.map((value) => ({
        label: timingLabel[value],
        active: rule.timing === value,
        patch: { timing: value },
      }))
  }
}

const GRAVITY_SPEED = 980

export function gravityVector(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case 'down':
      return { x: 0, y: GRAVITY_SPEED }
    case 'up':
      return { x: 0, y: -GRAVITY_SPEED }
    case 'left':
      return { x: -GRAVITY_SPEED, y: 0 }
    case 'right':
      return { x: GRAVITY_SPEED, y: 0 }
  }
}
