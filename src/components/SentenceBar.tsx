import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { setGravity as publishGravity } from '../game/liveRule'
import { palette } from '../game/palette'
import { directions, type Direction } from '../game/rule'

function label(direction: Direction) {
  return direction.toUpperCase()
}

export function SentenceBar() {
  const [gravity, setGravity] = useState<Direction>('down')
  const [open, setOpen] = useState(false)
  const choices = directions.filter((direction) => direction !== gravity)

  function choose(direction: Direction) {
    setGravity(direction)
    publishGravity(direction)
    setOpen(false)
  }

  return (
    <div className="text-center">
      <div
        className="text-2xl tracking-[0.16em] sm:text-3xl"
        style={{ color: palette.ink }}
      >
        GRAVITY IS{' '}
        <button
          type="button"
          className="cursor-pointer border-b px-1"
          style={{ color: palette.word, borderColor: palette.word }}
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={gravity}
              className="inline-block"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              [{label(gravity)}]
            </motion.span>
          </AnimatePresence>
        </button>
        .
      </div>
      {open ? (
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm tracking-[0.18em]">
          {choices.map((direction) => (
            <button
              key={direction}
              type="button"
              className="cursor-pointer border-b"
              style={{ color: palette.word, borderColor: palette.word }}
              onClick={() => choose(direction)}
            >
              {label(direction)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
