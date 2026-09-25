type Cue = 'swap' | 'rule' | 'door' | 'close' | 'key' | 'win'

const MUTE_KEY = 'edict-muted'

let context: AudioContext | null = null
let muted = loadMuted()
const listeners = new Set<() => void>()

function loadMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}

export function isMuted() {
  return muted
}

export function toggleMuted() {
  muted = !muted
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  } catch {
    // Storage can be unavailable. The choice still holds for this visit.
  }
  listeners.forEach((listener) => listener())
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function audio() {
  if (!context) context = new AudioContext()
  if (context.state === 'suspended') void context.resume()
  return context
}

const pitch: Record<Cue, number> = { swap: 640, rule: 420, door: 280, close: 200, key: 760, win: 520 }
const length: Record<Cue, number> = { swap: 0.09, rule: 0.09, door: 0.12, close: 0.12, key: 0.14, win: 0.28 }

export function playCue(cue: Cue) {
  if (muted) return
  const ctx = audio()
  const now = ctx.currentTime
  const tone = ctx.createOscillator()
  const gain = ctx.createGain()
  tone.connect(gain)
  gain.connect(ctx.destination)

  tone.frequency.value = pitch[cue]
  tone.type = cue === 'door' || cue === 'close' ? 'triangle' : 'sine'
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.03, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length[cue])
  tone.start(now)
  tone.stop(now + length[cue])

  if (cue === 'win') {
    const chime = ctx.createOscillator()
    const chimeGain = ctx.createGain()
    chime.connect(chimeGain)
    chimeGain.connect(ctx.destination)
    chime.frequency.value = 780
    chimeGain.gain.setValueAtTime(0.0001, now + 0.12)
    chimeGain.gain.exponentialRampToValueAtTime(0.024, now + 0.16)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42)
    chime.start(now + 0.12)
    chime.stop(now + 0.42)
  }
}
