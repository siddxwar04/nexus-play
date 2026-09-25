import { useEffect, useState } from 'react'
import { hasUndo, isWon, restart, subscribeRule, undo } from '../game/liveRule'
import { isMuted, subscribeSound, toggleMuted } from '../game/sound'

type Props = {
  hintOpen: boolean
  onToggleHint: () => void
}

export function UndoControl({ hintOpen, onToggleHint }: Props) {
  const [ready, setReady] = useState(hasUndo())
  const [muted, setMuted] = useState(isMuted())

  useEffect(() => {
    return subscribeRule(() => {
      setReady(hasUndo())
    })
  }, [])

  useEffect(() => {
    return subscribeSound(() => {
      setMuted(isMuted())
    })
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
      const key = event.key.toLowerCase()
      if (key === 'r') restart()
      if (key === 'u' && !isWon()) undo()
      if (key === 'm') toggleMuted()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-2 pb-4 sm:gap-x-9 sm:px-6 sm:pb-5">
      <button
        type="button"
        disabled={!ready}
        onClick={() => undo()}
        className="quiet-control min-h-11 cursor-pointer px-2 text-[11px] tracking-[0.22em] disabled:cursor-default disabled:opacity-40 sm:px-3 sm:text-xs sm:tracking-[0.28em]"
      >
        ↶ UNDO
      </button>
      <button
        type="button"
        onClick={() => restart()}
        className="quiet-control min-h-11 cursor-pointer px-2 text-[11px] tracking-[0.22em] sm:px-3 sm:text-xs sm:tracking-[0.28em]"
      >
        ↻ RESTART
      </button>
      <button
        type="button"
        onClick={onToggleHint}
        aria-pressed={hintOpen}
        className="quiet-control min-h-11 cursor-pointer px-2 text-[11px] tracking-[0.22em] sm:px-3 sm:text-xs sm:tracking-[0.28em]"
      >
        {hintOpen ? '✕ HINT' : '? HINT'}
      </button>
      <button
        type="button"
        onClick={() => toggleMuted()}
        aria-pressed={muted}
        aria-label={muted ? 'Sound is off. Turn sound on.' : 'Sound is on. Turn sound off.'}
        className="quiet-control min-h-11 cursor-pointer px-2 text-[11px] tracking-[0.22em] sm:px-3 sm:text-xs sm:tracking-[0.28em]"
      >
        {muted ? '♪ MUTED' : '♪ SOUND'}
      </button>
    </div>
  )
}
