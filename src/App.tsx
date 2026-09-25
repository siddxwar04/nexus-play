import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GameRoom } from './components/GameRoom'
import { SentenceBar } from './components/SentenceBar'
import { UndoControl } from './components/UndoControl'
import { WinBanner } from './components/WinBanner'
import { getBest, getRoom, subscribeRule } from './game/liveRule'
import { palette } from './game/palette'
import { rooms } from './game/rooms'
import { playCue } from './game/sound'

/** A mark per room: gold when the best clear here is within the law, lit when reached, faint when ahead. */
function markStyle(roomId: number, currentId: number) {
  const best = getBest(roomId)
  const par = rooms.find((room) => room.id === roomId)?.par ?? 0
  const gold = best !== null && best <= par
  if (roomId === currentId) return { backgroundColor: palette.word, opacity: 1 }
  if (gold) return { backgroundColor: palette.doorInk, opacity: 1 }
  return {
    backgroundColor: palette.mute,
    opacity: roomId < currentId ? 1 : 0.28,
  }
}

function App() {
  const [room, setRoom] = useState(getRoom())
  const [started, setStarted] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const [, setTick] = useState(0)

  useEffect(() => {
    return subscribeRule((update) => {
      setRoom(getRoom())
      setTick((value) => value + 1)
      if (update.resetRoom) setHintOpen(false)
    })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="edict-page relative flex min-h-dvh flex-col overflow-x-hidden" style={{ color: palette.ink }}>
        <header className="px-4 pt-3 pb-2 text-center sm:px-8 sm:pt-5 sm:pb-3">
          <p className="text-[11px] tracking-[0.42em]" style={{ color: palette.mute }}>
            EDICT
          </p>
          <div
            className="mt-2 flex items-center justify-center gap-1.5"
            aria-label={`Room ${room.id} of ${rooms.length}`}
          >
            {rooms.map((entry) => (
              <span key={entry.id} className="h-1 w-4 sm:w-6" style={markStyle(entry.id, room.id)} />
            ))}
          </div>
          <p className="mt-2 text-[11px] tracking-[0.22em]" style={{ color: palette.mute }}>
            ROOM {room.id} · {room.title.toUpperCase()}
          </p>
          <div className="pt-3 sm:pt-4">
            <SentenceBar />
          </div>
          <AnimatePresence>
            {hintOpen ? (
              <motion.p
                className="mx-auto mt-3 max-w-xl text-sm leading-relaxed"
                style={{ color: palette.mute }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {room.hint}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </header>
        <main className="relative min-h-[46dvh] min-w-0 flex-1">
          <GameRoom />
        </main>
        <UndoControl hintOpen={hintOpen} onToggleHint={() => setHintOpen((value) => !value)} />
        <WinBanner />
        <AnimatePresence>
          {!started ? (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 px-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-full max-w-md border px-8 py-8 text-center"
                style={{
                  backgroundColor: palette.page,
                  borderColor: palette.doorInk,
                }}
              >
                <p className="text-[11px] tracking-[0.42em]" style={{ color: palette.mute }}>
                  EDICT
                </p>
                <p className="law mt-2 text-3xl sm:text-4xl" style={{ color: palette.word }}>
                  Rewrite the law.
                </p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: palette.ink }}>
                  You never move the marble. The sentence is the law of the room. Click a word in brackets, choose
                  another, and the room obeys.
                </p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: palette.mute }}>
                  Get the marble to the door in as few rewrites as the law allows. {rooms.length} rooms.
                </p>
                <p className="mt-3 text-[10px] tracking-[0.22em]" style={{ color: palette.mute }}>
                  U UNDO · R RESTART · M SOUND
                </p>
                <button
                  type="button"
                  className="quiet-control mt-6 min-h-11 cursor-pointer border px-6 text-xs tracking-[0.28em]"
                  style={{ color: palette.word, borderColor: palette.doorInk }}
                  onClick={() => {
                    playCue('swap')
                    setStarted(true)
                  }}
                >
                  BEGIN
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

export default App
