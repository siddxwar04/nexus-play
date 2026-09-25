import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getRoom, getRule, rewrite, subscribeRule } from '../game/liveRule'
import { palette } from '../game/palette'
import { wordsFor, type Slot } from '../game/rule'
import { playCue } from '../game/sound'

export function SentenceBar() {
  const [rule, setRule] = useState(getRule())
  const [room, setRoom] = useState(getRoom())
  const [openSlot, setOpenSlot] = useState<Slot | null>(null)

  useEffect(() => {
    return subscribeRule((update) => {
      setRule(update.rule)
      setRoom(getRoom())
      if (update.restore || update.resetRoom || update.won) setOpenSlot(null)
    })
  }, [])

  const choices = openSlot ? wordsFor(openSlot, rule).filter((word) => !word.active) : []

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="law text-balance text-xl leading-tight sm:text-3xl sm:leading-snug" style={{ color: palette.ink }}>
        {room.clauses.map((clause) => {
          const current = wordsFor(clause.slot, rule).find((word) => word.active)?.label ?? ''
          const isOpen = openSlot === clause.slot
          return (
            <p key={clause.slot}>
              {clause.lead}{' '}
              <button
                type="button"
                className={`law-word cursor-pointer px-1.5 ${isOpen ? 'law-word-open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpenSlot(isOpen ? null : clause.slot)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    className="inline-block"
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 1.03 }}
                    transition={{ duration: 0.18 }}
                  >
                    [{current}]
                  </motion.span>
                </AnimatePresence>
              </button>
              {clause.tail ? ` ${clause.tail}` : ''}.
            </p>
          )
        })}
      </div>
      <AnimatePresence>
        {openSlot ? (
          <motion.div
            key={openSlot}
            className="law mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-base sm:mt-4 sm:gap-x-6 sm:text-lg"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            {choices.map((word) => (
              <button
                key={word.label}
                type="button"
                className="law-word min-h-11 cursor-pointer px-2"
                onClick={() => {
                  playCue('swap')
                  rewrite(word.patch)
                  setOpenSlot(null)
                }}
              >
                {word.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
