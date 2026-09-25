import type Phaser from 'phaser'
import { useEffect, useRef } from 'react'

export function GameRoom() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = hostRef.current
    if (!parent) return

    let game: Phaser.Game | undefined
    let cancelled = false
    void import('../game/createRoomGame').then((module) => {
      if (cancelled) return
      game = module.createRoomGame(parent)
    })

    return () => {
      cancelled = true
      game?.destroy(true)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className="room-stage absolute top-0 bottom-2 left-2 right-2 sm:right-6 sm:bottom-4 sm:left-6"
    />
  )
}
