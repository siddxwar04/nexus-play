import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  getChangeCount,
  getRoom,
  getRule,
  identifyGravity,
  isGravityDiscovered,
  rewrite,
  subscribeRule,
} from '../game/liveRule'
import { palette } from '../game/palette'
import { directions, tailFor, wordsFor, type Direction, type Slot } from '../game/rule'
import { playCue } from '../game/sound'

export function SentenceBar() {
  const [rule, setRule] = useState(getRule())
  const [room, setRoom] = useState(getRoom())
  const [count, setCount] = useState(getChangeCount())
  const [openSlot, setOpenSlot] = useState<Slot | null>(null)
  const [gravityDiscovered, setGravityDiscovered] = useState(isGravityDiscovered())
  const [discoveryMessage, setDiscoveryMessage] = useState('')

  useEffect(() => {
    return subscribeRule((update) => {
      setRule(update.rule)
      setRoom(getRoom())
      setCount(getChangeCount())
      setGravityDiscovered(isGravityDiscovered())
      if (update.restore || update.resetRoom || update.won) setOpenSlot(null)
      if (update.resetRoom) setDiscoveryMessage('')
    })
  }, [])

  const choices = openSlot ? wordsFor(openSlot, rule).filter((word) => !word.active) : []
  const over = count > room.par
  const awaitingDiscovery = room.unwrittenLaw && !gravityDiscovered

  function chooseDirection(direction: Direction) {
    if (identifyGravity(direction)) {
      setGravityDiscovered(true)
      setDiscoveryMessage(`LAW DISCOVERED: ${direction.toUpperCase()}`)
    } else {
      setDiscoveryMessage('NOT THAT DIRECTION')
    }
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div
        className="law text-balance text-xl leading-tight sm:text-3xl sm:leading-snug"
        style={{ color: palette.ink }}
      >
        {room.clauses.map((clause) => {
          const current = awaitingDiscovery && clause.slot === 'gravity'
            ? '?'
            : wordsFor(clause.slot, rule).find((word) => word.active)?.label ?? ''
          const isOpen = openSlot === clause.slot
          return (
            <p key={clause.slot}>
              {clause.lead}{' '}
              <button
                type="button"
                className={`law-word cursor-pointer px-1.5 ${isOpen ? 'law-word-open' : ''}`}
                aria-expanded={isOpen}
                aria-label={awaitingDiscovery ? `${clause.lead} unknown` : `${clause.lead} ${current}. Change this word.`}
                disabled={awaitingDiscovery}
                onClick={() => {
                  if (!awaitingDiscovery) setOpenSlot(isOpen ? null : clause.slot)
                }}
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
      {/* Discovery choices take their own height; the existing word picker stays in its fixed row. */}
      <div className="relative mt-2 min-h-12 sm:mt-3">
        <AnimatePresence mode="wait">
          {awaitingDiscovery ? (
            <motion.div
              key="identify-gravity"
              className="law relative flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-base sm:gap-x-6 sm:text-lg"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
            >
              <span className="w-full text-[10px] tracking-[0.22em]" style={{ color: palette.mute }}>
                NAME THE DIRECTION
              </span>
              {directions.map((direction) => (
                <button
                  key={direction}
                  type="button"
                  className="law-word min-h-11 cursor-pointer px-2"
                  onClick={() => chooseDirection(direction)}
                >
                  {direction.toUpperCase()}
                </button>
              ))}
              <span
                className="w-full min-h-4 text-[10px] tracking-[0.18em]"
                style={{ color: palette.doorInk }}
                aria-live="polite"
              >
                {discoveryMessage}
              </span>
            </motion.div>
          ) : openSlot ? (
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
      {!awaitingDiscovery && discoveryMessage ? (
        <p className="mt-1 text-[10px] tracking-[0.18em]" style={{ color: palette.word }} aria-live="polite">
          {discoveryMessage}
        </p>
      ) : null}
    </div>
  )
}
