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
