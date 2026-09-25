import { palette } from '../game/palette'

export function SentenceBar() {
  return (
    <p
      className="text-center text-2xl tracking-[0.16em] sm:text-3xl"
      style={{ color: palette.ink }}
    >
      GRAVITY IS{' '}
      <span
        className="cursor-pointer border-b px-1 hover:bg-white/10"
        style={{ color: palette.word, borderColor: palette.word }}
      >
        [DOWN]
      </span>
      .
    </p>
  )
}
