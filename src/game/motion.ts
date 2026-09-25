/** True when the visitor asked the system for less motion. Trails, bursts, and slides are skipped. */
export function prefersReducedMotion(): boolean {
  if (typeof matchMedia !== 'function') return false
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}
