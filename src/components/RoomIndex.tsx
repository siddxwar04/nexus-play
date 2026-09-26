import { getBest, getLaws, replayRoom } from '../game/liveRule'
import { palette } from '../game/palette'
import { rooms } from '../game/rooms'
import { playCue } from '../game/sound'

export function RoomIndex() {
  const clearedIds = new Set(getLaws().map((law) => law.room.id))

  return (
    <ol
      className="mt-1 max-h-[38dvh] overflow-y-auto border-y text-left"
      style={{ borderColor: `${palette.doorInk}55` }}
      aria-label="Room index"
    >
      {rooms.map((room) => {
        const best = getBest(room.id)
        const completed = best !== null || clearedIds.has(room.id)

        return (
          <li
            key={room.id}
            className="flex flex-col gap-2 border-b py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: `${palette.doorInk}35` }}
          >
            <div>
              <p className="text-[10px] tracking-[0.16em] sm:tracking-[0.22em]">
                ROOM {room.id} · {room.title.toUpperCase()}
                <span className="ml-2" style={{ color: completed ? palette.doorInk : palette.mute }}>
                  {completed ? 'CLEARED' : 'NOT CLEARED'}
                </span>
              </p>
              <p className="mt-0.5 text-[10px] tracking-[0.16em]" style={{ color: palette.mute }}>
                BEST {best ?? 'N/A'} · PAR {room.par}
              </p>
            </div>
            {completed ? (
              <button
                type="button"
                className="quiet-control min-h-10 cursor-pointer self-start px-3 text-[10px] tracking-[0.24em] sm:self-auto"
                style={{ color: palette.word }}
                onClick={() => {
                  playCue('swap')
                  replayRoom(room.id)
                }}
                aria-label={`Replay room ${room.id}: ${room.title}`}
              >
                REPLAY
              </button>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
