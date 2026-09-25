import { useEffect, useState } from 'react'
import { hasUndo, isWon, restart, subscribeRule, undo } from '../game/liveRule'

type Props = {
  hintOpen: boolean
  onToggleHint: () => void
}

export function UndoControl({ hintOpen, onToggleHint }: Props) {
  const [ready, setReady] = useState(hasUndo())

  useEffect(() => {
    return subscribeRule(() => {
      setReady(hasUndo())
    })
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.repeat) return
      const key = event.key.toLowerCase()
      if (key === 'r') restart()
      if (key === 'u' && !isWon()) undo()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 px-4 pb-4 sm:gap-x-10 sm:px-6 sm:pb-5">
      <button
        type="button"
        disabled={!ready}
        onClick={() => undo()}
        className="quiet-control min-h-11 cursor-pointer px-3 text-xs tracking-[0.28em] disabled:cursor-default disabled:opacity-40"
      >
        ↶ UNDO
      </button>
      <button
        type="button"
        onClick={() => restart()}
        className="quiet-control min-h-11 cursor-pointer px-3 text-xs tracking-[0.28em]"
      >
        ↻ RESTART
      </button>
      <button
        type="button"
        onClick={onToggleHint}
        aria-pressed={hintOpen}
        className="quiet-control min-h-11 cursor-pointer px-3 text-xs tracking-[0.28em]"
      >
        {hintOpen ? '✕ HINT' : '? HINT'}
      </button>
    </div>
  )
}
