export function mockLocalStorage(value: string) {
  Object.defineProperty(window, "localStorage", {
    writable: true,
    value: {
      getItem: () => value,
      setItem: vi.fn(),
    },
  })
}
