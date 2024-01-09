export function mockMatchMedia(media: string, matches: boolean) {
  const desc: PropertyDescriptor = {
    writable: true,
    configurable: true,
    enumerable: true,
    value: () => {
      return {
        matches,
        media,
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }
    },
  }

  Object.defineProperty(window, "matchMedia", desc)
}
