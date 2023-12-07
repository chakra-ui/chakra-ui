export function getEventWindow(event: Event): typeof globalThis {
  return ((event as UIEvent).view ?? window) as unknown as typeof globalThis
}
