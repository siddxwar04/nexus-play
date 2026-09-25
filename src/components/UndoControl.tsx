import { useEffect, useState } from 'react'
import { hasUndo, restart, subscribeRule, undo } from '../game/liveRule'
import { palette } from '../game/palette'

export function UndoControl() {
  const [ready, setReady] = useState(hasUndo())

  useEffect(() => {
    return subscribeRule(() => {
      setReady(hasUndo())
    })
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.repeat) return
      if (event.key !== 'r' && event.key !== 'R') return
      restart()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex justify-center gap-8 px-6 pb-5">
      <button
        type="button"
        disabled={!ready}
        onClick={() => undo()}
        className="cursor-pointer text-xs tracking-[0.28em] disabled:cursor-default disabled:opacity-40"
        style={{ color: palette.mute }}
      >
        UNDO
      </button>
      <button
        type="button"
        onClick={() => restart()}
        className="cursor-pointer text-xs tracking-[0.28em]"
        style={{ color: palette.mute }}
      >
        RESTART
      </button>
    </div>
  )
}
