import { GameRoom } from './components/GameRoom'
import { SentenceBar } from './components/SentenceBar'
import { palette } from './game/palette'

function App() {
  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: palette.page, color: palette.ink }}
    >
      <header className="px-6 pt-5 pb-3">
        <p className="text-xs tracking-[0.35em]" style={{ color: palette.mute }}>
          EDICT
        </p>
        <div className="pt-6">
          <SentenceBar />
        </div>
      </header>
      <main className="min-h-0 flex-1 px-4 pb-4">
        <GameRoom />
      </main>
    </div>
  )
}

export default App
