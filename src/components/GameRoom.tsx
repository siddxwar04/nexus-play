import { useEffect, useRef } from 'react'
import { createRoomGame } from '../game/createRoomGame'

export function GameRoom() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = hostRef.current
    if (!parent) return

    const game = createRoomGame(parent)
    return () => {
      game.destroy(true)
    }
  }, [])

  return <div ref={hostRef} className="h-full w-full" />
}
