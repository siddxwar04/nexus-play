import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  getBest,
  getClearCount,
  getRoom,
  getTotalChanges,
  hasNextRoom,
  isWon,
  nextRoom,
  resetGame,
  subscribeRule,
} from '../game/liveRule'
import { palette } from '../game/palette'

function read() {
  return {
    won: isWon(),
    count: getClearCount(),
    par: getRoom().par,
    best: getBest(),
    more: hasNextRoom(),
    total: getTotalChanges(),
  }
}

function verdict(count: number, par: number) {
  if (count < par) return 'Sharper than the law itself.'
  if (count === par) return 'A perfect edict.'
  return 'The door is open. A shorter law exists.'
}

export function WinBanner() {
  const [state, setState] = useState(read)

  useEffect(() => {
    return subscribeRule(() => {
      setState(read())
    })
  }, [])

  if (!state.won) return null

  const { count, par, best, more, total } = state

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="w-full max-w-sm border px-8 py-7 text-center"
        style={{ backgroundColor: palette.page, color: palette.ink, borderColor: palette.doorInk }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <p className="law text-3xl sm:text-4xl">Edict Fulfilled</p>
        <div className="mx-auto mt-3 h-px w-12" style={{ backgroundColor: palette.doorInk }} />
        <p className="mt-3 text-sm" style={{ color: palette.mute }}>
          {count} {count === 1 ? 'rule change' : 'rule changes'} · the law allows {par}
        </p>
        <p className="law mt-1 text-lg" style={{ color: palette.word }}>
          {verdict(count, par)}
        </p>
        {best !== null ? (
          <p className="mt-1 text-xs tracking-[0.18em]" style={{ color: palette.mute }}>
            BEST HERE {best}
          </p>
        ) : null}
        {more ? (
          <button
            type="button"
            className="quiet-control mt-5 min-h-11 cursor-pointer px-4 text-xs tracking-[0.28em]"
            style={{ color: palette.word }}
            onClick={() => nextRoom()}
          >
            CONTINUE
          </button>
        ) : (
          <div className="mt-5">
            <p className="text-sm" style={{ color: palette.mute }}>
              All six rooms are clear. {total} rule changes in all.
            </p>
            <button
              type="button"
              className="quiet-control mt-3 min-h-11 cursor-pointer px-4 text-xs tracking-[0.28em]"
              style={{ color: palette.word }}
              onClick={() => resetGame()}
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
