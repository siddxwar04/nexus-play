export const directions = ['down', 'up', 'left', 'right'] as const
export const solidities = ['solid', 'ghost'] as const
export const guardMoves = ['toward', 'away', 'door'] as const

export type Direction = (typeof directions)[number]
export type Solidity = (typeof solidities)[number]
export type GuardMove = (typeof guardMoves)[number]

export type Rule = {
  gravity: Direction
  solidity: Solidity
  door: string
  guard: GuardMove
  timing: number
}

export function createRule(overrides: Partial<Rule> = {}): Rule {
  return {
    gravity: 'down',
    solidity: 'solid',
    door: 'key',
    guard: 'toward',
    timing: 3,
    ...overrides,
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
