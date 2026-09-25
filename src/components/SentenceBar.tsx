import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getChangeCount, getRoom, getRule, rewrite, subscribeRule } from '../game/liveRule'
import { palette } from '../game/palette'
import { tailFor, wordsFor, type Slot } from '../game/rule'
import { playCue } from '../game/sound'

export function SentenceBar() {
  const [rule, setRule] = useState(getRule())
  const [room, setRoom] = useState(getRoom())
  const [count, setCount] = useState(getChangeCount())
  const [openSlot, setOpenSlot] = useState<Slot | null>(null)

  useEffect(() => {
    return subscribeRule((update) => {
      setRule(update.rule)
      setRoom(getRoom())
      setCount(getChangeCount())
      if (update.restore || update.resetRoom || update.won) setOpenSlot(null)
    })
  }, [])

  const choices = openSlot ? wordsFor(openSlot, rule).filter((word) => !word.active) : []
  const over = count > room.par

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div
        className="law text-balance text-xl leading-tight sm:text-3xl sm:leading-snug"
        style={{ color: palette.ink }}
      >
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
                aria-label={`${clause.lead} ${current}. Change this word.`}
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
              {tailFor(clause, rule)}.
            </p>
          )
        })}
      </div>
      {/* This row keeps one height whether a word is open or not, so the room below never resizes mid-flight. */}
      <div className="relative mt-2 min-h-12 sm:mt-3">
        <AnimatePresence mode="wait">
          {openSlot ? (
            <motion.div
              key={openSlot}
              className="law absolute inset-x-0 top-0 flex flex-wrap justify-center gap-x-5 gap-y-1 text-base sm:gap-x-6 sm:text-lg"
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
          ) : (
            <motion.p
              key="count"
              className="absolute inset-x-0 top-0 pt-3 text-[10px] tracking-[0.22em]"
              style={{ color: over ? palette.doorInk : palette.mute }}
              initial={{ opacity: 0 }}
              animate={{ opacity: over ? 0.9 : 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              aria-live="polite"
            >
              {count} OF {room.par} {room.par === 1 ? 'REWRITE' : 'REWRITES'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
