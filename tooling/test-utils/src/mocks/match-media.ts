export function mockMatchMedia(media: string, matches: boolean) {
  const desc: PropertyDescriptor = {
    writable: true,
    configurable: true,
    enumerable: true,
    value: () => {
      return {
        matches,
        media,
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        removeEventListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    },
  }

  Object.defineProperty(window, "matchMedia", desc)
}
