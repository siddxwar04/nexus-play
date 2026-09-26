import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  getBest,
  getClearCount,
  getLaws,
  getRoom,
  getTotalChanges,
  hasNextRoom,
  isWon,
  nextRoom,
  resetGame,
  shareText,
  subscribeRule,
} from '../game/liveRule'
import { palette } from '../game/palette'
import { rooms } from '../game/rooms'
import { playCue } from '../game/sound'
import { RoomIndex } from './RoomIndex'

function read() {
  return {
    won: isWon(),
    count: getClearCount(),
    par: getRoom().par,
    best: getBest(),
    more: hasNextRoom(),
    total: getTotalChanges(),
    laws: getLaws(),
  }
}

function verdict(count: number, par: number) {
  if (count < par) return 'Sharper than the law itself.'
  if (count === par) return 'A perfect edict.'
  return 'The door is open. A shorter law exists.'
}

export function WinBanner() {
  const [state, setState] = useState(read)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return subscribeRule(() => {
      setState(read())
      setCopied(false)
    })
  }, [])

  if (!state.won) return null

  const { count, par, best, more, total, laws } = state
  const atPar = count <= par
  const perfect = laws.filter((law) => law.count <= law.room.par).length

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText())
      setCopied(true)
      playCue('swap')
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className={`w-full border px-6 py-6 text-center sm:px-8 sm:py-7 ${more ? 'max-w-sm' : 'max-w-md'}`}
        style={{
          backgroundColor: palette.page,
          color: palette.ink,
          borderColor: palette.doorInk,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <p className="law text-3xl sm:text-4xl">Edict Fulfilled</p>
        <div
          className="mx-auto mt-3 h-px w-12 transition-colors"
          style={{
            backgroundColor: atPar ? palette.doorInk : palette.mute,
            boxShadow: atPar ? `0 0 12px ${palette.doorInk}` : 'none',
          }}
        />
        <p className="mt-3 text-sm" style={{ color: palette.mute }}>
          {count} {count === 1 ? 'rewrite' : 'rewrites'} · the law allows {par}
        </p>
        <p className="law mt-1 text-lg" style={{ color: atPar ? palette.word : palette.mute }}>
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
              All {rooms.length} rooms are clear. {total} rewrites in all, {perfect} of {rooms.length} within the law.
            </p>
            <p className="mt-4 text-[10px] tracking-[0.3em]" style={{ color: palette.doorInk }}>
              THE EDICT · ROOM INDEX
            </p>
            <RoomIndex />
            <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-1">
              <button
                type="button"
                className="quiet-control min-h-11 cursor-pointer px-3 text-xs tracking-[0.28em]"
                style={{ color: palette.word }}
                onClick={() => void copy()}
              >
                {copied ? 'COPIED' : 'COPY RESULT'}
              </button>
              <button
                type="button"
                className="quiet-control min-h-11 cursor-pointer px-3 text-xs tracking-[0.28em]"
                style={{ color: palette.word }}
                onClick={() => resetGame()}
              >
                PLAY AGAIN
              </button>
            </div>
            <p className="mt-2 text-[10px] tracking-[0.12em]" style={{ color: palette.mute }}>
              PLAY AGAIN restarts all 10 rooms. Room replay returns to this index. Best scores are kept.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
